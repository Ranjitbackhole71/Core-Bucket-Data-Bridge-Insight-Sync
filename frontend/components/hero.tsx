"use client"

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  actions?: React.ReactNode
  image?: string
  className?: string
}

export function Hero({ title, subtitle, description, actions, image, className = "" }: HeroProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            {subtitle && (
              <h2 className="text-base font-semibold tracking-wide text-primary uppercase">
                {subtitle}
              </h2>
            )}
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-3xl text-xl text-gray-500 dark:text-gray-300">
                {description}
              </p>
            )}
            {actions && (
              <div className="mt-10 flex space-x-4">
                {actions}
              </div>
            )}
          </div>
          {image && (
            <div className="mt-10 lg:mt-0">
              <img 
                className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5" 
                src={image} 
                alt={title} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}