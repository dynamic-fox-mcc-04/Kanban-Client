<template>
  <div>
      <login-form v-if="isLogin"  @Status="changeStatus" @loginStatus="loginSuccess"></login-form>
      <register-form v-else-if="!isLogin" @Status="changeStatus"></register-form>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
    name : "Home",
    components : {
        LoginForm,
        RegisterForm
    },  
    data(){
        return {
            isLogin : false
        }
    },
    methods : {
        changeStatus(e){
            this.isLogin = e
        },
        loginSuccess(e){
           console.log('home', e);
            this.$emit('loginStatus', e)
        }
    },
       
}
</script>
    
<style scoped>
    
</style>