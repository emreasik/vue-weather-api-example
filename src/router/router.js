import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue"
import FavoriteList from "../views/Favorite.vue"


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/fav",
        name: "FavoriteList",
        component: FavoriteList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;