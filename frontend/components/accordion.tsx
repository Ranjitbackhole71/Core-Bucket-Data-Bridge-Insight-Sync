"use client"

import * as React from "react"

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenId?: string
  className?: string
}

export function Accordion({ items, defaultOpenId, className = "" }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId || null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-800">
          <button
            type="button"
            className="flex justify-between w-full p-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => toggleItem(item.id)}
          >
            <span>{item.title}</span>
            <svg
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                openId === item.id ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {openId === item.id && (
            <div className="p-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}