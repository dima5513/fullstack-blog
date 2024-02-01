import type { IUser } from '@/types/user.types'
import type { IComment } from '@/types/comment.types'
import type { ICategory } from '@/types/category.types'

export interface IPost {
    id: number
    title: string
    content: string
    user: IUser
    comments: IComment[]
    category: ICategory
    createdAt: string
}

export type CreatePostFields = {
    title: string
    content: string
    category: string
}
