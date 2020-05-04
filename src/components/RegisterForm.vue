<template>
    <div>
        
        <lottie-player v-if="isSuccess" src="https://assets8.lottiefiles.com/packages/lf20_OcSwPS.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" autoplay ></lottie-player>
        <div v-if="isError" class="msg msg-error  z-depth-1"> 
            <li v-for="error in errors" :key="error.id">
                {{  error.message }}
            </li>
            
            </div>
          <div class="register-container">
            <div class="register-form">
                <div class="left">
                    <div class="title">
                        <h2>Register</h2>
                    </div>
                    <form @submit.prevent="register"> 
                        <label for="email"></label>
                        <input type="email" id="email" placeholder="Email" v-model="data.email" required><br><br>
                        <input type="password" id="password" placeholder="Password" v-model="data.password" required><br><br>
                        <button class="btn waves-effect waves-light" type="submit" name="action" color="primary">Sign Up</button>
                        <p>Already have an account ? <a href="" @click.prevent="isLogin"> Login </a></p>
                    </form>
                </div>
                <div class="right">
                    <h1>"papan mlebu"</h1>
                </div>
            </div>  
            </div>      
</template>

<script>

import axios from 'axios'

export default {
    name : "RegisterForm",
     data () {
         return {
             data : {
                 email : '',
                 password : '',
             },
              isSuccess : false,
              isError : false,
              errors : [] 
         }
     },
    methods : {
        isLogin(){
            this.$emit('Status', true)
           
        },
        register(){
            axios({
                method : 'POST',
                url : 'https://kanban-ids.herokuapp.com/register',
                data : {
                    email : this.data.email,
                    password : this.data.password
                }
            })
            .then(result => {
                setTimeout(() => {
                    this.isSuccess = false
                }, 2400)
                
                this.isSuccess = true
                this.clearForm();
            })
            .catch(err => {
               
                this.isError = true
                this.errors = err.response.data.errors
                
            })
        }, 
        clearForm(){
            this.data.email = '',
            this.data.password = ''
        }
    }

}
</script>
<style>
</style>

