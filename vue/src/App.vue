<template>
  <b-container fluid>
    <b-row>
      <b-card
        v-for="item in movies"
        :key="item.id"
        :title="item.title"
        :img-src="item.poster"
        img-alt="Image"
        img-top
        tag="article"
        class="col-sm-12 col-md-6 col-lg-3"
      >
        <b-card-text>
          {{item.overview}}
        </b-card-text>
        <star-rating :show-rating="false" v-model="item.rating"></star-rating>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-row>
    
    <b-button @click="moreAction" block size="lg" variant="primary" v-if="moviesTotal > movies.length">더보기</b-button>
  </b-container>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  data(){
    return {
      page: 1,
      moviesTotal: 0,
      //movies: []
    }
  },
  computed: {
    movies(){
      console.log(this.$store.state.movie)
      
      return this.$store.state.movie.movies
    }
  },
  mounted(){
    this.getMovies()
  },
  methods: {
    async getMovies(){
      const query = {
        query: `
          query {
            moviesTotal,
            movies(page:${this.page}, count:10){
              id,
              title,
              poster,
              overview
            }
          }
        `
      }
      try{
        let {moviesTotal} = await this.$store.dispatch('getMovies', query)
        this.moviesTotal = moviesTotal
        
      }catch(e){
        throw e
      }
    },
    moreAction(){
      this.page++
      this.getMovies()
    }
  }
}
</script>
