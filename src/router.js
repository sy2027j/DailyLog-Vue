import { createRouter, createWebHistory } from 'vue-router'

import BestPosts from "./views/BestPosts";
import SubscribePosts from "./views/SubscribePosts";
import Login from "./views/Login";
import Join from "./views/Join";
import Redirect from "./views/UserRedirect";
import WritePost from "./views/WritePost.vue";
import PostDetail from './views/PostDetail.vue';

const routes = [
    {path:"/dailylog/login", component: Login},
    {path:"/dailylog/join", component: Join},
    {path:"/dailylog/posts/bestPosts", component: BestPosts},
    {path:"/dailylog/posts/subscribePosts", component: SubscribePosts},
    {path:"/dailylog/oauth2/redirect", component: Redirect},
    {path:"/dailylog/mypage/newPost", component: WritePost},
    {path:"/dailylog/posts/:postId", component: PostDetail},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export {router}