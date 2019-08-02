<template>
  <b-container>
    <b-form @submit.prevent="loginAction">
      <b-form-group>
        <b-form-input type="email" v-model="form.email"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="form.password"></b-form-input>
      </b-form-group>
      <b-button type="submit" block variant="primary">로그인</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { validationMixin } from "vuelidate"
import {
  required,
  email,
  minLength
} from "vuelidate/lib/validators"

export default {
  mixins: [validationMixin],
  data(){
    return {
      form: {
        email: null,
        password: null,
      }
    }
  },
  validations: {
    form: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    async loginAction(){
      this.$v.form.$touch()
      if( this.$v.form.$anyError ){
        return
      }

      try{
        const {email, password} = this.form
        const payload = {
          query: `
            mutation {
              login(email: "${email}", password: "${password}"){
                token,
                user{
                  id,
                  name,
                  email
                }
              }
            }
          `
        }
        let {login} = await this.$store.dispatch('login', payload)
        if(login.token){
          this.$router.push('/')
        }
      }catch(e){
        throw e
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>