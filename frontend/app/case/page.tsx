'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Upload, Play, Eye, Download } from 'lucide-react'

// Mock data for demonstration
const mockInputData = {
  "case_id": "mumbai-001",
  "location": "urban",
  "road_width": 9,
  "plot_size": 500
}

const mockOutputData = {
  "case": {
    "case_id": "mumbai-001",
    "location": "urban",
    "road_width": 9,
    "plot_size": 500
  },
  "selected_rules": ["R-SETBACK-URBAN", "R-COVERAGE", "R-FAR"],
  "calc": {
    "inputs": {
      "case_id": "mumbai-001",
      "location": "urban",
      "road_width": 9,
      "plot_size": 500
    },
    "setback_m": 1.5,
    "max_footprint_sqm": 300.0,
    "total_floor_area_sqm": 900.0,
    "steps": [
      {
        "rule": "SETBACK",
        "calc": "road_width=9 -> setback=1.5"
      },
      {
        "rule": "COVERAGE",
        "calc": "location=urban -> coverage=0.6"
      },
      {
        "rule": "FAR",
        "calc": "base_FAR=1.5 + additional_FAR=0.0 -> total_FAR=1.5"
      }
    ]
  },
  "rl": {
    "chosen_rule_path": ["R-FAR", "R-COVERAGE", "R-SETBACK-URBAN"],
    "rl_metrics": {
      "avg_reward": -0.6,
      "success_rate": 0.2,
      "episodes": 10
    }
  }
}

export default function CaseProcessorPage() {
  const [inputData, setInputData] = useState(JSON.stringify(mockInputData, null, 2))
  const [outputData, setOutputData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRunCase = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // In a real implementation, we would send the data to the backend
      // For now, we'll simulate the process with a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      setOutputData(mockOutputData)
    } catch (err) {
      setError('Failed to process case. Please check your input and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleExportOutput = () => {
    if (!outputData) return
    
    const dataStr = JSON.stringify(outputData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'land_utilization_output.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Case Processor</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Input Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="inputData">Case JSON</Label>
                <Textarea
                  id="inputData"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleRunCase} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {loading ? 'Processing...' : 'Run Case'}
                </Button>
                
                <Button variant="outline" onClick={() => setInputData(JSON.stringify(mockInputData, null, 2))}>
                  Reset Example
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Output Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            {outputData ? (
              <div className="space-y-4">
                <div>
                  <Label>Output JSON</Label>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="text-sm font-mono">
                      {JSON.stringify(outputData, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleExportOutput}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export Output
                  </Button>
                  
                  <Button variant="outline">
                    View Geometry
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                  {loading ? 'Processing case...' : 'Run a case to see results'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}