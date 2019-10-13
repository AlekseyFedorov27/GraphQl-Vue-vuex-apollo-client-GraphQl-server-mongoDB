import Vue from 'vue'
import Router from 'vue-router'
import movieList from './views/movieList.vue'
import directorList from './views/directorList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movieList',
      component: movieList
    },
    {
      path: '/directorList',
      name: 'directorList',
      component: () => import('./views/directorList.vue')
    }
  ]
})
