<script setup lang="ts">
import { $ref } from 'vue/macros'
import { computed, onMounted, ref, watch } from 'vue';
import PdfViewer from './components/PdfViewer.vue';
import OpenExternalButton from './components/OpenExternalButton.vue';

const MAX = 48;
const getPage = (): number => {
  const page = parseInt(window.location.search.split('page=')[1]);
  return page > 0 ? page : 1;
}
let currentPage = $ref<number>(getPage())
const zoom = ref<number>(85)
// /home/kristofg/pdf-carousel-2/src/assets/pages/42_PP2024.pdf
const url = computed(() => `./assets/pages/${currentPage}_PP2024.pdf`);

function navLeft() {
  currentPage--;
}

function navRight() {
  if (currentPage < MAX) {
    currentPage++;
  }
}

onMounted(() => {
  document.onkeydown = (e) => {
    e = e || window.event;
    if (e.key === 'ArrowLeft') {
      navLeft()
    } else if (e.key === 'ArrowRight') {
      navRight()
    }
  }
})

// update the url when the page changes
watch(() => currentPage, () => {
  window.history.pushState({}, '', `?page=${currentPage}`);
});
</script>

<template>
  <main class="flex flex-row min-h-screen w-full gap-5 justify-around">
    <button v-show="currentPage != 1" @click="navLeft" type="button">
      <svg class="h-6 w-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
    </button>
    <div class="flex flex-col gap-5 w-full min-h-screen justify-center items-center">
      <input class="absolute top-0 m-3 rounded-lg overflow-hidden appearance-none bg-gray-400 h-6 w-128" type="range"
        min="0" max="150" step="10" v-model="zoom" />
      <PdfViewer :path="url" :zoom="zoom" />
      <nav class="absolute bottom-0 flex flex-row justify-center items-center h-24 w-256">
        <input v-model="currentPage" type="number" :max="MAX"
          class="h-10 w-24 bg-gray-300 border border-gray-300 text-gray-900 text-lg text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required />
        <OpenExternalButton :url="url" />
      </nav>
    </div>
    <button @click="navRight" type="button">
      <svg class="h-6 w-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </main>
</template>

<style scoped>
main {
  background-color: #525659;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button,
a {
  @apply rounded-lg font-medium bg-dark-700 m-5 text-white text-sm text-center p-2.5 inline-flex items-center dark: bg-blue-600 hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
</style>
