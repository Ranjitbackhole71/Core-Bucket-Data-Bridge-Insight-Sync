'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Activity, 
  Info 
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/case', label: 'Case Processor', icon: FileText },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/logs', label: 'Logs', icon: Activity },
  { href: '/about', label: 'About', icon: Info },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Land Utilization RL
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="sr-only">Open menu</span>
              <div className="h-6 w-6">
                <span className="block h-0.5 w-6 bg-current mb-1.5"></span>
                <span className="block h-0.5 w-6 bg-current mb-1.5"></span>
                <span className="block h-0.5 w-6 bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}