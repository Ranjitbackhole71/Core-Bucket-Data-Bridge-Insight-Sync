"use client"

import * as React from "react"

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  "aria-label"?: string
}

export function IconButton({ 
  icon, 
  onClick, 
  disabled = false, 
  variant = "primary", 
  size = "md", 
  className = "",
  "aria-label": ariaLabel
}: IconButtonProps) {
  const variantClasses = {
    primary: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
    secondary: "text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900",
    ghost: "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
  }

  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center rounded-md ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {icon}
    </button>
  )
}