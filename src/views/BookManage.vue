<template>
    <el-button @click="openAddDialog" style="float: left; margin-bottom: 20px; margin-right: 20px;">
        add book
    </el-button>
    <el-table :data="data.showBookList" border style="width: 100%;" 
        :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="title" label="title" width="240" />
        <el-table-column prop="author" label="author" width="240" />
        <el-table-column prop="ISBN" label="bookNum" />
        <el-table-column prop="publish time" label="publishTime" />
        <el-table-column label="desc" width="300">
            <template #default="scope">
                <span class="bookBriefIntroduction">{{scope.row.bookBriefIntroduction}}</span>
            </template>
        </el-table-column>
        <el-table-column label="operation" width="240">
            <template #default="scope">
                <el-button size="small" @click="readBook(scope.row)">see</el-button>
                <el-popconfirm title="confirm to edit the book?" @confirm="openEditDialog(scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">edit</el-button>
                    </template>
                </el-popconfirm>
                <el-popconfirm title="confirm to delete the book?" @confirm="handleDelete(scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">delete</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="data.total" style="margin-top: 15px; float: right;"
        @current-change="initData" v-model:current-page="data.current" :page-size="data.pageSize" />

    <el-dialog v-model="data.addDialogVisible" title="add book" width="30%">
        <el-input v-model="data.book.title" placeholder="title" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.author" placeholder="author" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.bookNum" placeholder="ISBN" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.publishTime" placeholder="publish Time" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.desc" placeholder="desc" :rows="10" type="textarea" maxlength="500" :resize="none" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.addDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleAdd">Confirm</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="data.editDialogVisible" title="edit book info" width="30%">
        <el-input v-model="data.book.title" placeholder="title" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.author" placeholder="author" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.publishTime" placeholder="publish Time" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.bookNum" placeholder="bookNum" maxlength="50" style="margin-bottom: 20px;" />
        <el-input v-model="data.book.desc" placeholder="desc" :rows="10" type="textarea" maxlength="500" :resize="none" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.editDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleEdit">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { onBeforeMount, reactive } from "vue";
import { deleteRequest, getRequest, message, postRequest, putRequest } from '../utils/api';
import { useRouter } from 'vue-router';

export default {
    name: "BookManage",
    setup() {
        const data = reactive({
            addDialogVisible: false,
            editDialogVisible: false,
            searchInput: "",
            bookList: [],
            showBookList: [],
            book: {
                id: "",
                title: "",
                author: "",
                publishTime: "",
                bookNum:"",
                desc: ""
            },
            total: 100,
            current: 1,
            pageSize: 10,
            userType: "",
        });
        onBeforeMount(() => {
            initData();
        });
        function initData() {
            getRequest("/book/list").then((res) => {
                console.log(res)
                if (res.data.code == 0) {
                    data.bookList = res.data.data;
                    data.showBookList = res.data.data;
                } else if (res.data.code == 500) {
                    message(res.data.msg, "error");
                }
            })
        }
        function handleDelete(row) {
            deleteRequest("/book/delete", {
                id: row.id
            }).then((res) => {
                if (res.data.code == 0) {
                    message(res.data.message, "success");
                    initData();
                } else if (res.data.code == 500) {
                    message(res.data.message, "error");
                }
            });
        }

        function openAddDialog() {
            data.book.title = "";
            data.book.publishTime = "";
            data.book.author = "";
            data.book.desc ="";
            data.book.bookNum = "";
            data.addDialogVisible = true;
        }
        function handleAdd() {
            postRequest("/book/add", {
                title: data.book.title,
                author: data.book.author,
                publishTime: data.book.publishTime,
                desc: data.book.desc,
                bookNum: data.book.bookNum
            }).then((res) => {
                if (res.data.code == 0) {
                    message(res.data.message, "success");
                    initData();
                    data.addDialogVisible = false;
                } else if (res.data.code == 500) {
                    message(res.data.message, "error");
                }
            });
        }

        function openEditDialog(row) {
            data.book.id = row.id;
            data.book.title = row.title;
            data.book.author = row.author;
            data.book.publishTime = row.publishTime,
            data.book.desc = row.desc,
            data.editDialogVisible = true;
        }
        function handleEdit() {
            putRequest("/book/update", {
                id: data.book.id,
                title: data.book.title,
                author: data.book.author,
                publishTime: data.book.publishTime,
                desc: data.book.desc
            }).then((res) => {
                if (res.data.code == 0) {
                    message(res.data.message, "success");
                    initData();
                    data.editDialogVisible = false;
                } else if (res.data.code == 500) {
                    message(res.data.message, "error");
                }
            });
        }

        const myRouter = useRouter();
        function readBook(row) {
            myRouter.push({
                path: "/book",
                query: {
                    bookId: row.bookId,
                    bookName: row.bookName,
                    bookType: row.bookType,
                    desc: row.desc
                }
            })
        }

        return { 
            data,
            initData,
            handleDelete,
            openAddDialog,
            handleAdd,
            openEditDialog,
            handleEdit,
            readBook
        };
    },
};
</script>

<style scoped>
/* 表格显示 */
.bookBriefIntroduction {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>