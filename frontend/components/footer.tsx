"use client"

interface FooterProps {
  copyright?: string
  links?: Array<{ label: string; href: string }>
  className?: string
}

export function Footer({ copyright, links, className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={`bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start space-x-6">
          {links?.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-4 md:mt-0 md:order-1">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {copyright || `${currentYear} Land Utilization RL System. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}