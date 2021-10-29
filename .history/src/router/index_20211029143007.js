import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/Home.vue'
 
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
    component: About
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import(/* webpackChunkName: "about" */ '../views/Crud.vue')
  }
]

const router = new VueRouter({
  routes
})


export default router
