import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
