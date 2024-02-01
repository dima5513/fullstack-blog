<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth/auth.store'
import { onMounted } from 'vue'

const { fetchUser } = useAuth()

onMounted(fetchUser)
</script>

<style lang="scss" scoped></style>
