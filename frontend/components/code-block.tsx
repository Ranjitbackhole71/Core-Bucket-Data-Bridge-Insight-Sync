"use client"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language, className = "" }: CodeBlockProps) {
  return (
    <pre className={`p-4 rounded-lg bg-gray-800 text-gray-100 overflow-x-auto ${className}`}>
      <code className={language ? `language-${language}` : ""}>
        {code}
      </code>
    </pre>
  )
}