import { createRouter, createWebHistory } from 'vue-router'
import CreatePostPage from '@/pages/CreatePostPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import PostDetailPage from '@/pages/PostDetailPage.vue'
import PostsPage from '@/pages/PostsPage.vue'
import Profile from '@/pages/Profile.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/create-post', component: CreatePostPage },
        { path: '/posts', component: PostsPage },
        { path: '/posts/:id', component: PostDetailPage },
        { path: '/profile', component: Profile },
    ],
})
