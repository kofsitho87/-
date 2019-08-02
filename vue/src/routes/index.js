import Vue from "vue"
import VueRouter from "vue-router"
//import store from "@/store"

import Home from "@/views/Home"
import Login from "@/views/Login"

Vue.use(VueRouter)

// const requireAuth = (to, from, next) => {
//   if (store.getters.isAuthenticated) return next()
//   return next("/")
// }

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home"
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   //document.title = to.meta.title
//   if (to.name == "Login" && store.auth.getters.isAuthenticated) {
//     return next("/")
//   }
//   return next()
// })

export default router
