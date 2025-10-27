"use client"

import * as React from "react"

interface NewsletterProps {
  title?: string
  description?: string
  onSubmit: (email: string) => void
  className?: string
}

export function Newsletter({ title, description, onSubmit, className = "" }: NewsletterProps) {
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    onSubmit(email)
    setIsSuccess(true)
    setEmail("")
    setIsSubmitting(false)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {description && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-4 sm:flex">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="email-address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="w-full px-5 py-3 placeholder-gray-500 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 rounded-md"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 w-full sm:mt-0 sm:ml-3 sm:flex-shrink-0 flex items-center justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {isSuccess && (
        <div className="mt-3 text-sm text-green-600 dark:text-green-400">
          Thank you for subscribing!
        </div>
      )}
    </div>
  )
}