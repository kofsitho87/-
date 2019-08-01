import axios from './axios'


const state = {
  movies: []
}

const mutations = {
  SET_MOVIES(state, s3dir) {
  },
}

const actions = {
  async getMovies({commit}, query) {
    try {
      const {data} = await axios.post('/', query)
      commit('SET_MOVIES', data.data.movies)
      return data.data
    } catch (e) {
      throw e
    }
  },
}

const getters = {
  s3dir: state => {
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
