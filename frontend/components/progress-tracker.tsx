"use client"

interface ProgressStep {
  id: string
  title: string
  description?: string
  completed: boolean
  active: boolean
}

interface ProgressTrackerProps {
  steps: ProgressStep[]
  className?: string
}

export function ProgressTracker({ steps, className = "" }: ProgressTrackerProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <nav aria-label="Progress">
        <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1">
              {step.completed ? (
                <div className="group pl-4 py-2 flex flex-col border-l-4 border-primary md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                  <span className="text-xs font-semibold tracking-wide uppercase text-primary">{step.title}</span>
                  {step.description && (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{step.description}</span>
                  )}
                </div>
              ) : step.active ? (
                <div className="pl-4 py-2 flex flex-col border-l-4 border-gray-200 dark:border-gray-700 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4" aria-current="step">
                  <span className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">{step.title}</span>
                  {step.description && (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{step.description}</span>
                  )}
                </div>
              ) : (
                <div className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 dark:border-gray-700 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                  <span className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">{step.title}</span>
                  {step.description && (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{step.description}</span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}