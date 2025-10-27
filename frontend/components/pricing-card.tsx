"use client"

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: PricingFeature[]
  cta: {
    label: string
    onClick: () => void
  }
  popular?: boolean
  className?: string
}

export function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  cta, 
  popular = false,
  className = "" 
}: PricingCardProps) {
  return (
    <div className={`relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm ${className} ${
      popular ? "ring-2 ring-primary" : ""
    }`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
          Most popular
        </div>
      )}
      <div className="p-6">
        <h3 className={`text-lg font-medium ${popular ? "text-primary" : "text-gray-900 dark:text-white"}`}>
          {title}
        </h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {price}
          </span>
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {description}
        </p>
        
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                {feature.included ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <p className={`ml-3 text-sm ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400"}`}>
                {feature.name}
              </p>
            </li>
          ))}
        </ul>
        
        <button
          type="button"
          onClick={cta.onClick}
          className={`mt-8 w-full py-2 px-4 rounded-md ${
            popular 
              ? "bg-primary text-white hover:bg-primary-dark" 
              : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } font-medium`}
        >
          {cta.label}
        </button>
      </div>
    </div>
  )
}