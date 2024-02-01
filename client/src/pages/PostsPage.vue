<template>
    <Layout>
        <ul v-if="posts && posts.length" class="py-[20px]">
            <li v-for="post in posts">
                <Post class="mb-2.5" :key="post.id" :post="post" preview />
            </li>
        </ul>
        <h2 class="text-center text-[18px]" v-else-if="posts && !posts.length">
            В данной категории нет постов
        </h2>

        <Spinner v-else />
    </Layout>
</template>

<script setup lang="ts">
import Post from '@/components/Post.vue'
import Layout from '@/components/ui/Layout.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { getPostsByCategory } from '@/services/posts/posts.service'
import type { IPost } from '@/types/post.types'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const posts = ref<null | IPost[]>(null)

watchEffect(async () => {
    posts.value = await getPostsByCategory(route.query.category)
})
</script>

<style lang="scss" scoped>
// .loader {
//     width: 48px;
//     height: 48px;
//     border: 5px solid black;
//     border-bottom-color: transparent;
//     border-radius: 50%;
//     display: inline-block;
//     box-sizing: border-box;
//     animation: rotation 1s linear infinite;
// }
</style>
