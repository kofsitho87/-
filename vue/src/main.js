import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import FontAwesome from "font-awesome/css/font-awesome.min.css"

import store from "./store"
import router from "./routes"
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(FontAwesome)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
