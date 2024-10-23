import { createRouter, createWebHistory } from 'vue-router'

import BestPosts from "./views/BestPosts";
import RecommendPosts from "./views/RecommendPosts";
import Login from "./views/Login";
import Join from "./views/Join";
import Redirect from "./views/UserRedirect";

const routes = [
    {path:"/dailylog/login", component: Login},
    {path:"/dailylog/join", component: Join},
    {path:"/dailylog/posts/bestPosts", component: BestPosts},
    {path:"/dailylog/posts/recommendPosts", component: RecommendPosts},
    {path:"/dailylog/oauth2/redirect", component: Redirect}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export {router}