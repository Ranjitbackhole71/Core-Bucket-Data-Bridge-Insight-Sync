"use client"

interface RatingProps {
  value: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
  className?: string
}

export function Rating({ value, max = 5, onChange, readonly = false, className = "" }: RatingProps) {
  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index + 1)
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          disabled={readonly}
          className={`${
            readonly ? "cursor-default" : "cursor-pointer"
          } text-2xl focus:outline-none`}
        >
          {index < value ? (
            <span className="text-yellow-400">★</span>
          ) : (
            <span className="text-gray-300 dark:text-gray-600">☆</span>
          )}
        </button>
      ))}
    </div>
  )
}