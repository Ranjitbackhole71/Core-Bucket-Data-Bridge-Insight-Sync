'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { RefreshCw } from 'lucide-react'

// Mock data for demonstration
const mockAgentLogs = [
  "[10:30:15] Orchestrator: Starting run for case: mumbai_case.json",
  "[10:30:16] InputAgent: Loading case from data\\inputs\\mumbai_case.json",
  "[10:30:16] InputAgent: Successfully loaded case with keys: ['case_id', 'location', 'road_width', 'plot_size']",
  "[10:30:17] Classification Agent: Starting to select applicable rules.",
  "[10:30:17] Classification Agent: SELECTED rule R-SETBACK-URBAN",
  "[10:30:17] Classification Agent: SELECTED rule R-COVERAGE",
  "[10:30:17] Classification Agent: SELECTED rule R-FAR",
  "[10:30:17] Classification Agent: Found 3 applicable rules.",
  "[10:30:18] Calculation Agent: Starting computations.",
  "[10:30:18] Calculation Agent: Processing case with plot size: 500 sqm",
  "[10:30:18] Calculation Agent: Location is urban",
  "[10:30:18] Calculation Agent: Evaluating setback for road width 9",
  "[10:30:18] Calculation Agent: Using default setback value: 1.5",
  "[10:30:18] Calculation Agent: Coverage for urban is 0.6",
  "[10:30:18] Calculation Agent: FAR for urban is 1.8",
  "[10:30:18] Calculation Agent: Max footprint: 300.0 sqm, Total floor area: 900.0 sqm",
  "[10:30:18] Calculation Agent: Finished. Total floor area: 900.0 sqm.",
  "[10:30:19] RL Agent: Starting RL decision process.",
  "[10:30:19] RL Agent: Expected rule path: ['R-FAR', 'R-COVERAGE', 'R-SETBACK-URBAN']",
  "[10:30:19] RL Agent: Candidate 1 (expected): ['R-FAR', 'R-COVERAGE', 'R-SETBACK-URBAN']",
  "[10:30:19] RL Agent: Candidate 2 (reversed): ['R-SETBACK-URBAN', 'R-COVERAGE', 'R-FAR']",
  "[10:30:19] RL Agent: Initializing RL environment and training...",
  "[10:30:19] RL Environment: Initialized with 3 candidate paths",
  "[10:30:19] Training RL (random policy) for 10 episodes...",
  "[10:30:19] EP 1: action=0, reward=1, chosen=['R-FAR', 'R-COVERAGE', 'R-SETBACK-URBAN'] expected=['R-FAR', 'R-COVERAGE', 'R-SETBACK-URBAN']",
  "[10:30:19] EP 2: action=1, reward=-1, chosen=['R-SETBACK-URBAN', 'R-COVERAGE', 'R-FAR'] expected=['R-FAR', 'R-COVERAGE', 'R-SETBACK-URBAN']",
  "[10:30:19] Avg reward: -0.60, Success rate: 20.00%",
  "[10:30:19] RL Agent: Training complete. Metrics: {'avg_reward': -0.6, 'success_rate': 0.2, 'episodes': 10}",
  "[10:30:19] RL Agent: Process complete.",
  "[10:30:19] Orchestrator: Saved JSON report to outputs\\json\\mumbai_output.json",
  "[10:30:19] Orchestrator: Saved geometry to outputs\\geometry\\mumbai_model.stl",
  "[10:30:19] Orchestrator: Run complete."
]

const mockRlTrainingData = [
  { episode: 1, reward: 1 },
  { episode: 2, reward: -1 },
  { episode: 3, reward: 1 },
  { episode: 4, reward: -1 },
  { episode: 5, reward: 1 },
  { episode: 6, reward: 1 },
  { episode: 7, reward: 1 },
  { episode: 8, reward: -1 },
  { episode: 9, reward: -1 },
  { episode: 10, reward: 1 }
]

export default function LogsPage() {
  const [agentLogs, setAgentLogs] = useState<string[]>([])
  const [rlTrainingData, setRlTrainingData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, we would fetch this data from the backend
    // For now, we'll use mock data
    setTimeout(() => {
      setAgentLogs(mockAgentLogs)
      setRlTrainingData(mockRlTrainingData)
      setLoading(false)
    }, 500)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    // In a real implementation, we would fetch fresh data from the backend
    // For now, we'll simulate the process with a delay
    setTimeout(() => {
      setAgentLogs(mockAgentLogs)
      setRlTrainingData(mockRlTrainingData)
      setLoading(false)
    }, 500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Logs & Monitoring</h1>
        <Button onClick={handleRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* RL Training Reward Curve */}
        <Card>
          <CardHeader>
            <CardTitle>RL Training Reward Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={rlTrainingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="episode" label={{ value: 'Episode', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Reward', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="reward" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Episode Reward"
                />
                <Line 
                  type="monotone" 
                  dataKey="running_avg" 
                  stroke="#82ca9d" 
                  name="Running Average"
                  strokeDasharray="3 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Agent Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {agentLogs.map((log, index) => (
                <div key={index} className="mb-1 last:mb-0">
                  {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}