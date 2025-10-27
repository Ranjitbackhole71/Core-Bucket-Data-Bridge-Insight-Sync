"use client"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Badge({ 
  children, 
  variant = "default", 
  size = "md", 
  className = ""
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    secondary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}