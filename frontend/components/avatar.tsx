"use client"

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
  shape?: "circle" | "square"
  className?: string
}

export function Avatar({ 
  src, 
  alt = "", 
  fallback, 
  size = "md", 
  shape = "circle",
  className = ""
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-md"
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} ${shapeClasses[shape]} object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${shapeClasses[shape]} bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
      {fallback ? (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {fallback.charAt(0).toUpperCase()}
        </span>
      ) : (
        <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  )
}