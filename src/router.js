import { createRouter, createWebHistory } from 'vue-router'

import BestPosts from "./views/BestPosts";
import RecommendPosts from "./views/RecommendPosts";
import Login from "./views/Login";

const routes = [
    {path:"/login", component: Login},
    {path:"/posts/bestPosts", component: BestPosts},
    {path:"/posts/recommendPosts", component: RecommendPosts}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export {router}