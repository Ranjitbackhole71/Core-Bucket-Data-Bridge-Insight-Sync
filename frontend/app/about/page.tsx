'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference or saved preference
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    setDarkMode(isDark)
    
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">About</h1>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Land Utilization RL System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The Land Utilization RL System is an advanced platform that leverages Reinforcement Learning 
              to optimize land utilization based on regulatory rules and user feedback.
            </p>
            <p className="mb-4">
              This system processes land parcel data through a multi-agent pipeline that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Fetches and parses regulatory documents</li>
              <li>Classifies applicable rules based on case parameters</li>
              <li>Calculates utilization parameters using rule-based computations</li>
              <li>Applies Reinforcement Learning to optimize rule application order</li>
              <li>Generates 3D geometry visualizations of proposed developments</li>
            </ul>
            <p>
              The system continuously improves through user feedback, which directly influences 
              the RL training process to provide better recommendations over time.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Backend Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Main Pipeline API</h3>
                <p className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono">
                  http://localhost:8000/process_case
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Feedback API</h3>
                <p className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono">
                  http://localhost:5003/feedback
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Feedback Stats API</h3>
                <p className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono">
                  http://localhost:5003/feedback/stats
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Logs</h3>
                <p className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono">
                  /reports/agent_log.txt
                </p>
                <p className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono mt-2">
                  /reports/rl_training_log.jsonl
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This system was developed by a team of urban planning and AI researchers dedicated to 
              creating intelligent solutions for sustainable land utilization.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}