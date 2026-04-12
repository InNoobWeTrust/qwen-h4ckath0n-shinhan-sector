function StepIndicator({ currentStep, steps }) {
  return (
    <div className="flex items-start gap-2 overflow-x-auto pb-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isDone = stepNumber < currentStep

        return (
          <div key={step.label} className="flex min-w-max flex-1 items-center gap-2">
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : isActive
                      ? 'bg-sky-700 text-white shadow-lg shadow-sky-700/30'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {stepNumber}
              </div>
              <span className={`mt-2 text-xs font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div className="mt-[-20px] h-1 flex-1 rounded-full bg-slate-200">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${stepNumber < currentStep ? 'w-full bg-emerald-400' : 'w-0 bg-emerald-400'}`}
                />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator
