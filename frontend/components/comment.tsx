"use client"

interface CommentProps {
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
  className?: string
}

export function Comment({ author, content, date, className = "" }: CommentProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {author.avatar ? (
        <img className="h-10 w-10 rounded-full" src={author.avatar} alt={author.name} />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {author.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {author.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {date}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}