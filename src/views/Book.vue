<template>
    <h2>{{data.book.title}}</h2>
    <br />
    <h5>
        <span style="margin-right: 30px;">{{data.book.id}}</span>
        <span>{{data.book.author}}</span>
        <span>{{data.book.bookNum}}</span>
        <span>{{data.book.publishTime}}</span>
    </h5>
    <br />
    <h4 style="text-indent: 2em;">{{data.book.desc}}</h4>
</template>

<script>
import { onBeforeMount, reactive } from "vue";
import { useRoute } from 'vue-router';

export default {
    name: "Book",
    setup() {
        const data = reactive({
            book: {
                id: "",
                title: "",
                author: "",
                bookNum: "",
                publishTime: "",
                desc: "",
            }
        });
        const myRoute = useRoute();
        onBeforeMount(() => {
            data.book.id = myRoute.query.id ? myRoute.query.id : "";
            data.book.title = myRoute.query.title ? myRoute.query.title : "";
            data.book.author = myRoute.query.author ? myRoute.query.author : "";
            data.book.desc = myRoute.query.desc ? myRoute.query.desc : "";
            data.book.bookNum = myRoute.query.bookNum ? myRoute.query.bookNum : "";
            data.book.publishTime = myRoute.query.publishTime ? myRoute.query.publishTime : "";
        });
        return { data };
    },
};
</script>

<style scoped>
</style>