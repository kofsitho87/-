<template>
  <b-container>
    <div v-if="movie" class="d_flex">
      <div class="poster">
        <b-img :src="movie.poster"></b-img>
      </div>
      <div>
        <div>
          {{ movie.title }}
        </div>
        <div>
          {{ movie.link }}
        </div>
        <div>
          {{ movie.director }}
        </div>
        <div>
          {{ movie.actor }}
        </div>
        {{ movie.userRating }}
        {{ movie.pubDate }}
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      movie: null
    }
  },
  created() {
    this.getMovie()
  },
  methods: {
    async getMovie(){
      let movieId = this.$route.params.id
      try {
        let {movie} = await this.$store.dispatch('getMovie', movieId)
        this.movie = movie
      }catch(e){
        throw e
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>