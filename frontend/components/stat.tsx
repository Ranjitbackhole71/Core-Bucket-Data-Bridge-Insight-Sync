"use client"

interface StatProps {
  value: string | number
  label: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function Stat({ value, label, description, icon, className = "" }: StatProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center">
        {icon && (
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            {icon}
          </div>
        )}
        <div className={icon ? "ml-4" : ""}>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </div>
        </div>
      </div>
      {description && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </div>
      )}
    </div>
  )
}