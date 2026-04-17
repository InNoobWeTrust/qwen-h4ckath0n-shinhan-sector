import type { FormEvent } from "react"
import { useCallback, useEffect, useState } from "react"
import { CircleX, KeyRound, Link2, LogIn, RefreshCw, Trash2, ChevronDown } from "lucide-react"
import {
	hasProviderCredential,
	PROVIDER_PRESETS,
	readAllCredentials,
	signInWithPuter,
	checkPuterAuth,
	type ProviderCredential,
} from "../../src/lib/explainSession"

interface ProviderCredentialsModalProps {
	open: boolean
	initialProvider?: string
	initialConfig?: ProviderCredential
	onClose: () => void
	onSave: (config: { provider: string; baseUrl: string; apiKey: string; model: string }) => void
	onClearProvider: (provider: string) => void
	onClearAll: () => void
	onSwitchToPuter?: () => void
}

export default function ProviderCredentialsModal({
	open,
	initialProvider = "alibaba",
	initialConfig,
	onClose,
	onSave,
	onClearProvider,
	onClearAll,
	onSwitchToPuter,
}: ProviderCredentialsModalProps) {
	const [provider, setProvider] = useState(initialProvider)
	const [baseUrl, setBaseUrl] = useState("")
	const [apiKey, setApiKey] = useState("")
	const [model, setModel] = useState("")
	const [hasStoredCreds, setHasStoredCreds] = useState(false)
	const [puterUser, setPuterUser] = useState<{ email?: string; username?: string } | null>(null)
	const [signingIn, setSigningIn] = useState(false)
	const [puterModels, setPuterModels] = useState<Array<{ id: string; name?: string; provider?: string }>>([])
	const [puterModelsLoading, setPuterModelsLoading] = useState(false)
	const [puterModelsError, setPuterModelsError] = useState<string | null>(null)
	const [showCustomModelList, setShowCustomModelList] = useState(false)
	const [customModelList, setCustomModelList] = useState<Array<{ id: string }>>([])
	const [fetchingModels, setFetchingModels] = useState(false)
	const [fetchModelsError, setFetchModelsError] = useState<string | null>(null)
	const [usingCustomModelInput, setUsingCustomModelInput] = useState(false)

	const isPuter = provider === "puter"

	const loadProviderData = useCallback((prov: string, storedConfig?: ProviderCredential) => {
		const preset = PROVIDER_PRESETS[prov]
		setShowCustomModelList(false)
		setCustomModelList([])
		setFetchModelsError(null)
		setUsingCustomModelInput(false)
		if (storedConfig?.baseUrl && storedConfig?.apiKey) {
			setBaseUrl(storedConfig.baseUrl)
			setApiKey(storedConfig.apiKey)
			setModel(storedConfig.model || preset?.defaultModel || "")
		} else {
			setBaseUrl(preset?.baseUrl || "")
			setApiKey("")
			setModel(preset?.defaultModel || "")
		}
		setHasStoredCreds(hasProviderCredential(prov))
	}, [])

	const fetchPuterModels = useCallback(async () => {
		if (typeof window === "undefined" || !(window as any).puter) return
		setPuterModelsLoading(true)
		setPuterModelsError(null)
		try {
			const models = await (window as any).puter.ai.listModels()
			setPuterModels(Array.isArray(models) ? models : [])
		} catch {
			setPuterModelsError("Không lấy được danh sách model.")
			setPuterModels([])
		} finally {
			setPuterModelsLoading(false)
		}
	}, [])

	const checkPuterStatus = useCallback(async () => {
		if (typeof window === "undefined" || !(window as any).puter) return
		try {
			const auth = await checkPuterAuth()
			setPuterUser(auth.user || null)
			void fetchPuterModels()
		} catch {
			setPuterUser(null)
		}
	}, [fetchPuterModels])

	useEffect(() => {
		if (open) {
			setProvider(initialProvider)
			loadProviderData(initialProvider, initialConfig)
			if (initialProvider === "puter") {
				void checkPuterStatus()
			}
		}
	}, [open, initialProvider, initialConfig, loadProviderData, checkPuterStatus])

	const handleProviderChange = (newProvider: string) => {
		// Auto-save current tab before switching (skip for Puter which has no form fields)
		if (!isPuter && baseUrl.trim() && apiKey.trim() && model.trim()) {
			onSave({ provider, baseUrl: baseUrl.trim(), apiKey: apiKey.trim(), model: model.trim() })
		}
		setProvider(newProvider)
		if (newProvider === "puter") {
			setBaseUrl("puter")
			setApiKey("puter")
			setShowCustomModelList(false)
			setCustomModelList([])
			setFetchModelsError(null)
			setUsingCustomModelInput(false)
			// Load stored model for Puter, or fall back to default
			const stored = readAllCredentials()["puter"]
			const storedModel = stored?.model?.trim()
			setModel(storedModel || PROVIDER_PRESETS[newProvider]?.defaultModel || "qwen/qwen-plus")
			setHasStoredCreds(false)
			void checkPuterStatus()
		} else {
			loadProviderData(newProvider)
		}
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!baseUrl.trim() || !apiKey.trim() || !model.trim()) return
		onSave({ provider, baseUrl: baseUrl.trim(), apiKey: apiKey.trim(), model: model.trim() })
		onClose()
	}

	const handleSignInPuter = async () => {
		setSigningIn(true)
		try {
			const doSignIn = signInWithPuter
			const ok = await doSignIn()
			if (ok) {
				await checkPuterStatus()
			}
		} finally {
			setSigningIn(false)
		}
	}

	const handleFetchModels = async () => {
		if (!baseUrl.trim() || !apiKey.trim()) return
		setFetchingModels(true)
		setFetchModelsError(null)
		setShowCustomModelList(false)
		setCustomModelList([])
		setUsingCustomModelInput(false)
		try {
			const base = baseUrl.replace(/\/+$/, "")
			const url = `${base}/models`
			const resp = await fetch(url, {
				headers: {
					Authorization: `Bearer ${apiKey.trim()}`,
					"Content-Type": "application/json",
				},
			})
			if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
			const data = await resp.json()
			// OpenAI-compatible: { data: [{ id: "model-id", ... }] }
			const models = Array.isArray(data) ? data : data?.data || []
			setCustomModelList(models.map((m: any) => ({ id: m.id })))
			if (models.length === 0) setFetchModelsError("Không tìm thấy model nào.")
			else setShowCustomModelList(true)
		} catch (e) {
			setFetchModelsError(e instanceof Error ? e.message : "Lỗi khi lấy danh sách model.")
		} finally {
			setFetchingModels(false)
		}
	}

	const handleClearProvider = () => {
		onClearProvider(provider)
		loadProviderData(provider)
		setHasStoredCreds(false)
	}

	const hasCustomModelOptions = showCustomModelList && customModelList.length > 0
	const selectedModelFromList = customModelList.some((item) => item.id === model)
	const customModelSelectValue = hasCustomModelOptions ? (selectedModelFromList ? model : usingCustomModelInput || model ? "__custom__" : "") : model

	if (!open) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.28)]"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Cấu hình AI</p>
						<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Thiết lập provider cho phiên này</h2>
						<p className="mt-2 text-sm leading-6 text-slate-500">
							Chọn provider và nhập API key của bạn. Khóa API chỉ được lưu trong sessionStorage của trình duyệt này.
						</p>
					</div>
					<button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
						<CircleX className="h-6 w-6" />
					</button>
				</div>

				{/* Provider selector */}
				<div className="mt-6">
					<label className="mb-2 block text-sm font-semibold text-slate-700">Provider</label>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
						{Object.entries(PROVIDER_PRESETS).map(([key, val]) => (
							<button
								key={key}
								type="button"
								onClick={() => handleProviderChange(key)}
								className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${provider === key
									? "border-sky-400 bg-sky-50 text-sky-700"
									: "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
									}`}
							>
								{val.label}
							</button>
						))}
					</div>
				</div>

				{/* Puter: sign-in UI */}
				{isPuter ? (
					<div className="mt-6 rounded-[24px] bg-slate-50 p-4 space-y-4">
						<div className="text-center py-2 space-y-4">
							<div className="text-4xl">☁️</div>
							<div>
								<p className="font-semibold text-slate-900">Puter — AI không cần API key</p>
								<p className="mt-1 text-sm text-slate-500">Đăng nhập để sử dụng 500+ mô hình AI (Qwen, GPT, Claude, Gemini...). Người dùng trả phí sử dụng trực tiếp cho Puter.</p>
							</div>
							{puterUser ? (
								<div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm text-emerald-700">
									<span>✓</span>
									<span>Đã đăng nhập: <strong>{puterUser.email || puterUser.username || "Puter user"}</strong></span>
								</div>
							) : (
								<button
									type="button"
									onClick={handleSignInPuter}
									disabled={signingIn}
									className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
								>
									<LogIn className="h-4 w-4" />
									{signingIn ? "Đang mở cửa sổ đăng nhập..." : "Đăng nhập với Puter"}
								</button>
							)}
						</div>

						{/* Model selector for Puter */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-slate-700">
								Model AI
							</label>
							{puterModelsLoading ? (
								<div className="flex items-center gap-2 text-sm text-slate-500">
									<RefreshCw className="h-4 w-4 animate-spin" />
									Đang tải danh sách model...
								</div>
							) : puterModelsError ? (
								<div className="space-y-2">
									<p className="text-xs text-red-600">{puterModelsError}</p>
									<button
										type="button"
										onClick={() => void fetchPuterModels()}
										className="text-xs text-sky-600 underline"
									>
										Thử lại
									</button>
								</div>
							) : puterModels.length > 0 ? (
								<div className="relative">
									<select
										value={model}
										onChange={(e) => setModel(e.target.value)}
										className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
									>
										<option value="">— Chọn model —</option>
										{puterModels.map((m) => (
											<option key={m.id} value={m.id}>
												{m.name || m.id} {m.provider ? `(${m.provider})` : ""}
											</option>
										))}
									</select>
									<ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
								</div>
							) : (
								<input
									type="text"
									value={model}
									onChange={(e) => setModel(e.target.value)}
									placeholder="qwen/qwen-plus"
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
								/>
							)}
							<p className="text-xs text-slate-500">
								{model ? `Đã chọn: ${model}` : "Chưa chọn model."}
								{puterModels.length > 0 && !model && " Model được lấy trực tiếp từ Puter."}
							</p>
						</div>
					</div>
				) : (
					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						<div className="rounded-[24px] bg-slate-50 p-4 space-y-4">
							<label className="block text-sm font-medium text-slate-700">
								<span className="mb-1 flex items-center gap-2">
									<Link2 className="h-4 w-4 text-sky-700" />
									Base URL
								</span>
								<input
									type="url"
									value={baseUrl}
									onChange={(e) => setBaseUrl(e.target.value)}
									className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
									placeholder="https://api.example.com/v1"
									required
								/>
							</label>

							<label className="block text-sm font-medium text-slate-700">
								<span className="mb-1 flex items-center gap-2">
									<KeyRound className="h-4 w-4 text-sky-700" />
									API Key
								</span>
								<input
									type="password"
									value={apiKey}
									onChange={(e) => setApiKey(e.target.value)}
									className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
									placeholder="sk-..."
									required
								/>
							</label>

							<label className="block text-sm font-medium text-slate-700">
								<span className="mb-1 flex items-center gap-2">
									<KeyRound className="h-4 w-4 text-sky-700" />
									Model ID
								</span>
								{showCustomModelList && customModelList.length > 0 ? (
									<div className="space-y-2">
										<div className="relative mt-1">
											<select
												value={customModelSelectValue}
												onChange={(e) => {
													if (e.target.value === "__custom__") {
														setUsingCustomModelInput(true)
														setModel("")
														return
													}
													setUsingCustomModelInput(false)
													setModel(e.target.value)
												}}
												className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
											>
												<option value="">— Chọn model —</option>
												<option value="__custom__">Khác (nhập thủ công)...</option>
												{customModelList.map((m) => (
													<option key={m.id} value={m.id}>{m.id}</option>
												))}
											</select>
											<ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
										</div>
										{customModelSelectValue === "__custom__" && (
											<input
												type="text"
												value={model}
												onChange={(e) => {
													setUsingCustomModelInput(true)
													setModel(e.target.value)
												}}
												className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
												placeholder={PROVIDER_PRESETS[provider]?.defaultModel || "model-id"}
												required
											/>
										)}
									</div>
								) : (
									<input
										type="text"
										value={model}
										onChange={(e) => setModel(e.target.value)}
										className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
										placeholder={PROVIDER_PRESETS[provider]?.defaultModel || "model-id"}
										required
									/>
								)}
							</label>

							{/* Fetch models button */}
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={handleFetchModels}
									disabled={!baseUrl.trim() || !apiKey.trim() || fetchingModels}
									className="flex items-center gap-1.5 rounded-full border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
								>
									<RefreshCw className={`h-3.5 w-3.5 ${fetchingModels ? "animate-spin" : ""}`} />
									{fetchingModels ? "Đang tìm..." : "Tìm model từ provider"}
								</button>
								{showCustomModelList && customModelList.length > 0 && (
									<span className="text-xs text-slate-500">
										{customModelList.length} model(s) tìm thấy
									</span>
								)}
								{fetchModelsError && (
									<span className="text-xs text-red-600">{fetchModelsError}</span>
								)}
								{showCustomModelList && (
									<button
										type="button"
										onClick={() => {
											setShowCustomModelList(false)
											setCustomModelList([])
										}}
										className="text-xs text-slate-400 underline"
									>
										Ẩn
									</button>
								)}
							</div>
						</div>

						<div className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								{hasStoredCreds && (
									<button
										type="button"
										onClick={handleClearProvider}
										className="flex items-center gap-1.5 rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-50"
									>
										<Trash2 className="h-3.5 w-3.5" />
										Xóa nhà cung cấp
									</button>
								)}
								<button
									type="button"
									onClick={onClearAll}
									className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
								>
									<Trash2 className="h-3.5 w-3.5" />
									Xóa tất cả
								</button>
							</div>
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={onClose}
									className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
								>
									Hủy
								</button>
								<button
									type="submit"
									disabled={!baseUrl.trim() || !apiKey.trim() || !model.trim()}
									className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
								>
									Lưu và sử dụng
								</button>
							</div>
						</div>
					</form>
				)}

				{/* Puter footer actions — show below form when on Puter tab */}
				{isPuter && (
					<div className="mt-4 flex items-center justify-between gap-3">
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={onClearAll}
								className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
							>
								<Trash2 className="h-3.5 w-3.5" />
								Xóa tất cả
							</button>
						</div>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={onClose}
								className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
							>
								Hủy
							</button>
							<button
								type="button"
								onClick={() => {
									onSave({ provider: "puter", baseUrl: "puter", apiKey: "puter", model: model.trim() || PROVIDER_PRESETS.puter.defaultModel })
									onClose()
								}}
								className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
							>
								Lưu và sử dụng
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
