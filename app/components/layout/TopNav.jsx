function TopNav({ activeTab, onChange, tabs }) {
  return (
    <nav className="mt-6 overflow-x-auto">
      <div className="flex min-w-max flex-wrap gap-2 rounded-[28px] bg-slate-950/90 p-2 text-sm shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          const secondary = tab.secondary

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`rounded-2xl font-semibold transition ${
                active
                  ? secondary
                    ? 'bg-amber-200/90 px-3.5 py-2.5 text-xs text-slate-950'
                    : 'bg-white px-4 py-3 text-sm text-sky-900'
                  : secondary
                    ? 'bg-white/6 px-3.5 py-2.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white'
                    : 'px-4 py-3 text-sm text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default TopNav
