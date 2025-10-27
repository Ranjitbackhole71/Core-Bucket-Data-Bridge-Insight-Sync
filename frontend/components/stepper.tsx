"use client"

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStepId: string
  className?: string
}

export function Stepper({ steps, currentStepId, className = "" }: StepperProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStepId)
  
  return (
    <div className={className}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          
          return (
            <li 
              key={step.id}
              className={`flex items-center ${
                index !== steps.length - 1 ? "w-full" : ""
              }`}
            >
              <div className="flex items-center">
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  ${isCompleted ? "bg-primary text-white" : ""}
                  ${isCurrent ? "border-2 border-primary text-primary" : ""}
                  ${!isCompleted && !isCurrent ? "border-2 border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400" : ""}
                `}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="ml-2">
                  <h3 className={`text-sm font-medium ${
                    isCurrent ? "text-primary" : "text-gray-900 dark:text-white"
                  }`}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className={`flex-auto h-0.5 ${
                  isCompleted ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                }`}></div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}