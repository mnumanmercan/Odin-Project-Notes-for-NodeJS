import { createRouter, createWebHistory } from 'vue-router';
import PostsView from '../views/PostsView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import LoginView from '../views/LoginView.vue';
import CreatePostView from '../views/CreatePostView.vue';
import UpdatePostView from '../views/UpdatePostView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/posts',
            component: PostsView
        },
        {
            path: '/posts',
            name: 'posts',
            component: PostsView
        },
        {
            path: '/posts/:id',
            name: 'post-detail',
            component: PostDetailView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/admin/create-post',
            name: 'create-post',
            component: CreatePostView,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/edit-post/:id',
            name: 'edit-post',
            component: UpdatePostView,
            meta: { requiresAuth: true}
        }
    ]
});

// Navigation guard - korumalı sayfalar için
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    // Eğer admin sayfalarına gidiyorsa ve token yoksa login'e yönlendir
    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;