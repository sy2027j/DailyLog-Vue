import { createRouter, createWebHistory } from 'vue-router'

import BestPosts from "./views/BestPosts";
import SubscribePosts from "./views/SubscribePosts";
import Login from "./views/Login";
import Join from "./views/Join";
import Redirect from "./views/UserRedirect";
import WritePost from "./views/WritePost.vue";
import PostDetail from './views/PostDetail.vue';
import UserHome from './views/UserHome.vue';
import MyInfo from './views/MyInfo.vue';
import store from './store';

const routes = [
    {path:"/dailylog/login", component: Login},
    {path:"/dailylog/join", component: Join},
    {path:"/dailylog/posts/bestPosts", component: BestPosts},
    {path:"/dailylog/posts/subscribePosts", component: SubscribePosts, meta: { requiresAuth: true }},
    {path:"/dailylog/oauth2/redirect", component: Redirect},
    {path:"/dailylog/mypage/newPost", component: WritePost, meta: { requiresAuth: true }},
    {path:"/dailylog/posts/:postId", component: PostDetail},
    {path:"/dailylog/mypage/home/:email", component: UserHome, meta: { requiresAuth: true }},
    {path:"/dailylog/user/home/:email", component: UserHome},
    {path:"/dailylog/mypage/myInfo", component: MyInfo, meta: { requiresAuth: true }},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = store.state.token
    if (to.meta.requiresAuth && !token) {
        next({ path: '/dailylog/login' });
    } else {
        next();
    }
});

export {router}