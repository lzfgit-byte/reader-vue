<template>
    <div class="title">
        <div v-if="catalog.childrens.length > 0" class="iconDiv" @click="hanlderCloseOrOpen">
            <right-outlined v-if="!isOpenChild" />
            <down-outlined v-if="isOpenChild" />
        </div>
        <span class="nameDiv" @click="hanlderCloseOrOpen">
            <span @click="handlerClick">
                {{ catalog.name.replace('\u0000', '') + '  ' + (catalog.pageIndex + 1) }}
            </span>
        </span>
    </div>
    <div v-show="isOpenChild" class="children">
        <catlog-catlog
            v-for="item in catalog.childrens"
            :key="item"
            :catalog="item"
            @go-to-page="handlerGoTOPage"
        ></catlog-catlog>
    </div>
</template>

<script setup lang="ts">
    interface catalog {
        name?: string;
        pageIndex?: number;
        childrens?: catalog[];
    }

    import { PropType, ref } from 'vue';
    import { RightOutlined, DownOutlined } from '@ant-design/icons-vue';

    const props = defineProps({ catalog: Object as PropType<catalog> });
    const emits = defineEmits(['goToPage']);
    const isOpenChild = ref(false);
    const handlerClick = () => {
        emits('goToPage', props?.catalog?.pageIndex);
    };
    const handlerGoTOPage = (pageIndex: number) => {
        emits('goToPage', pageIndex);
    };
    const hanlderCloseOrOpen = () => {
        isOpenChild.value = !isOpenChild.value;
    };
</script>

<style scoped lang="less">
    .children {
        margin-left: 20px;
    }
    .title {
        display: flex;
    }
    .iconDiv {
        cursor: pointer;
        margin-right: 10px;
    }
    .nameDiv {
        cursor: pointer;
    }
    .active {
        background-color: blue;
    }
</style>
