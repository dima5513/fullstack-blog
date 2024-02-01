import { api } from '@/api'
import type { CreateCommentFields, IComment } from '@/types/comment.types'

export const addComment = async (
    comment: CreateCommentFields
): Promise<IComment> => {
    return await api
        .post('comment/create', {
            json: comment,
        })
        .json()
}

export const deleteComment = async (commentId: string) => {
    await api.delete(`comment/${commentId}`)
}
