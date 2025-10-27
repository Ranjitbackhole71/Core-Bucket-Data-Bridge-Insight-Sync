"use client"

interface ListProps {
  children: React.ReactNode
  className?: string
}

export function List({ children, className = "" }: ListProps) {
  return (
    <ul className={`divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
      {children}
    </ul>
  )
}

interface ListItemProps {
  children: React.ReactNode
  className?: string
}

List.Item = function ListItem({ children, className = "" }: ListItemProps) {
  return (
    <li className={`py-4 ${className}`}>
      {children}
    </li>
  )
}