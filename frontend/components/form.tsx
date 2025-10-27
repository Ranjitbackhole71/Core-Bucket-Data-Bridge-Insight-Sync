"use client"

import * as React from "react"

interface FormProps {
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => void
  className?: string
}

export function Form({ children, onSubmit, className = "" }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}

interface FormFieldProps {
  label: string
  children: React.ReactNode
  error?: string
  required?: boolean
}

Form.Field = function FormField({ label, children, error, required }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  )
}

interface FormGroupProps {
  children: React.ReactNode
  className?: string
}

Form.Group = function FormGroup({ children, className = "" }: FormGroupProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {children}
    </div>
  )
}