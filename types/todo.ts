export type Todo = {
    id: number
    title: string
    description: string | null
    status_id: number | null
    category_id: number | null
    user_id: string
    is_completed: boolean
    due_date: string | null
    created_at: string
    updated_at: string
}
