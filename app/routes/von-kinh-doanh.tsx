import { useCallback, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeDollarSign,
  CircleDollarSign,
  Cpu,
  ShieldCheck,
  ShoppingBag,
  Store,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

import CreditScoreModal from "../components/CreditScoreModal";
import LoanApplicationModal from "../components/LoanApplicationModal";
import ExplanationPanel from "../components/ui/ExplanationPanel";
import ModelSelector from "../components/ui/ModelSelector";
import ProviderCredentialsModal from "../components/ui/ProviderCredentialsModal";
import SparkleButton from "../components/ui/SparkleButton";
import { useExplanation } from "../hooks/useExplanation";
import {
  clearAllCredentials,
  clearProviderCredential,
  hasProviderCredential,
  readActiveCredential,
  readActiveProvider,
  readAllCredentials,
  writeProviderCredential,
} from "../src/lib/explainSession";
import {
  computeScore,
  formatLimit,
  getBandColor,
  type ScoreComponents,
} from "../src/lib/creditScoring";
import { mockMerchants } from "../src/lib/mockMerchants";
import { expandFactors } from "../src/lib/reasonCodes";
import type { Route } from "./+types/von-kinh-doanh";

const MAX_SCORE = 850;
const MIN_SCORE = 300;

const businessIcons: Record<string, LucideIcon> = {
  M1: Store,
  M2: CircleDollarSign,
  M3: UtensilsCrossed,
  M4: Cpu,
  M5: ShoppingBag,
};

const bandPalettes = {
  sky: {
    badge: "bg-sky-100 text-sky-700",
    border: "border-sky-300",
    button: "bg-sky-700 hover:bg-sky-800 text-white",
    icon: "bg-sky-100 text-sky-700",
    ring: "ring-sky-200",
    soft: "bg-sky-50 text-sky-800",
    strong: "text-sky-700",
    track: "bg-sky-500",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-300",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    icon: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-200",
    soft: "bg-emerald-50 text-emerald-800",
    strong: "text-emerald-700",
    track: "bg-emerald-500",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-300",
    button: "bg-amber-500 hover:bg-amber-600 text-white",
    icon: "bg-amber-100 text-amber-700",
    ring: "ring-amber-200",
    soft: "bg-amber-50 text-amber-800",
    strong: "text-amber-700",
    track: "bg-amber-500",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700",
    border: "border-orange-300",
    button: "bg-orange-500 hover:bg-orange-600 text-white",
    icon: "bg-orange-100 text-orange-700",
    ring: "ring-orange-200",
    soft: "bg-orange-50 text-orange-800",
    strong: "text-orange-700",
    track: "bg-orange-500",
  },
  rose: {
    badge: "bg-rose-100 text-rose-700",
    border: "border-rose-300",
    button: "bg-rose-600 hover:bg-rose-700 text-white",
    icon: "bg-rose-100 text-rose-700",
    ring: "ring-rose-200",
    soft: "bg-rose-50 text-rose-800",
    strong: "text-rose-700",
    track: "bg-rose-500",
  },
  slate: {
    badge: "bg-slate-100 text-slate-700",
    border: "border-slate-300",
    button: "bg-slate-900 hover:bg-slate-800 text-white",
    icon: "bg-slate-100 text-slate-700",
    ring: "ring-slate-200",
    soft: "bg-slate-100 text-slate-800",
    strong: "text-slate-700",
    track: "bg-slate-500",
  },
};

const scoreSegments = [
  {
    key: "revenue",
    label: "Doanh thu",
    detail: "Quy mô doanh số và khả năng tạo dòng tiền",
    weight: 0.35,
    barClass: "bg-sky-500",
  },
  {
    key: "stability",
    label: "Ổn định",
    detail: "Độ đều doanh thu, lịch sử vận hành và biến động",
    weight: 0.25,
    barClass: "bg-emerald-500",
  },
  {
    key: "payment",
    label: "Thanh toán",
    detail: "Chất lượng đối soát, refund rate và nhịp thanh toán",
    weight: 0.25,
    barClass: "bg-amber-500",
  },
  {
    key: "diversity",
    label: "Đa dạng",
    detail: "Mức độ đa kênh và số nguồn dữ liệu được xác minh",
    weight: 0.15,
    barClass: "bg-indigo-500",
  },
] as const;

type ScoreSegment = (typeof scoreSegments)[number];

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} VND`;
}

function getScoreProgress(score: number): number {
  return Math.max(0, Math.min(100, ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100));
}

function formatChange(change: string): string {
  return change || "0 điểm";
}

function getSegmentBand(value: number): string {
  if (value >= 70) return "Rất mạnh";
  if (value >= 55) return "Ổn định";
  if (value >= 40) return "Cần cải thiện";
  return "Rủi ro cao";
}

function buildFocusedComponents(key: keyof ScoreComponents, value: number): ScoreComponents {
  return {
    revenue: key === "revenue" ? value : 0,
    stability: key === "stability" ? value : 0,
    payment: key === "payment" ? value : 0,
    diversity: key === "diversity" ? value : 0,
  };
}

interface ScoreSegmentCardProps {
  segment: ScoreSegment;
  value: number;
  contribution: number;
  merchantName: string;
  hasProvider: boolean;
  onProviderRequired: () => void;
  onPuterNotSignedIn: () => void;
}

function ScoreSegmentCard({
  segment,
  value,
  contribution,
  merchantName,
  hasProvider,
  onProviderRequired,
  onPuterNotSignedIn,
}: ScoreSegmentCardProps) {
  const { explanation, loading, error, requestExplanation } = useExplanation({
    payload: {
      score: value,
      band: getSegmentBand(value),
      components: buildFocusedComponents(segment.key, value),
      merchantName,
    },
    getProvider: () => {
      const result = readActiveCredential();
      if (!result) return null;
      return {
        provider: result.provider,
        baseUrl: result.credential.baseUrl,
        apiKey: result.credential.apiKey,
        model: result.credential.model,
      };
    },
    onProviderRequired,
    onPuterNotSignedIn,
  });

  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-900">{segment.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{segment.detail}</p>
        </div>
        <div className="flex flex-col items-end gap-3 text-right">
          <div>
            <p className="text-lg font-semibold text-slate-900">{value}/100</p>
            <p className="text-sm text-slate-500">+{contribution} điểm</p>
          </div>
          <SparkleButton
            onClick={() => {
              if (!hasProvider) {
                onProviderRequired();
                return;
              }
              void requestExplanation();
            }}
            loading={loading}
            className="bg-white"
          >
            Giải thích trụ cột
          </SparkleButton>
        </div>
      </div>
      <div className="mt-4 h-3 rounded-full bg-slate-200">
        <div
          className={`h-3 rounded-full ${segment.barClass}`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
        Trọng số {Math.round(segment.weight * 100)}%
      </p>
      <ExplanationPanel
        explanation={explanation}
        loading={loading}
        error={error}
        onRetry={requestExplanation}
        title="Giải thích trụ cột"
        className="mt-4"
      />
    </div>
  );
}

export async function loader() {
  return {
    merchants: Object.values(mockMerchants).sort((left, right) => left.id.localeCompare(right.id)),
  };
}

export default function VonKinhDoanh({ loaderData }: Route.ComponentProps) {
  const merchants = loaderData.merchants;
  const [selectedMerchantId, setSelectedMerchantId] = useState(merchants[0]?.id ?? "M1");
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(() => readActiveProvider());
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [puterNeedsAuth, setPuterNeedsAuth] = useState(false);

  const selectedMerchant =
    merchants.find((merchant) => merchant.id === selectedMerchantId) ?? merchants[0];

  const scoreData = useMemo(() => {
    if (!selectedMerchant) {
      return { score: MIN_SCORE, band: "Yếu nhiều", limit: 0 };
    }

    return computeScore(selectedMerchant.scores);
  }, [selectedMerchant]);

  const positiveFactors = useMemo(
    () => expandFactors(selectedMerchant?.positiveFactors ?? []),
    [selectedMerchant],
  );
  const negativeFactors = useMemo(
    () => expandFactors(selectedMerchant?.negativeFactors ?? []),
    [selectedMerchant],
  );

  const bandColor = getBandColor(scoreData.band);
  const palette = bandPalettes[bandColor as keyof typeof bandPalettes] ?? bandPalettes.slate;
  const progress = getScoreProgress(scoreData.score);
  const hasActiveProvider = Boolean(readActiveCredential());
  const isPositiveChange = !selectedMerchant.change.trim().startsWith("-");
  const MerchantIcon = businessIcons[selectedMerchant.id] ?? BadgeDollarSign;

  const openProviderModal = useCallback(() => {
    setPuterNeedsAuth(false);
    setShowProviderModal(true);
  }, []);

  const handlePuterNotSignedIn = useCallback(() => {
    setPuterNeedsAuth(true);
    setShowProviderModal(true);
  }, []);

  const {
    explanation: overallExplanation,
    loading: overallExplanationLoading,
    error: overallExplanationError,
    requestExplanation: requestOverallExplanation,
  } = useExplanation({
    payload: {
      score: scoreData.score,
      band: scoreData.band,
      components: selectedMerchant.scores,
      merchantName: selectedMerchant.name,
    },
    getProvider: () => {
      const result = readActiveCredential();
      if (!result) return null;
      return {
        provider: result.provider,
        baseUrl: result.credential.baseUrl,
        apiKey: result.credential.apiKey,
        model: result.credential.model,
      };
    },
    onProviderRequired: () => setShowProviderModal(true),
    onPuterNotSignedIn: handlePuterNotSignedIn,
  });

  const handleProviderSave = useCallback((config: { provider: string; baseUrl: string; apiKey: string; model: string }) => {
      writeProviderCredential(config.provider, { baseUrl: config.baseUrl, apiKey: config.apiKey, model: config.model });
      setActiveProvider(config.provider);
      setPuterNeedsAuth(false);
    }, []);

  const handleProviderClear = useCallback((provider: string) => {
    clearProviderCredential(provider);
    setActiveProvider(readActiveProvider());
  }, []);

  const handleClearAllProviders = useCallback(() => {
    clearAllCredentials();
    setActiveProvider(null);
    setPuterNeedsAuth(false);
    setShowProviderModal(false);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.72),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,#eff6ff_0%,#f8fafc_35%,#f8fafc_100%)] text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay về Shinhan SoftPOS
              </a>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                <BadgeDollarSign className="h-4 w-4" />
                Tín Dụng Shinhan
              </div>
              <h1 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Quản Lý Vốn Kinh Doanh
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                Demo chấm điểm tín dụng cho merchant SME dựa trên doanh thu, độ ổn định,
                chất lượng thanh toán và mức độ đa dạng nguồn dữ liệu.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <div className="rounded-[24px] bg-slate-950 p-4 text-white shadow-[0_20px_45px_rgba(15,23,42,0.16)]">
                <p className="text-xs uppercase tracking-[0.18em] text-sky-100">Merchant đang xem</p>
                <p className="mt-2 text-lg font-semibold">{selectedMerchant.name}</p>
                <p className="mt-1 text-sm text-slate-300">{selectedMerchant.businessType}</p>
              </div>
              <div className="rounded-[24px] bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-100">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">Điểm hiện tại</p>
                <p className="mt-2 text-2xl font-semibold">{scoreData.score}</p>
                <p className="mt-1 text-sm">Band {scoreData.band}</p>
              </div>
              <div className="rounded-[24px] bg-amber-50 p-4 text-amber-950 ring-1 ring-amber-100">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-700">Hạn mức tham chiếu</p>
                <p className="mt-2 text-lg font-semibold">{formatLimit(scoreData.limit)}</p>
                <p className="mt-1 text-sm">Theo thang điểm 300-850</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <ModelSelector
              hasProvider={hasActiveProvider}
              providerLabel={
                activeProvider ? `${activeProvider.toUpperCase()} — ${readAllCredentials()[activeProvider]?.model ?? ""}` : undefined
              }
              onConfigure={() => setShowProviderModal(true)}
            />

            <div className="mb-3 mt-6 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Hồ sơ merchant đã xác minh
              </p>
              <p className="text-sm text-slate-500">5 hồ sơ được đối chiếu đúng công thức</p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {merchants.map((merchant) => {
                const merchantScoreData = computeScore(merchant.scores);
                const merchantBandColor = getBandColor(merchantScoreData.band);
                const merchantPalette =
                  bandPalettes[merchantBandColor as keyof typeof bandPalettes] ?? bandPalettes.slate;
                const isActive = merchant.id === selectedMerchant.id;
                const CardIcon = businessIcons[merchant.id] ?? BadgeDollarSign;

                return (
                  <button
                    key={merchant.id}
                    type="button"
                    onClick={() => setSelectedMerchantId(merchant.id)}
                    className={`min-w-[236px] rounded-[28px] border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${
                      isActive
                        ? `${merchantPalette.border} ring-2 ${merchantPalette.ring}`
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`rounded-2xl p-3 ${merchantPalette.icon}`}>
                        <CardIcon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${merchantPalette.badge}`}>
                        {merchantScoreData.score}
                      </span>
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-slate-900">{merchant.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{merchant.businessType}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className={`rounded-full px-3 py-1 font-medium ${merchantPalette.soft}`}>
                        {merchantScoreData.band}
                      </span>
                      <span className="font-medium text-slate-500">{formatLimit(merchantScoreData.limit)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <main className="mt-6 grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Tổng quan tín dụng
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  {selectedMerchant.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedMerchant.businessType} với {selectedMerchant.transactions.txnCount.toLocaleString("vi-VN")} giao dịch
                  trong {selectedMerchant.historyDays} ngày gần nhất.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className={`rounded-2xl p-3 ${palette.icon}`}>
                  <MerchantIcon className="h-6 w-6" />
                </div>
                <SparkleButton
                  onClick={() => {
                    if (!hasActiveProvider) {
                      setShowProviderModal(true);
                      return;
                    }
                    void requestOverallExplanation();
                  }}
                  loading={overallExplanationLoading}
                >
                  Giải thích tổng điểm
                </SparkleButton>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center rounded-[28px] bg-slate-50 px-6 py-8 text-center">
              <div
                className="relative flex h-44 w-44 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(from 220deg, #e2e8f0 0% ${100 - progress}%, ${
                    bandColor === "emerald"
                      ? "#10b981"
                      : bandColor === "sky"
                        ? "#0284c7"
                        : bandColor === "amber"
                          ? "#f59e0b"
                          : bandColor === "orange"
                            ? "#f97316"
                            : bandColor === "rose"
                              ? "#f43f5e"
                              : "#475569"
                  } ${100 - progress}% 100%)`,
                }}
              >
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                  <span className="text-4xl font-semibold tracking-tight text-slate-950">
                    {scoreData.score}
                  </span>
                  <span className="text-sm text-slate-400">/ {MAX_SCORE}</span>
                </div>
              </div>
              <span className={`mt-5 rounded-full px-4 py-2 text-sm font-semibold ${palette.badge}`}>
                {scoreData.band}
              </span>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Công thức áp dụng: (rev x 0,35 + stab x 0,25 + pay x 0,25 + div x 0,15) x 8,5 + 300
              </p>
            </div>

            <ExplanationPanel
              explanation={overallExplanation}
              loading={overallExplanationLoading}
              error={overallExplanationError}
              onRetry={requestOverallExplanation}
              className="mt-4"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Hạn mức đề xuất</p>
                <p className={`mt-2 text-xl font-semibold ${scoreData.limit > 0 ? palette.strong : "text-rose-700"}`}>
                  {formatLimit(scoreData.limit)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Biến động gần đây</p>
                <p className={`mt-2 text-xl font-semibold ${isPositiveChange ? "text-emerald-700" : "text-rose-700"}`}>
                  {formatChange(selectedMerchant.change)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Doanh thu 90 ngày</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {formatCurrency(selectedMerchant.transactions.totalRevenue)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Refund rate</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {(selectedMerchant.transactions.refundRate * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowCreditModal(true)}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Xem Chi Tiết Điểm
              </button>
              <button
                type="button"
                onClick={() => setShowLoanModal(true)}
                className={`inline-flex flex-1 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${palette.button}`}
              >
                Đăng Ký Vay
              </button>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Phân rã điểm tín dụng
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  4 trụ cột chấm điểm và các yếu tố giải thích
                </h2>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {selectedMerchant.transactions.uniquePayers.toLocaleString("vi-VN")} khách hàng xác minh
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                {scoreSegments.map((segment) => {
                  const value = selectedMerchant.scores[segment.key];
                  const contribution = Math.round(value * segment.weight * 8.5);

                  return (
                    <ScoreSegmentCard
                      key={segment.key}
                      segment={segment}
                      value={value}
                      contribution={contribution}
                      merchantName={selectedMerchant.name}
                      hasProvider={hasActiveProvider}
                      onProviderRequired={openProviderModal}
                      onPuterNotSignedIn={handlePuterNotSignedIn}
                    />
                  );
                })}

                <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-amber-950">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                        Kịch bản cải thiện
                      </p>
                      <p className="mt-3 text-sm leading-7">{selectedMerchant.whatIf.condition}</p>
                      <p className="mt-2 text-sm font-semibold">{selectedMerchant.whatIf.improvement}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                    <p className="font-semibold">Yếu tố tích cực</p>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {positiveFactors.map((item) => (
                      <li key={item.code} className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                        <span className="font-semibold text-emerald-700">{item.code}</span>
                        <p className="mt-1">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] border border-rose-100 bg-rose-50 p-5">
                  <div className="flex items-center gap-2 text-rose-700">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="font-semibold">Yếu tố cần theo dõi</p>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {negativeFactors.map((item) => (
                      <li key={item.code} className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                        <span className="font-semibold text-rose-700">{item.code}</span>
                        <p className="mt-1">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-100">
                    Dữ liệu đầu vào
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between gap-3">
                      <span>Doanh thu bình quân tháng</span>
                      <span className="font-semibold text-white">
                        {formatCurrency(selectedMerchant.transactions.avgMonthlyRevenue)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Biến động doanh thu (CV)</span>
                      <span className="font-semibold text-white">{selectedMerchant.transactions.revenueCV}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Nguồn dữ liệu</span>
                      <span className="font-semibold text-white">
                        {selectedMerchant.dataSources.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <CreditScoreModal
        open={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        score={scoreData.score}
        maxScore={MAX_SCORE}
        change={selectedMerchant.change}
        breakdown={selectedMerchant.breakdown}
        scores={selectedMerchant.scores}
        positiveFactors={positiveFactors}
        negativeFactors={negativeFactors}
        whatIf={selectedMerchant.whatIf}
        band={scoreData.band}
      />
      <LoanApplicationModal
        open={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        initialAmount={scoreData.limit}
        merchantName={selectedMerchant.name}
        band={scoreData.band}
        score={scoreData.score}
      />
      <ProviderCredentialsModal
        open={showProviderModal}
        initialProvider={puterNeedsAuth ? "puter" : activeProvider ?? "alibaba"}
        initialConfig={activeProvider ? readAllCredentials()[activeProvider] : undefined}
        onClose={() => {
          setPuterNeedsAuth(false);
          setShowProviderModal(false);
        }}
        onSave={handleProviderSave}
        onClearProvider={handleProviderClear}
        onClearAll={handleClearAllProviders}
      />
    </div>
  );
}
