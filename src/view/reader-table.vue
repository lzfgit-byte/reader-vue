<template>
    <div class="bookContainer">
        <book-cover
            v-for="item in bookInfo"
            :key="item"
            :book-id="item.id"
            :cover-img="item.coverImg"
            :name="item.bookName"
            :total="item.total"
            @go-to-book="handlerGoToBook"
        ></book-cover>
    </div>
</template>

<script setup lang="ts">
    import { getPostDataExt } from '@/utills/httpUtil';
    import { ref } from 'vue';
    import { BookInfo } from '@/const/type';
    import BookCover from '@/components/book-cover.vue';
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    const router = useRouter();
    const bookInfo = ref<BookInfo[]>([]);
    const totalBook = ref(0);
    getPostDataExt('/api/bookInfoController/getAllBooks', {}).then((res) => {
        bookInfo.value = res.data?.data;
        totalBook.value = res.data.total;
    });
    const handlerGoToBook = (bookId: string) => {
        const books = bookInfo.value.filter((item) => item.id === bookId);
        if (books.length === 0) {
            message.warn('未获取到数据');
            return;
        }
        router.push({ path: '/readPdf', query: books[0] });
    };
</script>

<style scoped lang="less"></style>
