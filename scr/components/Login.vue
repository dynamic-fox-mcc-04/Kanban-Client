<template>
<div>
	<g-signin-button
						:params="googleSignInParams"
						@success="onSignInSuccess"
						@error="onSignInError">
						Sign in with Google
	</g-signin-button>
  <div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-logo">
						<i class="zmdi zmdi-landscape"></i>
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input class="input100" type="text" name="username" placeholder="Username" v-model="username">
						
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="pass" placeholder="Password" v-model="password">
						
					</div>

					<div class="contact100-form-checkbox">
						<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
						<label class="label-checkbox100" for="ckb1">
							Remember me
						</label>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" @click.prevent="login">
							Login
						</button>
					</div>
					<div class="text-center p-t-20" >
						<button  @click.prevent ="register">
							sign in
						</button>
						
					</div>
				</form>
	</div>
	</div>
</template>

<script>
import GSignInButton from 'vue-google-signin-button'
import axios from '../axios'
export default {
	name:"LoginForm",
	data(){
		return{
			username:'',
			password:'',
			googleSignInParams: {
        		client_id: '636705423948-jk7m1fvtdv0go84aorh7g79agb78lvk1.apps.googleusercontent.com'
     		 }

		}
	},
	methods:{
		register(){
			this.$emit('registerclick');
		},
		login(){
			axios({
				method:"POST",
				url:"/user/login",
				data:{
					username:this.username,
					password:this.password
				}
			})
			.then(result=>{		
				localStorage.setItem('token',result.data.token)
				localStorage.setItem('username',this.username)
				this.$emit('succeslogin')
			})
			.catch(err=>{
				Vue.toasted.global.my_app_error({
                    message : 'Username/Password not Found'                   
                });
				
			})
		},
		onSignInSuccess (googleUser) {
		// `googleUser` is the GoogleUser object that represents the just-signed-in user.
		// See https://developers.google.com/identity/sign-in/web/reference#users
		const profile = googleUser.getBasicProfile() // etc etc
		console.log(profile);
		axios({
				method:"POST",
				url:"/user/gmail",
				data:{
					username:profile.yu
				}
			})
			.then(result=>{		
				localStorage.setItem('token',result.data.token)
				localStorage.setItem('username',profile.yu)
				this.$emit('succeslogin')
			})
			.catch(err=>{
				Vue.toasted.global.my_app_error({
                    message : 'Username/Password not Found'                   
                });
				
			})
		},
		onSignInError (error) {
		// `error` contains any error occurred.
		console.log('OH NOES', error)
		}
	},
}
</script>

<style>

</style>