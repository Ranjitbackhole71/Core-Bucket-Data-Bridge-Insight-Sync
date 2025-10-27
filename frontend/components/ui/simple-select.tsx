"use client"

import * as React from "react"

interface SimpleSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  placeholder?: string
}

const SimpleSelect = ({ value, onValueChange, children, placeholder }: SimpleSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || "")
  
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])
  
  const handleSelect = (val: string) => {
    setSelectedValue(val)
    onValueChange?.(val)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || placeholder || "Select an option"}</span>
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
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md mt-1 max-h-60 overflow-y-auto z-50">
          <div className="p-1">
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  handleSelect
                })
              }
              return child
            })}
          </div>
        </div>
      )}
    </div>
  )
}

interface SimpleSelectItemProps {
  value: string
  children: React.ReactNode
  handleSelect?: (value: string) => void
}

const SimpleSelectItem = ({ value, children, handleSelect }: SimpleSelectItemProps) => {
  return (
    <div
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100"
      onClick={() => handleSelect?.(value)}
    >
      <span>{children}</span>
    </div>
  )
}

export { SimpleSelect, SimpleSelectItem }