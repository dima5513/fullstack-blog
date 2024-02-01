<template>
    <header class="sticky z-50 top-0 backdrop-blur bg-fallback-1/50">
        <div
            class="h-[72px] flex items-center max-w-[1430px] px-[15px] mx-auto"
        >
            <div class="flex items-center space-x-2 md:space-x-0 md:block">
                <button
                    @click.stop="openSidebar"
                    class="inline-block md:hidden"
                >
                    <IconMenu />
                </button>
                <div class="font-bold text-[22px]">
                    <router-link to="/">Blog.</router-link>
                </div>
            </div>

            <NavBar :open="open" @close-sidebar="closeSidebar" />
            <div class="ml-auto mr-[10px] md:mx-[10px]">
                <IconMoon
                    v-if="theme === 'light'"
                    @click="switchTheme('dark')"
                />
                <IconSun
                    v-if="theme === 'dark'"
                    @click="switchTheme('light')"
                />
            </div>
            <div v-if="user" class="flex items-center space-x-2">
                <Menu as="div" v-slot="{ open }" class="relative">
                    <MenuButton class="flex items-center space-x-1">
                        <span>{{ user.username }}</span>
                        <IconProfile />
                    </MenuButton>
                    <div v-show="open">
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <MenuItems
                                class="absolute right-0 top-[100%] mt-2 bg-base border-[1px] border-current rounded-md p-1.5 w-[130px]"
                            >
                                <MenuItem v-slot="{ active }">
                                    <div
                                        class="rounded-md py-0.5 px-1 cursor-pointer"
                                        :class="{
                                            'bg-neutral-300': active,
                                        }"
                                    >
                                        <router-link to="/profile">
                                            Профиль
                                        </router-link>
                                    </div>
                                </MenuItem>

                                <MenuItem v-slot="{ active }">
                                    <div
                                        class="rounded-md py-0.5 px-1 cursor-pointer"
                                        :class="{
                                            'bg-error-150': active,
                                        }"
                                        @click="logout"
                                    >
                                        Выйти
                                    </div>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </div>
                </Menu>
                <router-link to="/create-post">
                    <Button>Создать пост</Button>
                </router-link>
            </div>
            <div v-else class="space-x-2">
                <router-link to="/login">
                    <Button>Вход </Button>
                </router-link>
                <router-link to="/register">
                    <Button variant="secondary">Регистрация </Button>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import Button from '@/components/ui/Button.vue'
import { useAuth } from '@/store/auth/auth.store'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import IconMenu from './icons/IconMenu.vue'
import IconMoon from './icons/IconMoon.vue'
import IconSun from './icons/IconSun.vue'

type ThemeCollection = 'light' | 'dark'

const { logout } = useAuth()
const { user } = storeToRefs(useAuth())
const theme = ref<ThemeCollection>('light')
const open = ref<boolean>(false)

const closeSidebar = () => {
    open.value = false
    console.log('click overlay')
}

const openSidebar = () => {
    open.value = true
}

const switchTheme = (value: ThemeCollection) => {
    theme.value = value
    document.querySelector('html')?.setAttribute('data-theme', value)
}

onMounted(() => {
    theme.value =
        (localStorage.getItem('theme') as ThemeCollection | null) || 'light'
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
})

watch(theme, () => {
    localStorage.setItem('theme', theme.value)
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
})
</script>

<style lang="scss" scoped></style>
