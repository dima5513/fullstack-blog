<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <Main class="flex-grow">
            <slot></slot>
        </Main>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Main from '@/components/ui/Main.vue'
</script>
