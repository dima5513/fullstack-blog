<template>
    <Layout>
        <div v-if="post">
            <Post :post="post" class="mb-[10px]" />
            <CommentsForm
                v-if="user"
                @submit="handleSubmitComment"
                v-model="commentValue"
                class="mb-2.5"
            />
            <h3 class="text-[18px] mb-2">Комментарии</h3>
            <CommentsList
                @on-delete-comment="id => deleteMyComment(id)"
                :comments="post?.comments || []"
            />
        </div>
        <Spinner v-else />
    </Layout>
</template>

<script setup lang="ts">
import CommentsForm from '@/components/CommentsForm.vue'
import CommentsList from '@/components/CommentsList.vue'
import Post from '@/components/Post.vue'
import Layout from '@/components/ui/Layout.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { addComment, deleteComment } from '@/services/posts/comment.service'
import { getPostById } from '@/services/posts/posts.service'
import { useAuth } from '@/store/auth/auth.store'
import type { IPost } from '@/types/post.types'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { user } = storeToRefs(useAuth())
const route = useRoute()

const post = ref<IPost | null>(null)
const commentValue = ref<string>('')

const handleSubmitComment = async () => {
    try {
        const createdComment = await addComment({
            body: commentValue.value,
            post: parseInt(route.params.id as string),
        })

        post.value?.comments.push(createdComment)
        commentValue.value = ''
    } catch (e) {
        console.log(e)
    }
}

const deleteMyComment = async (id: string) => {
    console.log('Удаление поста')

    try {
        await deleteComment(id)
        if (post.value && post.value.comments.length) {
            post.value.comments = post.value.comments.filter(
                comment => comment.id !== id
            )
        }
    } catch (err) {}
}

onMounted(async () => {
    post.value = await getPostById(route.params.id as string)
})
onUnmounted(() => {
    post.value = null
})
</script>

<style scoped lang="scss"></style>
