import { createRouter, createWebHistory } from 'vue-router'
import HistoryView from '../components/HistoryView.vue'
import SearchView from '../components/SearchView.vue'
import HomeView from '../components/HomeView.vue'


const router = createRouter({
  history: createWebHistory(),
  base: '/search',
  routes: [
    {
      path:'/',
      name: 'Home',
      component: HomeView
    },
    {
        path: '/search',
        name: 'Search',
        component: SearchView
    },
    {
        path: '/history',
        name: 'History',
        component: HistoryView
    }
  ]
})

export default router
