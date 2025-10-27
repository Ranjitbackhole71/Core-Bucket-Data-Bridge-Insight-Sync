"use client"

interface CtaProps {
  title: string
  description: string
  primaryAction: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function Cta({ title, description, primaryAction, secondaryAction, className = "" }: CtaProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
            >
              {primaryAction.label}
            </button>
          </div>
          {secondaryAction && (
            <div className="ml-3 inline-flex rounded-md shadow">
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                {secondaryAction.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}