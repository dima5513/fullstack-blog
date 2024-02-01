<template>
    <ul class="space-y-2">
        <li v-for="comment in comments">
            <Comment
                @delete-comment="id => emit('on-delete-comment', id)"
                :key="comment.id"
                :comment="comment"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import Comment from '@/components/Comment.vue'
import type { IComment } from '@/types/comment.types'

type CommentsListProps = {
    comments: IComment[]
}

const emit = defineEmits(['on-delete-comment'])
const { comments } = defineProps<CommentsListProps>()
</script>

<style scoped></style>
