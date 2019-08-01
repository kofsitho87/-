import axios from './axios'


const state = {
  movies: []
}

const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = state.movies.concat(movies)
  },
  SET_RATING(state, {item, rating}){
    const index = state.movies.indexOf(item)
    state.movies[index].rating = rating
  }
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
  updateRating({commit}, {item, rating}){
    commit('SET_RATING', {item, rating})
  }
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
