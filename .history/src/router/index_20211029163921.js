import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Crud from '../views/Home.vue'
 
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    component: Crud
  }
]

const router = new VueRouter({
  routes
})


export default router
