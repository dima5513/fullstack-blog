<template>
    <button @click="$emit('applyStyle')">
        <slot></slot>
    </button>
</template>

<script setup></script>

<style lang="scss">
.is-active {
    @apply bg-[rgba(255,255,255,0.2)];
}
</style>
