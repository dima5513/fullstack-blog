<template>
    <div class="border-[3px] border-accent rounded-[8px]">
        <div
            class="p-[4px] bg-inverted text-inverted flex flex-wrap items-center space-x-1"
            v-if="editor"
        >
            <TipTapToolbarButton
                title="bold"
                @apply-style="editor.chain().focus().toggleBold().run()"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
                :class="{ 'is-active': editor.isActive('bold') }"
                >bold</TipTapToolbarButton
            >
            <TipTapToolbarButton
                title="italic"
                @apply-style="editor.chain().focus().toggleItalic().run()"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
                :class="{ 'is-active': editor.isActive('italic') }"
                >italic</TipTapToolbarButton
            >
            <TipTapToolbarButton
                title="strike"
                @apply-style="editor.chain().focus().toggleStrike().run()"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
                :class="{ 'is-active': editor.isActive('strike') }"
                >strike</TipTapToolbarButton
            >
            <TipTapToolbarButton
                title="strike"
                @apply-style="
                    editor.chain().focus().clearNodes().unsetAllMarks().run()
                "
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
                >clear marks</TipTapToolbarButton
            >

            <TipTapToolbarButton
                @apply-style="editor.chain().focus().toggleBulletList().run()"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
                :class="{ 'is-active': editor.isActive('bulletList') }"
            >
                bullet list
            </TipTapToolbarButton>
            <TipTapToolbarButton
                @apply-style="
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 1 }),
                }"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
            >
                h1
            </TipTapToolbarButton>
            <TipTapToolbarButton
                @apply-style="
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 2 }),
                }"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
            >
                h2
            </TipTapToolbarButton>
            <TipTapToolbarButton
                @apply-style="
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 3 }),
                }"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
            >
                h3
            </TipTapToolbarButton>
            <!-- <TipTapToolbarButton
                @apply-style="
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 4 }),
                }"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
            >
                h4
            </TipTapToolbarButton> -->
            <!-- <TipTapToolbarButton
                @apply-style="
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 5 }),
                }"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
            >
                h5
            </TipTapToolbarButton> -->

            <!-- <TipTapToolbarButton
                @apply-style="
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 6 }),
                }"
                class="text-inverted p-[4px] rounded-[4px] hover:bg-[rgba(255,255,255,0.2)] duration-200"
                >h6
            </TipTapToolbarButton> -->
        </div>
        <editor-content class="p-[16px]" :editor="editor" />
    </div>
</template>

<script setup lang="ts">
import TipTapToolbarButton from '@/components/ui/TipTapToolbarButton.vue'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const { modelValue } = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: modelValue,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})
</script>

<style lang="scss" scoped>
:deep(.ProseMirror) {
    &:focus {
        outline: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: bold;
    }

    h1 {
        font-size: 32px;
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 24px;
        margin-bottom: 1.25rem;
    }

    h3 {
        font-size: 18px;
        margin-bottom: 1rem;
    }

    ul {
        list-style: disc;
    }
    ul li {
        margin-left: 18px;
    }
}
</style>
