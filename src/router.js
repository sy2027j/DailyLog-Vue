import { createRouter, createWebHistory } from 'vue-router'

import BestPosts from "./views/BestPosts";
import RecommendPosts from "./views/RecommendPosts";

const routes = [
    {path:"/", component: BestPosts},
    {path:"/about", component: RecommendPosts}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export {router}