<template>
    <Layout>
        <ul v-if="posts && posts.length" class="space-y-[10px]">
            <li v-for="post in posts">
                <Post :key="post.id" :post="post" preview />
            </li>
        </ul>
        <h2 class="text-center text-[18px]" v-else-if="posts && !posts.length">
            Постов пока нет
        </h2>
        <Spinner v-else />
    </Layout>
</template>

<script setup lang="ts">
import Post from '@/components/Post.vue'
import Layout from '@/components/ui/Layout.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { getPosts } from '@/services/posts/posts.service'
import type { IPost } from '@/types/post.types'
import { onMounted, ref } from 'vue'

const posts = ref<IPost[]>()

onMounted(async () => {
    posts.value = await getPosts()
})
</script>

<style lang="scss" scoped></style>
