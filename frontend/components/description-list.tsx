"use client"

interface DescriptionListProps {
  children: React.ReactNode
  className?: string
}

export function DescriptionList({ children, className = "" }: DescriptionListProps) {
  return (
    <dl className={`divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
      {children}
    </dl>
  )
}

interface DescriptionListItemProps {
  term: string
  children: React.ReactNode
  className?: string
}

DescriptionList.Item = function DescriptionListItem({ term, children, className = "" }: DescriptionListItemProps) {
  return (
    <div className={`py-4 ${className}`}>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{term}</dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{children}</dd>
    </div>
  )
}