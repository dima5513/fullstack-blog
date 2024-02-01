<template>
    <input
        class="border-[2px] bg-transparent border-accent rounded-[8px] p-[8px] outline-none text-base"
        @input="event => emit('update:modelValue', (event.target as HTMLInputElement).value)"
        :value="modelValue"
    />
</template>

<script setup lang="ts">
defineProps({ modelValue: [String] })
const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>
