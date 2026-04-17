// Per-provider credential storage in sessionStorage
// AI calls are made directly from the browser

export interface ProviderCredential {
	baseUrl: string
	apiKey: string
	model: string
}

// Known provider presets
export const PROVIDER_PRESETS: Record<string, { baseUrl: string; defaultModel: string; label: string }> = {
	puter: {
		baseUrl: "puter",
		defaultModel: "qwen/qwen3.6-plus-preview:free",
		label: "Puter",
	},
	kilo: {
		baseUrl: "https://api.kilo.ai/api/gateway",
		defaultModel: "x-ai/grok-code-fast-1:optimized:free",
		label: "Kilo",
	},
	alibaba: {
		baseUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
		defaultModel: "qwen3-next-80b-a3b-instruct",
		label: "Qwen / Alibaba",
	},
	openrouter: {
		baseUrl: "https://openrouter.ai/api/v1",
		defaultModel: "nvidia/nemotron-3-super-120b-a12b:free",
		label: "OpenRouter",
	},
	groq: {
		baseUrl: "https://api.groq.com/openai/v1",
		defaultModel: "groq/compound-mini",
		label: "Groq",
	},
	custom: {
		baseUrl: "",
		defaultModel: "",
		label: "Tùy chỉnh",
	},
}

// Providers that use Puter SDK (not HTTP fetch)
export const PUTER_PROVIDERS = new Set(["puter"])

const STORAGE_KEYS = {
	CREDENTIALS: "explain_provider_credentials",
	ACTIVE: "explain_active_provider",
} as const

export function normalizeProviderBaseUrl(rawUrl: string): string | null {
	const value = rawUrl.trim()
	if (!value) return null
	const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`
	try {
		const url = new URL(withScheme)
		if (url.protocol !== "https:") return null
		return url.toString().replace(/\/+$/, "")
	} catch {
		return null
	}
}

// Returns all stored credentials: { alibaba: {...}, puter: {...}, ... }
export function readAllCredentials(): Record<string, ProviderCredential> {
	if (typeof window === "undefined") return {}
	try {
		const raw = window.sessionStorage.getItem(STORAGE_KEYS.CREDENTIALS)
		if (!raw) return {}
		return JSON.parse(raw) as Record<string, ProviderCredential>
	} catch {
		return {}
	}
}

// Returns the active provider name (e.g. "alibaba")
export function readActiveProvider(): string | null {
	if (typeof window === "undefined") return null
	try {
		return window.sessionStorage.getItem(STORAGE_KEYS.ACTIVE)
	} catch {
		return null
	}
}

// Save credentials for a specific provider and mark it as active
export function writeProviderCredential(provider: string, credential: ProviderCredential): void {
	if (typeof window === "undefined") return
	try {
		const all = readAllCredentials()
		all[provider] = credential
		window.sessionStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(all))
		window.sessionStorage.setItem(STORAGE_KEYS.ACTIVE, provider)
	} catch { }
}

// Get credentials for the currently active provider
export function readActiveCredential(): { provider: string; credential: ProviderCredential } | null {
	if (typeof window === "undefined") return null
	const provider = readActiveProvider()
	if (!provider) return null
	const all = readAllCredentials()
	const credential = all[provider]
	if (PUTER_PROVIDERS.has(provider)) {
		// Puter doesn't need baseUrl/apiKey in storage — auth is handled by the SDK
		return { provider, credential: credential || { baseUrl: "puter", apiKey: "puter", model: PROVIDER_PRESETS[provider]?.defaultModel || "qwen/qwen-plus" } }
	}
	if (!credential?.baseUrl || !credential?.apiKey) return null
	return { provider, credential }
}

// Remove credentials for a specific provider
export function clearProviderCredential(provider: string): void {
	if (typeof window === "undefined") return
	try {
		const all = readAllCredentials()
		delete all[provider]
		window.sessionStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(all))
		// If we removed the active one, clear active too
		if (readActiveProvider() === provider) {
			window.sessionStorage.removeItem(STORAGE_KEYS.ACTIVE)
		}
	} catch { }
}

// Wipe all stored credentials and active provider
export function clearAllCredentials(): void {
	if (typeof window === "undefined") return
	try {
		window.sessionStorage.removeItem(STORAGE_KEYS.CREDENTIALS)
		window.sessionStorage.removeItem(STORAGE_KEYS.ACTIVE)
	} catch { }
}

// Check if a specific provider has stored credentials (non-Puter)
export function hasProviderCredential(provider: string): boolean {
	if (PUTER_PROVIDERS.has(provider)) return false
	const all = readAllCredentials()
	const cred = all[provider]
	return Boolean(cred?.baseUrl?.trim() && cred?.apiKey?.trim())
}

// Check if Puter SDK is loaded and user is signed in
export async function checkPuterAuth(): Promise<{ signedIn: boolean; user?: { email?: string; username?: string } }> {
	if (typeof window === "undefined" || !(window as any).puter) {
		return { signedIn: false }
	}
	try {
		const puter = (window as any).puter
		const isSignedIn = await puter.auth.isSignedIn()
		if (!isSignedIn) return { signedIn: false }
		const user = await puter.auth.getUser()
		return { signedIn: true, user }
	} catch {
		return { signedIn: false }
	}
}

// Sign in with Puter — must be called from a user click event (opens popup)
export async function signInWithPuter(): Promise<boolean> {
	if (typeof window === "undefined" || !(window as any).puter) return false
	try {
		await (window as any).puter.auth.signIn()
		return true
	} catch {
		return false
	}
}
