<template>
  <div class="limiter">
	<div class="container-login100" style="background-image: url('/images/bg-01.jpg');">
		<register-form @cancelSignIn="loginform" v-if="isregister"></register-form>
		<login-form @registerclick="registerform" v-else></login-form>
	</div>
  </div>
</template>

<script>
import LoginForm from '../components/Login'
import RegisterForm from '../components/Register'
// import { log } from 'util'
export default {
	name:"FrontPage",
	components:{
		LoginForm, 
		RegisterForm
	},
	data() {
		return {
			isregister:false
		}
		
	},
	methods:{
		registerform(){					
			this.isregister =true
		},
		loginform(){					
			this.isregister =false
		}
	}
}
</script>

<style>

</style>