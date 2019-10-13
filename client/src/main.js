import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import apollo from './apollo'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)


Vue.config.productionTip = false
Vue.prototype.$apollo = apollo

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
