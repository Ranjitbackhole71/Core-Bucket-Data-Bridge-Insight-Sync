"use client"

interface LogViewerProps {
  logs: string[]
  title: string
}

export function LogViewer({ logs, title }: LogViewerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="py-1 text-gray-800 dark:text-gray-200">
                {log}
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">
              No logs available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}