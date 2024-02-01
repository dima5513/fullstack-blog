<template>
    <li class="flex items-start">
        <IconError class="fill-error-600 shrink-0" />
        <span class="text-error-600"><slot></slot></span>
    </li>
</template>

<script setup lang="ts">
import IconError from '@/components/icons/IconError.vue'
</script>

<style scoped></style>
