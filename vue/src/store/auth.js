import axios from '../axios'


const state = {
  currentUser: {
    user: null,
    token: null
  }
}

const mutations = {
  SET_USER(state, {token, user}){
    state.currentUser.user = user
    state.currentUser.token = token
  },
  CLEAR_LOGIN(state) {
    state.currentUser.user = null
    state.currentUser.token = null
  },
}

const actions = {
  async login({commit}, payload) {
    try {
      const {data} = await axios.post('/', payload)
      if(data.data.login){
        commit('SET_USER', data.data.login)
      }
      return data.data
    } catch (e) {
      throw e
    }
  },
  async logout({ commit }) {
    try {
      commit("CLEAR_LOGIN")
    } catch (e) {
      throw e
    }
  },
  async me({state}) {
    try {
      let config = {
        headers: {
          authorization: state.currentUser.token
        }
      }
      const {data} = await axios.post('/', {query: `query{me{id, name, email}}`}, config)
      return data.data
    } catch (e) {
      throw e
    }
  },
}

const getters = {
  isAuthenticated: state => {
    return !!state.currentUser.user
  },
  TOKEN: state => {
    return state.currentUser.token
  },
}

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

export default {
  state,
  mutations,
  actions,
  getters,
  //plugins: [vuexLocal.plugin]
}
