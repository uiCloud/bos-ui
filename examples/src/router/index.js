import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home'
import componentViews from './router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

componentViews.forEach((view) => {
  routes.push(...view.route)
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
