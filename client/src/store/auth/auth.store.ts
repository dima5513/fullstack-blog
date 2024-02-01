import { defineStore } from 'pinia'
import { onErrorCaptured, onMounted, ref, watch } from 'vue'
import { api } from '@/api'
import { useRouter } from 'vue-router'
import type {
    IUser,
    LoginUserFields,
    RegisterUserFields,
} from '@/types/user.types'
import type { IServerError } from '@/types/server-error.types'

export const useAuth = defineStore('profile', () => {
    const router = useRouter()
    const user = ref<IUser | null>(null)

    async function fetchUser() {
        try {
            const response = await api.get('auth/me')

            user.value = await response.json()
        } catch (error) {
            router.push('/login')
        }

        // router.push('/login')
    }

    async function login({ email, password }: LoginUserFields) {
        try {
            const response = await api.post('auth/login', {
                json: {
                    email,
                    password,
                },
            })

            user.value = await response.json()
        } catch (error) {
            throw error
        }
    }

    async function logout() {
        try {
            await api.get('auth/logout')
            user.value = null
            router.push('/login')
        } catch (error) {
            throw error
        }
    }

    async function register({ username, email, password }: RegisterUserFields) {
        try {
            const response = await api.post('auth/register', {
                json: {
                    username,
                    email,
                    password,
                },
            })

            user.value = await response.json()
        } catch (error) {
            throw error
        }
    }

    // onMounted(async () => {
    //     try {
    //         await fetchUser()
    //     } catch (e) {
    //         router.push('/login')
    //     }
    // })

    return {
        user,
        logout,
        login,
        fetchUser,
        register,
    }
})
