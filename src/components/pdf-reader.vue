<template>
    <div class="readContainer">
        <img class="readImg" :src="`${pdfReaderApi}?id=${bookId}&pageIndex=${pageIndex}`" />
    </div>
</template>

<script setup lang="ts">
    import { pdfReaderApi } from '@/const/static-data';
    defineProps({ bookId: String, pageIndex: String });
</script>

<style scoped lang="less">
    .readContainer {
        .readImg {
            height: 100vh;
        }
    }
</style>
