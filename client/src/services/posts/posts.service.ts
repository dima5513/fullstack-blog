import { api } from '@/api'
import type { CreatePostFields, IPost } from '@/types/post.types'

export const getPosts = async (): Promise<IPost[]> => {
    return await api.get('posts').json()
}

export const getPostsByCategory = async (
    categoryName: string
): Promise<IPost[]> => {
    return await api.get(`posts?category=${categoryName}`).json()
}
export const createPost = async (
    postFields: CreatePostFields
): Promise<IPost> => {
    return await api
        .post('posts', {
            json: postFields,
        })
        .json()
}

export const getPostById = async (id: string): Promise<IPost> => {
    return await api.get(`posts/${id}`).json()
}

export const getMyPosts = async (): Promise<IPost[]> => {
    return await api.get('posts/my-posts').json()
}

export const deletePostById = async (postId: number) => {
    return await api.delete(`posts/${postId}`).json()
}
