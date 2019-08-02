import axios from "axios"


const instance = axios.create({
  baseURL: "http://localhost:4000/graphql",
  // headers: {
  //   authorization: store.getters.TOKEN
  // }
})
export default instance