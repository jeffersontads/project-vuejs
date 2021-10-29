import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import vuetify from './plugins/vuetify'
import Crud from './views/Crud'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/crud',
      name: 'Crud',
      component: Crud
    }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
