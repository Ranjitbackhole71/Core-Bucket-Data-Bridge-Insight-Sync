"use client"

interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <div className={className}>
      <div className="flow-root">
        <ul className="-mb-8">
          {items.map((item, index) => (
            <li key={item.id}>
              <div className="relative pb-8">
                {index !== items.length - 1 && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-600 ring-8 ring-white dark:ring-gray-900">
                      {item.icon || (
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                      {item.date && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      )}
                    </div>
                    {item.description && (
                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}