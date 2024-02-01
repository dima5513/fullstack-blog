<template>
    <img
        :src="path || '/default.png'"
        alt="avatar"
        class="object-center overflow-hidden"
    />
</template>

<script setup lang="ts">
type AvatarProps = {
    path: string | null
}
const { path } = defineProps<AvatarProps>()
</script>
