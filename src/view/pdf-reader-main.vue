<template>
    <div class="parentContainer">
        <div class="back" @click="handlerBack"
            ><left-outlined :style="{ fontSize: '32px', color: '#08c' }"
        /></div>
        <div class="container">
            <div class="left">
                <book-catlog :book-id="bookInfo.id" @go-to-page="handlerGoToPage"></book-catlog>
            </div>
            <div class="middle">
                <div class="pageContainer">
                    {{ `${pageIndex + 1}/${parseInt(totalPage) + 1}` }}
                </div>
                <pdf-reader
                    :book-id="bookInfo.id"
                    :page-index="pageIndex"
                    :total="totalPage"
                ></pdf-reader>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import PdfReader from '@/components/pdf-reader.vue';
    import { reactive, ref } from 'vue';
    import { message } from 'ant-design-vue';
    import { LeftOutlined } from '@ant-design/icons-vue';
    import BookCatlog from '@/components/book-catlog.vue';
    const props = defineProps({ id: String });
    const route = useRoute();
    const router = useRouter();
    const query = route.query;
    const bookInfo = reactive<Record<string, any>>({});
    Object.keys(query).forEach((key) => (bookInfo[key] = query[key]));

    const pageIndex = ref(0);
    const totalPage = ref(query['total'] || 0);
    const handlerBack = () => {
        router.push({ name: 'main' });
    };
    window.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight') {
            if (+totalPage.value > pageIndex.value) {
                pageIndex.value++;
            } else {
                message.warn('最后一页');
            }
        } else if (event.key === 'ArrowLeft') {
            if (pageIndex.value > 0) {
                pageIndex.value--;
            } else {
                message.warn('现在已经是第一页了');
            }
        }
    });
    const handlerGoToPage = (pageIndex_: string) => {
        pageIndex.value = +pageIndex_;
    };
</script>

<style scoped lang="less">
    .parentContainer {
        position: relative;
        .back {
            position: absolute;
            cursor: pointer;
        }
        .container {
            display: flex;
            .left,
            .middle,
            .right {
                margin: auto;
                width: auto;
                position: relative;
                height: 100vh;
                overflow: auto;
            }
            .pageContainer {
                position: absolute;
                font-size: 22px;
            }
        }
    }
</style>
