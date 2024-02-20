<template>
    <div class="not_found">
    </div>
</template>

<script>

export default {
    name: '',
    components: {

    },
    mounted() {

    }, 
}
</script>

<style scoped lang='less'>
.not_found {
    width: 100%;
    height: 100%;
    background: url('../static/img/404.png') no-repeat;
    background-position: center;
    background-size: cover;
    position: fixed;

    p {
        position: fixed;
        top: 50%;
        left: 20%;
        transform: translate(-50%, 0);
        color: #fff;
        span{
            color: orange;
            font-family: '仿宋';
            font-size: 25px;
        }
        a {
            font-size: 30px;
            color: aqua;
            text-decoration: underline;
        }
    }
}
</style>
