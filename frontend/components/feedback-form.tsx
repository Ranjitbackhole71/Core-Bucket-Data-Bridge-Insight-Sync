"use client"

import * as React from "react"

interface FeedbackFormProps {
  onSubmit: (data: { caseId: string; feedbackType: "positive" | "negative"; comments: string }) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [caseId, setCaseId] = React.useState("")
  const [feedbackType, setFeedbackType] = React.useState<"positive" | "negative">("positive")
  const [comments, setComments] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ caseId, feedbackType, comments })
    // Reset form
    setCaseId("")
    setComments("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Submit Feedback</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="caseId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Case ID
          </label>
          <input
            type="text"
            id="caseId"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="Enter case ID"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Feedback Type
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setFeedbackType("positive")}
              className={`flex-1 py-2 px-4 rounded-md border ${
                feedbackType === "positive"
                  ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-100"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              👍 Positive
            </button>
            <button
              type="button"
              onClick={() => setFeedbackType("negative")}
              className={`flex-1 py-2 px-4 rounded-md border ${
                feedbackType === "negative"
                  ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-100"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              👎 Negative
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="Add your comments here..."
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  )
}