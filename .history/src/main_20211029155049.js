import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://fozbike.local/wp-json/';

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router,
  store,
  vuetify,
  VueRouter,
  render: h => h(App)
}).$mount('#app')
