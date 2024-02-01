<template>
    <div>
        <form class="flex flex-col" @submit.prevent="emit('submit')">
            <textarea
                class="resize-none bg-transparent border-accent border-2 rounded-[8px] mb-2 p-[5px] placeholder:text-base"
                placeholder="Напишите комментарий..."
                :value="modelValue"
                @input="updateValue"
            />
            <Button class="self-start">Отправить</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
const { modelValue } = defineProps<{ modelValue: string }>()
const emit = defineEmits(['submit', 'update:modelValue'])

const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

<style lang="scss" scoped></style>
