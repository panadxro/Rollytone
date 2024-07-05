import { createRouter, createWebHistory } from 'vue-router'
import ExploreView from '../views/ExploreView.vue'
import SearchView from '../views/SearchView.vue'
import AlbumDetail from '../components/AlbumDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/album/:id',
      name: 'AlbumDetail',
      component: AlbumDetail
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    }
  ]
})

export default router
