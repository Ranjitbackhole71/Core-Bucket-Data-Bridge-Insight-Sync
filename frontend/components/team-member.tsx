"use client"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  avatar?: string
  socialLinks?: Array<{
    name: string
    url: string
    icon: React.ReactNode
  }>
  className?: string
}

export function TeamMember({ name, role, bio, avatar, socialLinks, className = "" }: TeamMemberProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center">
          {avatar ? (
            <img className="h-16 w-16 rounded-full" src={avatar} alt={name} />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {role}
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {bio}
        </p>
        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-4 flex space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}