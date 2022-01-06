import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/attractions'
    },
    {
        path: '/attractions',
        redirect: '/attractions/rollercoasters'
    },
    {
        path: '/attractions/:attractionType',
        name: 'AttractionsOverview',
        component: () => import(/* webpackChunkName: "attractions" */ '@/views/Attractions/Overview.vue')
    },
    {
        path: '/attractions/:attractionType/:attractionId',
        name: 'AttractionDetail',
        component: () => import(/* webpackChunkName: "attractions" */ '@/views/Attractions/Detail.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
