<template>
  <b-container fluid>
    <b-row>
      <b-card
        v-for="(item, idx) in movies"
        :key="idx"
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
        <star-rating 
          v-if="isAuthenticated"
          :increment="0.5"
          :show-rating="false" 
          :rating="item.rating / 2"
          v-bind:star-size="30"
          @rating-selected="setRatingAction($event, item)"></star-rating>
        <div>total: {{ item.totalRating / 2 }}</div>
        <b-button class="mt-2" href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-row>
    
    <b-button @click="moreAction" block size="lg" variant="primary" v-if="moviesTotal > movies.length">더보기</b-button>
  </b-container>
</template>

<script>
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
      return this.$store.state.movie.movies
    },
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    }
  },
  mounted(){
    //this.$store.dispatch('me')
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
              overview,
              totalRating,
              rating
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
    },
    setRatingAction(rating, item){
      const query = {
        query: `
          mutation {
            updateMovieRating(movieId: "${item.id}", rating: ${rating * 2})
          }
        `
      }
      this.$store.dispatch('updateRating', query)
    }
  }   
}
</script>

<style lang="scss" scoped>

</style>