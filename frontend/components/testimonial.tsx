"use client"

interface TestimonialProps {
  quote: string
  author: {
    name: string
    title: string
    avatar?: string
  }
  className?: string
}

export function Testimonial({ quote, author, className = "" }: TestimonialProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-start">
        {author.avatar && (
          <img className="h-12 w-12 rounded-full" src={author.avatar} alt={author.name} />
        )}
        <div className="ml-4">
          <div className="text-lg text-gray-700 dark:text-gray-300 italic">
            "{quote}"
          </div>
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {author.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {author.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}