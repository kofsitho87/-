import axios from '../axios'
import store from './index'

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
      //console.log(store.getters.TOKEN);
      let config = {
        headers: {
          authorization: store.getters.TOKEN || ''
        }
      }
      const {data} = await axios.post('/', query, config)
      commit('SET_MOVIES', data.data.movies)
      return data.data
    } catch (e) {
      throw e
    }
  },
  async getMovie(_, movieId) {
    try {
      let config = {
        headers: {
          authorization: store.getters.TOKEN || ''
        }
      }
      const query = {
        query: `
          query {
            movie(id: "${movieId}"){
              id,
              title,
              poster,
              overview,
              director,
              link,
              actor,
              userRating,
              pubDate
            }
          }
        `
      }
      const {data} = await axios.post('/', query, config)
      return data.data
    } catch (e) {
      throw e
    }
  },
  async updateRating({commit}, query){
    
    let config = {
      headers: {
        authorization: store.getters.TOKEN
      }
    }
    const {data} = await axios.post('/', query, config)
    console.log(data.data);
    
    //commit('SET_RATING', {item, rating})
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
