<template>
    <div>
        <div
            class="flex justify-between items-center p-[8px] border-[2px] border-accent rounded-[8px] mb-2 cursor-pointer"
            @click="visible = !visible"
        >
            {{ selectedValue.label }}
            <IconChevron />
        </div>
        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <ul
                class="p-[8px] border-[2px] border-accent rounded-[8px]"
                @click.stop
                v-show="visible"
            >
                <li
                    class="cursor-pointer mb-[5px] last:mb-0"
                    v-for="option in options"
                    @click="handleSelect(option)"
                >
                    {{ option.label }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import IconChevron from '@/components/icons/IconChevron.vue'
import type { PropType } from 'vue'
import { ref } from 'vue'

type Option = {
    label: string
    value: string
}

const { options, selectedValue } = defineProps({
    options: {
        type: Array as PropType<Option[]>,
        required: true,
    },
    selectedValue: {
        type: Object as PropType<Option>,
        required: true,
    },
})

const visible = ref<boolean>(false)

const emit = defineEmits(['update:selectedValue'])

const handleSelect = (option: Option) => {
    emit('update:selectedValue', option)
    visible.value = !visible
}
</script>
