<template>
    <catlog-catlog
        v-for="item in catlogs"
        :key="item"
        :catalog="item"
        @go-to-page="handlerGoToPage"
    ></catlog-catlog>
</template>

<script setup lang="ts">
    //目录
    import { getPostDataExt } from '@/utills/httpUtil';
    import CatlogCatlog from '@/components/catlog-catlog.vue';
    import { ref } from 'vue';
    import { message } from 'ant-design-vue';
    import { ResultEntity } from '@/const/type';
    const props = defineProps({ bookId: String });
    const emits = defineEmits(['goToPage']);
    const catlogs = ref([]);
    getPostDataExt('/api/PDFReaderController/getCatalog', {
        id: props.bookId,
    })
        .then((res) => {
            catlogs.value = res.data;
        })
        .catch((res: ResultEntity) => {
            message.error(res?.msg);
        });
    const handlerGoToPage = (pageIndex: string) => {
        emits('goToPage', pageIndex);
    };
</script>

<style scoped lang="less"></style>
