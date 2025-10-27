import axios from 'axios'

// Create axios instances for different services
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
})

const feedbackClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FEEDBACK_URL,
  timeout: 10000,
})

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

// Feedback API endpoints
export const feedbackApi = {
  // Submit feedback
  submitFeedback: (data: any) => 
    feedbackClient.post('/feedback', data),
  
  // Get all feedback
  getFeedback: () => 
    feedbackClient.get('/feedback'),
  
  // Get feedback stats
  getFeedbackStats: () => 
    feedbackClient.get('/feedback/stats'),
}

// Main pipeline API endpoints
export const pipelineApi = {
  // Process a land utilization case
  processCase: (data: any) => 
    apiClient.post('/process_case', data),
  
  // Get system logs
  getAgentLogs: () => 
    apiClient.get('/reports/agent_log.txt'),
  
  // Get RL training logs
  getRlTrainingLogs: () => 
    apiClient.get('/reports/rl_training_log.jsonl'),
}

export default {
  apiClient,
  feedbackClient,
  feedbackApi,
  pipelineApi,
}