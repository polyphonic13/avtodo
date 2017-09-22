import { TodoLabel } from './todo-label'

export interface Todo {
    id: string
    name: string
    description: string
    isCompleted: boolean
    labels: TodoLabel[]
}