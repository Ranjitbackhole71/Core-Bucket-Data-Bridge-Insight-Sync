"use client"

interface NotificationBadgeProps {
  count: number
  maxCount?: number
  className?: string
}

export function NotificationBadge({ count, maxCount = 99, className = "" }: NotificationBadgeProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString()
  
  if (count === 0) {
    return null
  }
  
  return (
    <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full ${className}`}>
      {displayCount}
    </span>
  )
}