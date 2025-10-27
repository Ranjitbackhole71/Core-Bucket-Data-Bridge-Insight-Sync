'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

// Mock data for demonstration
const mockFeedbackStats = {
  total_feedback: 24,
  positive_feedback: 18,
  negative_feedback: 6,
  positive_ratio: 0.75
}

const mockFeedbackList = [
  {
    id: 1,
    case_id: "mumbai-001",
    user_feedback: "up",
    timestamp: "2023-06-15T10:30:00Z",
    comments: "Great recommendations!"
  },
  {
    id: 2,
    case_id: "pune-002",
    user_feedback: "down",
    timestamp: "2023-06-14T15:45:00Z",
    comments: "Could be more accurate"
  },
  {
    id: 3,
    case_id: "ahmedabad-003",
    user_feedback: "up",
    timestamp: "2023-06-13T09:20:00Z",
    comments: "Very helpful analysis"
  }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function FeedbackPage() {
  const [feedbackStats, setFeedbackStats] = useState<any>(null)
  const [feedbackList, setFeedbackList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    case_id: '',
    user_feedback: 'up',
    comments: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, we would fetch this data from the backend
    // For now, we'll use mock data
    setTimeout(() => {
      setFeedbackStats(mockFeedbackStats)
      setFeedbackList(mockFeedbackList)
      setLoading(false)
    }, 500)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    
    try {
      // In a real implementation, we would send the data to the backend
      // For now, we'll simulate the process with a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form
      setFormData({
        case_id: '',
        user_feedback: 'up',
        comments: ''
      })
      
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (err) {
      setSubmitError('Failed to submit feedback. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFeedbackChange = (feedback: 'up' | 'down') => {
    setFormData(prev => ({ ...prev, user_feedback: feedback }))
  }

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
      <h1 className="text-3xl font-bold mb-8">Feedback Center</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feedback Form */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
                  Feedback submitted successfully!
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="case_id">Case ID</Label>
                  <Input
                    id="case_id"
                    name="case_id"
                    value={formData.case_id}
                    onChange={handleInputChange}
                    placeholder="Enter case ID"
                    required
                  />
                </div>
                
                <div>
                  <Label>Feedback Type</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={formData.user_feedback === 'up' ? 'default' : 'outline'}
                      onClick={() => handleFeedbackChange('up')}
                      className="flex items-center gap-2"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </Button>
                    <Button
                      type="button"
                      variant={formData.user_feedback === 'down' ? 'default' : 'outline'}
                      onClick={() => handleFeedbackChange('down')}
                      className="flex items-center gap-2"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Not Helpful
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    placeholder="Add any additional comments..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackList.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Case: {feedback.case_id}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(feedback.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        {feedback.user_feedback === 'up' ? (
                          <ThumbsUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <ThumbsDown className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                    {feedback.comments && (
                      <p className="mt-2 text-gray-700">{feedback.comments}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Feedback Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{feedbackStats.total_feedback}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{feedbackStats.positive_feedback}</p>
                    <p className="text-sm text-gray-600">Positive</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-600">{feedbackStats.negative_feedback}</p>
                    <p className="text-sm text-gray-600">Negative</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{(feedbackStats.positive_ratio * 100).toFixed(1)}%</p>
                    <p className="text-sm text-gray-600">Positive Rate</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Feedback Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}