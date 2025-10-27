'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts'

// Mock data for demonstration
const mockFeedbackStats = {
  total_feedback: 24,
  positive_feedback: 18,
  negative_feedback: 6,
  positive_ratio: 0.75
}

const mockLogData = [
  { timestamp: '10:30:15', message: 'Orchestrator: Starting run for case: mumbai_case.json' },
  { timestamp: '10:30:16', message: 'InputAgent: Loading case from data\\inputs\\mumbai_case.json' },
  { timestamp: '10:30:17', message: 'Classification Agent: Found 3 applicable rules.' },
  { timestamp: '10:30:18', message: 'Calculation Agent: Finished. Total floor area: 900.0 sqm.' },
  { timestamp: '10:30:19', message: 'RL Agent: Training complete. Metrics: avg_reward: -0.6, success_rate: 0.2' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function DashboardPage() {
  const [feedbackStats, setFeedbackStats] = useState<any>(null)
  const [logData, setLogData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, we would fetch this data from the backend
    // For now, we'll use mock data
    setTimeout(() => {
      setFeedbackStats(mockFeedbackStats)
      setLogData(mockLogData)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const pieData = [
    { name: 'Positive', value: feedbackStats.positive_feedback },
    { name: 'Negative', value: feedbackStats.negative_feedback },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{feedbackStats.total_feedback}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Positive Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{feedbackStats.positive_feedback}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Negative Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{feedbackStats.negative_feedback}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Positive Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{(feedbackStats.positive_ratio * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { time: '09:00', activity: 4 },
                  { time: '10:00', activity: 8 },
                  { time: '11:00', activity: 12 },
                  { time: '12:00', activity: 6 },
                  { time: '13:00', activity: 10 },
                  { time: '14:00', activity: 15 },
                  { time: '15:00', activity: 9 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="activity" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logData.map((log, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-gray-500 min-w-[100px]">{log.timestamp}</span>
                <span className="text-sm">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}