import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import movie from './movie'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    movie
  }
  // plugins: [vuexLocal.plugin]
})
