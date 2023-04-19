import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home'
import SwitchView from '../views/Switch'
import UploadView from '../views/Upload'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/switch',
    name: 'switch',
    component: SwitchView
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
