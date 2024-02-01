<template>
    <button
        class="font-bold rounded-[8px] px-[16px] py-[8px] h-[44px] whitespace-nowrap text-[16px]"
        :class="{
            'bg-primary-accent': variant === 'primary',
            'bg-transparent border-[3px] border-secondary-outline-accent text-secondary ':
                variant === 'secondary',
        }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
type Button = {
    variant?: 'primary' | 'secondary'
}

const { variant } = withDefaults(defineProps<Button>(), {
    variant: 'primary',
})
</script>

<style lang="scss" scoped></style>
