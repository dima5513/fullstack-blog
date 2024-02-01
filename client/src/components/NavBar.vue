<template>
    <aside
        v-if="isMobile && open"
        class="fixed left-0 w-[250px] bottom-0 top-0 h-screen bg-base z-50 p-4"
    >
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg">Разделы</h3>
            <button @click="emit('close-sidebar')">
                <IconArrowBack />
            </button>
        </div>
        <nav>
            <ul class="flex flex-col space-y-2">
                <li>
                    <router-link to="/posts?category=design">
                        Дизайн
                    </router-link>
                </li>
                <li>
                    <router-link to="/posts?category=administration">
                        Администрирование
                    </router-link>
                </li>
                <li>
                    <router-link to="/posts?category=development">
                        Разработка
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
    <div
        @click="emit('close-sidebar')"
        v-if="isMobile && open"
        class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-opacity-75 bg-neutral-700 z-30"
    ></div>
    <nav v-if="isDesktop" class="flex-grow flex items-center justify-center">
        <ul class="flex items-center space-x-2">
            <li>
                <router-link to="/posts?category=design">Дизайн</router-link>
            </li>
            <li>
                <router-link to="/posts?category=administration">
                    Администрирование
                </router-link>
            </li>
            <li>
                <router-link to="/posts?category=development">
                    Разработка
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import { inject } from 'vue'

type NavBarTypeProps = {
    open: boolean
}

const isMobile = inject('isMobile')
const isDesktop = inject('isDesktop')
const { open } = defineProps<NavBarTypeProps>()
const emit = defineEmits(['close-sidebar'])
</script>

<style lang="scss" scoped></style>
