<template>
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
					<div class="text-center p-t-20">
						<a class="txt1" href="#">
							Forgot Password?
						</a>
					</div>
				</form>
	</div>
</template>

<script>
import axios from '../axios'
export default {
	name:"LoginForm",
	data(){
		return{
			username:'',
			password:''
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
				this.$emit('succeslogin')
			})
			.catch(err=>{
				console.log(err);
				
			})
		}
	}
}
</script>

<style>

</style>