import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import VuexPersistence from 'vuex-persist'

import movie from './movie'
import auth from './auth'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    movie,
    auth
  },
  plugins: [vuexLocal.plugin]
})
