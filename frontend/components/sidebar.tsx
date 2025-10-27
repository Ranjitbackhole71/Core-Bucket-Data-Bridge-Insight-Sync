"use client"

import * as React from "react"

interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  active?: boolean
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
}

export function Sidebar({ items, className = "" }: SidebarProps) {
  return (
    <div className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`${
                  item.active
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
              >
                {item.icon && (
                  <span className="mr-3 flex-shrink-0 h-6 w-6">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}