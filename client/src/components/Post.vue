<template>
    <div
        class="border-[2px] border-accent p-[8px] rounded-[8px] overflow-hidden"
        :class="{
            relative: preview,
        }"
    >
        <div
            :class="{
                'max-h-[300px] min-h-[150px] overflow-hidden': preview,
            }"
        >
            <div
                v-if="preview"
                :class="{
                    'flex items-center justify-start absolute left-0 right-0 bottom-0 h-[35px] px-[5px] py-[3px] text-[14px] text-inverted bg-inverted':
                        preview,
                }"
            >
                <router-link
                    :to="{
                        path: `/posts/${post.id}`,
                    }"
                    >Читать далее...</router-link
                >
            </div>
            <div
                class="space-x-2 border-b-[2px] border-accent pb-[4px] relative"
            >
                <span>{{ post.user.username }}</span>
                <span>
                    {{ relativeDate(post.createdAt) }}
                </span>

                <button
                    v-if="user?.id === post.user.id && path === '/profile'"
                    class="absolute right-0"
                    @click="emit('delete-post', post.id)"
                >
                    Удалить
                </button>
            </div>
            <h2 class="text-[20px] mb-1">{{ post.title }}</h2>
            <p v-html="post.content"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth/auth.store'
import type { IPost } from '@/types/post.types'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { relativeDate } from '../utils/relative-date'
const { path } = useRoute()
const { post } = defineProps<{ post: IPost; preview?: boolean }>()
const { user } = storeToRefs(useAuth())
const emit = defineEmits(['delete-post'])
</script>

<style lang="scss" scoped>
:deep(p) {
    h1 {
        font-size: 32px;
    }
    h2 {
        font-size: 24px;
    }
    h3 {
        font-size: 18px;
    }
    ul {
        list-style-position: outside;
        list-style: disc;
    }
    ul li {
        margin-left: 18px;
    }
}
// TODO: Стили для v-html мождно написать через ::v-deep, подробнее на stackoverflow
</style>
