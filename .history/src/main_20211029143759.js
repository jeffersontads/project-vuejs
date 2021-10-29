import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
 

import axios from 'axios'
import VueAxios from 'vue-axios'


import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.use(VueAxios, axios)


// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://fozbike.local/wp-json/';

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
  ]
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
