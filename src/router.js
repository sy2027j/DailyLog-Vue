import { createRouter, createWebHistory } from 'vue-router'

import BestPosts from "./views/BestPosts";
import RecommendPosts from "./views/RecommendPosts";
import Login from "./views/Login";
import Join from "./views/Join";

const routes = [
    {path:"/login", component: Login},
    {path:"/join", component: Join},
    {path:"/posts/bestPosts", component: BestPosts},
    {path:"/posts/recommendPosts", component: RecommendPosts}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export {router}