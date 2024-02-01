<template>
    <Layout>
        <div class="flex-1 flex justify-center items-center">
            <div class="w-[300px]">
                <h2 class="text-center font-bold text-2xl mb-3.5">Логин</h2>
                <form @submit.prevent="register" class="flex flex-col">
                    <div class="mb-2">
                        <Input
                            class="w-full"
                            v-model="email"
                            type="text"
                            placeholder="Почта"
                        />
                        <ul v-if="validationErrors?.email">
                            <ErrorListItem
                                v-for="error in validationErrors.email._errors"
                            >
                                {{ error }}
                            </ErrorListItem>
                        </ul>
                    </div>

                    <div class="mb-2">
                        <Input
                            class="w-full"
                            v-model="username"
                            type="text"
                            placeholder="Логин"
                        />
                        <ul v-if="validationErrors?.username">
                            <ErrorListItem
                                v-for="error in validationErrors?.username
                                    ._errors"
                            >
                                {{ error }}
                            </ErrorListItem>
                        </ul>
                    </div>

                    <div class="mb-2">
                        <Input
                            class="w-full"
                            v-model="password"
                            type="password"
                            placeholder="Пароль"
                        />
                        <ul v-if="validationErrors?.password">
                            <ErrorListItem
                                v-for="error in validationErrors?.password
                                    ._errors"
                            >
                                {{ error }}
                            </ErrorListItem>
                        </ul>
                    </div>

                    <Button class="mb-2"> Зарегистрироваться </Button>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import ErrorListItem from '@/components/ui/ErrorListItem.vue'
import Input from '@/components/ui/Input.vue'
import Layout from '@/components/ui/Layout.vue'
import { registerSchema } from '@/schemas/register/register.schema'
import { useAuth } from '@/store/auth/auth.store'
import type { IServerError } from '@/types/server-error.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { z, ZodFormattedError } from 'zod'

type FormValidationSchema = z.infer<typeof registerSchema>

const router = useRouter()

const authStore = useAuth()
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const serverErrors = ref<IServerError | null>(null)

const validationErrors = ref<ZodFormattedError<FormValidationSchema> | null>({
    _errors: [],
})

async function register() {
    try {
        validationErrors.value = null
        const registerFields = {
            username: username.value,
            email: email.value,
            password: password.value,
        }
        const validationResult = registerSchema.safeParse(registerFields)
        if (!validationResult.success) {
            validationErrors.value = validationResult.error.format()
        } else {
            await authStore.register(registerFields)
            router.push('/')
        }
    } catch (error) {
        serverErrors.value = error as IServerError
    }
}
</script>

<style lang="scss" scoped></style>
