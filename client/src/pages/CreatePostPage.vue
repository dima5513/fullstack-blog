<template>
    <Layout>
        <form
            @submit.prevent="handleSubmit"
            class="max-w-[530px] w-[100%] mx-auto"
        >
            <div class="flex justify-between">
                <h3 class="font-bold text-2xl mb-2.5">Добавление поста</h3>
            </div>
            <label class="flex flex-col mb-2">
                <span>Заголовок поста</span>
                <Input v-model="title" />
                <ul v-if="validationErrors?.title">
                    <ErrorListItem
                        v-for="error in validationErrors.title._errors"
                    >
                        {{ error }}
                    </ErrorListItem>
                </ul>
            </label>
            <div class="mb-2">
                <TipTap v-model="content" />
                <ul v-if="validationErrors?.content">
                    <ErrorListItem
                        v-for="error in validationErrors.content._errors"
                    >
                        {{ error }}
                    </ErrorListItem>
                </ul>
            </div>
            <Select
                class="mb-2"
                v-model:selected-value="selectedValue"
                :options="options"
            />

            <ul v-if="validationErrors?.category">
                <ErrorListItem
                    v-for="error in validationErrors.category._errors"
                >
                    {{ error }}
                </ErrorListItem>
            </ul>
            <Button type="submit"> Создать </Button>
        </form>
    </Layout>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import ErrorListItem from '@/components/ui/ErrorListItem.vue'
import Input from '@/components/ui/Input.vue'
import Layout from '@/components/ui/Layout.vue'
import Select from '@/components/ui/Select.vue'
import TipTap from '@/components/ui/TipTap.vue'
import { createPostSchema } from '@/schemas/post/create.schema'
import { createPost } from '@/services/posts/posts.service'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ZodFormattedError, z } from 'zod'
type CreatePostSchema = z.infer<typeof createPostSchema>

const router = useRouter()

const title = ref<string>('')
const content = ref<string>('')
const options = [
    { label: 'Администрирование', value: 'administration' },
    { label: 'Дизайн', value: 'design' },
    { label: 'Разработка', value: 'development' },
]
const selectedValue = ref(options[0])
const validationErrors = ref<ZodFormattedError<CreatePostSchema>>()
const handleSubmit = async () => {
    const createdPost = {
        title: title.value,
        content: content.value,
        category: selectedValue.value.value,
    }
    const validationResult = createPostSchema.safeParse(createdPost)
    if (!validationResult.success) {
        validationErrors.value = validationResult.error.format()
    } else {
        const createdPost = await createPost({
            title: title.value,
            content: content.value,
            category: selectedValue.value.value,
        })
        console.log(createdPost)
        router.replace(`posts/${createdPost.id}`)
    }
}
</script>

<style lang="scss" scoped></style>
