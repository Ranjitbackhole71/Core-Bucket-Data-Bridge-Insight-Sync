"use client"

import * as React from "react"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  placeholder?: string
}

export function FileUpload({ onFileSelect, accept, placeholder = "Choose a file..." }: FileUploadProps) {
  const [fileName, setFileName] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 mb-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {fileName || placeholder}
          </p>
          {fileName && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Click to change file
            </p>
          )}
        </div>
      </button>
    </div>
  )
}