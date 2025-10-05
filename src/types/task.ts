export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'done'
  createdAt: string
}

export interface TaskResponse {
  data: Task[]
  meta: {
    total: number
    page: number
    limit: number
  }
}

export interface TaskQuery {
  page?: number
  limit?: number
  order?: 'asc' | 'desc'
  sort?: 'createdAt' | 'title' | 'status'
  status?: 'pending' | 'in-progress' | 'done'
}
