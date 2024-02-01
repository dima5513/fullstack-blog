<template>
    <div class="flex-grow w-full flex justify-center items-center min-h-full">
        <span class="loader"></span>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(farthest-side, #000000 94%, #0000) top/8px 8px
            no-repeat,
        conic-gradient(#0000 30%, #000000);
    -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 8px),
        #000 0
    );
    animation: l13 1s infinite linear;
}
@keyframes l13 {
    100% {
        transform: rotate(1turn);
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
