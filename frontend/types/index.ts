// Types for the Land Utilization RL System

export interface CaseInput {
  case_id: string
  location: string
  road_width: number
  plot_size: number
  [key: string]: any // Allow additional properties
}

export interface CaseOutput {
  case: CaseInput
  selected_rules: string[]
  calc: {
    inputs: CaseInput
    setback_m: number
    max_footprint_sqm: number
    total_floor_area_sqm: number
    steps: Array<{
      rule: string
      calc: string
    }>
  }
  rl: {
    chosen_rule_path: string[]
    rl_metrics: {
      avg_reward: number
      success_rate: number
      episodes: number
    }
  }
}

export interface Feedback {
  id?: number
  case_id: string
  input: Record<string, any>
  output: Record<string, any>
  user_feedback: 'up' | 'down'
  timestamp?: string
  comments?: string
}

export interface FeedbackStats {
  total_feedback: number
  positive_feedback: number
  negative_feedback: number
  positive_ratio: number
}

export interface AgentLogEntry {
  timestamp: string
  message: string
}

export interface RlTrainingLogEntry {
  episode: number
  reward: number
  running_avg?: number
  [key: string]: any // Allow additional properties
}