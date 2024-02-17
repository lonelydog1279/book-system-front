<template>
    <h2>{{data.book.bookName}}</h2>
    <br />
    <h5>
        <span style="margin-right: 30px;">{{data.book.bookId}}</span>
        <span>{{data.book.bookType}}</span>
    </h5>
    <br />
    <h4 style="text-indent: 2em;">{{data.book.bookBriefIntroduction}}</h4>
</template>

<script>
import { onBeforeMount, reactive } from "vue";
import { useRoute } from 'vue-router';

export default {
    name: "Book",
    setup() {
        const data = reactive({
            book: {
                bookId: "",
                bookName: "",
                bookType: "",
                bookBriefIntroduction: "",
            }
        });
        const myRoute = useRoute();
        onBeforeMount(() => {
            data.book.bookId = myRoute.query.bookId ? myRoute.query.bookId : "";
            data.book.bookName = myRoute.query.bookName ? myRoute.query.bookName : "";
            data.book.bookType = myRoute.query.bookType ? myRoute.query.bookType : "";
            data.book.bookBriefIntroduction = myRoute.query.bookBriefIntroduction ? myRoute.query.bookBriefIntroduction : "";
        });
        return { data };
    },
};
</script>

<style scoped>
</style>