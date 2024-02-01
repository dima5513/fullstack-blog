<template>
    <Layout>
        <div v-if="user">
            <div class="flex gap-3">
                <div>
                    <Avatar :path="user.avatar" />
                    <div>email: {{ user.email }}</div>
                    <div>username: {{ user.username }}</div>
                </div>
                <div>
                    <h2
                        v-if="posts.length"
                        class="text-[24px] text-center mb-3"
                    >
                        Мои посты
                    </h2>
                    <h2 v-else class="text-[24px] text-center mb-3">
                        Постов пока нет
                    </h2>
                    <ul>
                        <li class="mb-2" v-for="post in posts">
                            <Post
                                :post="post"
                                @delete-post="showModal"
                                preview
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <Dialog
                as="div"
                class="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                :open="isShowModal"
                @close="closeModal"
            >
                <DialogPanel
                    class="bg-white p-3 rounded-lg text-black flex flex-col"
                >
                    <DialogTitle class="text-xl mb-1"
                        >Удаление поста</DialogTitle
                    >
                    <DialogDescription class="mb-1.5"
                        >Вы точно хотите удалить пост?</DialogDescription
                    >
                    <div class="space-x-2 self-end">
                        <button
                            class="py-1 px-2 rounded-md"
                            @click="closeModal"
                        >
                            Нет
                        </button>
                        <button
                            class="bg-red-400 py-1 px-2 rounded-md"
                            @click="handleDeletePost"
                        >
                            Удалить
                        </button>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>

        <Spinner v-else />
    </Layout>
</template>

<script setup lang="ts">
import Post from '@/components/Post.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Layout from '@/components/ui/Layout.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { deletePostById, getMyPosts } from '@/services/posts/posts.service'
import { useAuth } from '@/store/auth/auth.store'
import type { IPost } from '@/types/post.types'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const { user } = storeToRefs(useAuth())

const posts = ref<IPost[]>([])
const postIdToDelete = ref<number | null>(null)
const isShowModal = ref<boolean>(false)

onMounted(async () => {
    posts.value = await getMyPosts()
})

const showModal = (postId: number) => {
    isShowModal.value = true
    postIdToDelete.value = postId
}

const closeModal = () => {
    isShowModal.value = false
    postIdToDelete.value = null
}
// Сделать папыт с подтверждением удаления поста
const handleDeletePost = async () => {
    try {
        await deletePostById(postIdToDelete.value as number)
        posts.value = posts.value.filter(
            post => post.id !== postIdToDelete.value
        )
        isShowModal.value = false
    } catch (err) {
        console.log(err)
    }
}

// TODO: Реализовать удаление поста ну и далее по плану
</script>

<style scoped></style>
