function ChannelBadge({ channel }) {
  const palettes = {
    'POS Shinhan': 'bg-sky-100 text-sky-800 ring-sky-200',
    Shopee: 'bg-orange-100 text-orange-800 ring-orange-200',
    'TikTok Shop': 'bg-rose-100 text-rose-800 ring-rose-200',
    'MoMo Wallet': 'bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200',
  }

  const tone = palettes[channel] ?? 'bg-slate-100 text-slate-700 ring-slate-200'

  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tone}`}>{channel}</span>
}

export default ChannelBadge
