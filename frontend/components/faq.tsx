"use client"

import * as React from "react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqProps {
  title?: string
  subtitle?: string
  items: FaqItem[]
  className?: string
}

export function Faq({ title, subtitle, items, className = "" }: FaqProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`bg-white dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {subtitle && (
            <h2 className="text-center text-base font-semibold tracking-wide text-primary uppercase">
              {subtitle}
            </h2>
          )}
          {title && (
            <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
          )}
          <dl className="mt-6 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item, index) => (
              <div key={index} className="pt-6">
                <dt className="text-lg">
                  <button
                    type="button"
                    className="text-left w-full flex justify-between items-start text-gray-900 dark:text-white"
                    onClick={() => toggleItem(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium">{item.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <svg 
                        className={`h-6 w-6 transform ${openIndex === index ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}