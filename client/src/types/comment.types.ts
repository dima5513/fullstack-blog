import type { IUser } from '@/types/user.types'

export interface IComment {
    id: string
    body: string
    avatar: string | null
    createdAt: string
    user: IUser
}

export type CreateCommentFields = {
    body: string
    post: number
}
