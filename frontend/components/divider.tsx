"use client"

interface DividerProps {
  orientation?: "horizontal" | "vertical"
  label?: string
  className?: string
}

export function Divider({ orientation = "horizontal", label, className = "" }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div className={`flex items-center h-full ${className}`}>
        <div className="h-full border-l border-gray-200 dark:border-gray-700"></div>
      </div>
    )
  }

  if (label) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`border-t border-gray-200 dark:border-gray-700 ${className}`}></div>
  )
}