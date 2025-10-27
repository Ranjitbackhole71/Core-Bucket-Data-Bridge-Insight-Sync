"use client"

interface SimpleChartProps {
  type: "bar" | "line" | "pie"
  data: Array<{ name: string; value: number }>
  title?: string
}

export function SimpleChart({ type, data, title }: SimpleChartProps) {
  // For now, we'll create a simple visualization that works without external dependencies
  // In a real implementation, this would use Recharts or another charting library
  
  const maxValue = Math.max(...data.map(item => item.value), 0)
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      )}
      
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-600 dark:text-gray-400 truncate">
              {item.name}
            </div>
            <div className="flex-1 ml-2">
              <div className="flex items-center">
                <div 
                  className="h-6 bg-blue-500 rounded-sm"
                  style={{ 
                    width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` 
                  }}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      )}
    </div>
  )
}