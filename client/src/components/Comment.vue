<template>
    <div
        class="border-2 border-current rounded-[8px] p-[5px] flex items-center"
    >
        <div class="flex">
            <Avatar
                :path="comment.user.avatar"
                class="w-[30px] h-[30px] rounded-[50%] mr-[8px] self-center"
            />
        </div>
        <div>
            <div class="text-[14px] flex space-x-2">
                <span>{{ comment.user.username }}</span>
                <span>{{ relativeCommentDate(comment.createdAt) }}</span>
            </div>
            <p>{{ comment.body }}</p>
        </div>
        <div v-if="user?.username === comment.user.username" class="ml-auto">
            <Button @click="emit('delete-comment', comment.id)">
                Удалить
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/ui/Avatar.vue'
import { useAuth } from '@/store/auth/auth.store'
import type { IComment } from '@/types/comment.types'
import { storeToRefs } from 'pinia'
import { relativeCommentDate } from '../utils/relative-comment-date'
import Button from './ui/Button.vue'
const { user } = storeToRefs(useAuth())

type CommentProps = {
    comment: IComment
}
const { comment } = defineProps<CommentProps>()

const emit = defineEmits(['delete-comment'])
</script>

<style scoped></style>
