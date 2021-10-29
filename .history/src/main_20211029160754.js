import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Crud from './views/Crud'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Crud,
  render: h => h(App)
}).$mount('#app')
