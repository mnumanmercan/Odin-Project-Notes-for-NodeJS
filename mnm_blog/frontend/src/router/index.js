import { createRouter, createWebHistory } from 'vue-router';
import PostsView from '../views/PostsView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/posts'
        },
        {
            path: '/posts',
            name: 'posts',
            component: PostsView
        }
    ]
});

export default router;