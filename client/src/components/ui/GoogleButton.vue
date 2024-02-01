<template>
    <a
        :href="href"
        target="_blank"
        class="flex items-center justify-center space-x-3 px-[20px] py-[15px] rounded-[8px] border-current border-2"
    >
        <img class="w-[24px] h-[24px]" src="/google-icon.png" alt="" />
        <span>Войти с помощью гугл</span>
    </a>
</template>

<script setup lang="ts">
type GoogleButtonProps = {
    href: string
}
const { href } = defineProps<GoogleButtonProps>()
</script>

<style scoped></style>
