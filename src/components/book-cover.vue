<template>
    <div class="bookContain" @click="handlerClick">
        <div class="imgContainer">
            <img width="168" :src="coverImg" />
        </div>
        <div class="bookInfoContainer">
            <span :title="name + ' ' + total + '页'">{{ name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({ coverImg: String, name: String, total: Number, bookId: String });
    const emits = defineEmits([`goToBook`]);
    const handlerClick = () => {
        emits('goToBook', props.bookId);
    };
</script>

<style scoped lang="less">
    .bookContain {
        height: 250px;
        width: 169px;
        cursor: pointer;
        text-align: center;
        .imgContainer {
            width: 169px;
            display: flex;
            img {
                margin: auto;
            }
        }
        .bookInfoContainer {
            width: 169px;
            display: flex;
            span {
                margin: auto;
                width: 159px;
                line-height: 30px;
                text-align: center;
                text-overflow: ellipsis; //让超出的用...实现
                white-space: nowrap; //禁止换行
                overflow: hidden; //超出的隐藏
                display: block;
                font-size: 19px;
            }
        }
    }
</style>
