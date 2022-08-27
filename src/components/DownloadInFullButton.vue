<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    url: {
        type: String as PropType<string>,
        default: undefined
    }
})
</script>

<template>
    <a
        class="rounded-lg font-medium bg-dark-700 m-5 text-white text-sm text-center p-2.5 inline-flex items-center dark:bg-blue-600 hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :href="url"
        target="_blank"
        download="LLBG_latvany.pdf"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
        </svg>
        Teljes PDF letöltése
    </a>
</template>
