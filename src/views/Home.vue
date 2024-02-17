<template>
    <div>
        <div class="nav">
            <div class="title">Book Manager System</div>
            <el-menu :collapse="false" background-color="#3d3d3d" text-color="#fff" active-text-color="#ffd04b" 
                router :default-active="data.curMenu">
                <el-menu-item class="single-item" index="/bookManage"><template #title>Book Manage</template></el-menu-item>
            </el-menu>
        </div>

        <el-card class="content">
            <router-view></router-view>
        </el-card>
    </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "Home",
    setup() {
        const myRouter = useRouter();
        const data = reactive({
            curMenu: "",
            userType: "",
        })
        return {
            data,
        };
    },
};
</script>

<style scoped>
.nav {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100vh;
    background-color: #3d3d3d;
    color: white;
}
.title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    width: 200px;
    border-bottom: 1px solid #666666;
    background-color: #2e2e2e;
    font-size: 20px;
}

.single-item {
    height: 50px;
    width: 200px;
    line-height: 50px;
    background-color: #3d3d3d;
    border-bottom: 1px solid #2e2e2e;
    padding-left: 60px !important;
}
.single-item:hover {
    background-color: #2e2e2e;
    cursor: pointer;
}

/* 内容区域容器样式 */
.content {
    position: absolute;
    left: 200px;
    top: 0;
    width: calc(100vw - 220px);
    height: calc(100vh - 20px);
    margin: 10px;
}
</style>