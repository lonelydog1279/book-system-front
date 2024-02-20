import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import BookManage from '../views/BookManage.vue'
import Book from '../views/Book.vue'
import Error from '../views/Error.vue'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/error',
        name: 'Error',
        component: Error,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/bookManage',
        children: [
            {
                path: '/bookManage',
                name: 'BookManage',
                component: BookManage,
            },
            {
                path: '/bookDetail',
                name: 'Book',
                component: Book,
            }
        ]
    },
    {
      path: '/:catchAll(.*)', // 匹配所有路由
      redirect: '/error'
    }
  
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router