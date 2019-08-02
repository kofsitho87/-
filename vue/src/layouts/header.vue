<template>
  <div>
    <b-row class="">
      <!-- <b-col class="align-self-center pr-0">
        <b-link href="" class="setting-link"
          ><i class="fa fa-filter mr-1"></i>조건설정</b-link
        >
      </b-col> -->
      <b-col class="align-self-center">
        <b-nav class="navbar navbar-expand-md">
          <router-link
            to="/"
            class="navbar-brand align-self-center mx-auto text-center"
          >
            title
          </router-link>
        </b-nav>
      </b-col>
      <b-col class="align-self-center pl-0">
        <ul class="nav justify-content-end right-top-menu">
          <li class="nav-item">
            <router-link class="nav-link" to="/"
              ><i class="fa fa-search"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/"
              ><i class="fa fa-bell"></i
            ></router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <b-button @click="logoutAction">로그아웃</b-button>
            <!-- <a class="nav-link" href="#"><i class="fa fa-user"></i></a> -->
          </li>
          <li v-else class="nav-item">
            <router-link to="/login">로그인</router-link>
          </li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    computed: {
      isAuthenticated(){
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      logoutAction(){
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>