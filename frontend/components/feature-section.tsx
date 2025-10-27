"use client"

interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

interface FeatureSectionProps {
  title?: string
  subtitle?: string
  description?: string
  features: Feature[]
  className?: string
}

export function FeatureSection({ title, subtitle, description, features, className = "" }: FeatureSectionProps) {
  return (
    <div className={`py-12 bg-white dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          {subtitle && (
            <h2 className="text-base font-semibold tracking-wide text-primary uppercase">
              {subtitle}
            </h2>
          )}
          {title && (
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-300">
              {description}
            </p>
          )}
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    {feature.icon && (
                      <div className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        {feature.icon}
                      </div>
                    )}
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}