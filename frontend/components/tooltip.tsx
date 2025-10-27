"use client"

import * as React from "react"

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function Tooltip({ children, content, position = "top", className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(true)
  }

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 100)
  }

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2"
  }

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700",
    right: "left-full top-1/2 transform -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700",
    left: "right-full top-1/2 transform -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700"
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-sm whitespace-nowrap ${positionClasses[position]} ${className}`}
          role="tooltip"
        >
          {content}
          <div 
            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
          />
        </div>
      )}
    </div>
  )
}