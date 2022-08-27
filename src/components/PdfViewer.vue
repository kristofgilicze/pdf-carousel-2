<script setup lang="ts">
import { $ref } from 'vue/macros'
import { computed, PropType, ref, toRefs, watch } from 'vue';
import Loading from './Loading.vue';

const props = defineProps({
    path: {
        type: String as PropType<string>,
        default: '',
    },
    zoom: {
        type: Number as PropType<number>
    }
})

const pdfObject = ref<HTMLObjectElement>()
let loading = $ref<boolean>(true)
let key = $ref<number>(0)

function stopLoading() {
    loading = false
}

const { zoom } = toRefs(props)
const opts = computed(() => `#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&zoom=${zoom?.value || 85}`)
const dataURL = computed(() => `${props.path}${opts.value}`);
watch(dataURL, () => { 
    loading = true
    key = Math.random()    
})
</script>

<template>
    <!-- The loading indicator -->
    <div class="w-full h-full flex justify-center items-center" v-show="loading" id="loading">
        <Loading class="w-12 h-12" />
    </div>

    <!-- The iframe -->
    <object
        :key="key"
        @load="stopLoading"
        class="w-full h-full"
        ref="pdfObject"
        :data="dataURL"
        type="application/pdf"
    ></object>
</template>