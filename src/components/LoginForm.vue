<template>
<div>
    <div v-if="isError" class="msg msg-error  z-depth-1"> 
        <li v-for="error in errors" :key="error.id">
            {{  error.message }}
        </li>
        
        </div>
        <div class="login-container" >
                <div class="login-form">
                    <div class="left">
                        <div class="title">
                            <h2>Login</h2>
                        </div>
                        <form @submit.prevent="login">
                            <label for="email"></label>
                            <input type="email" id="email" placeholder="Email" v-model="data.email" required><br><br>
                            <input type="password" id="password" placeholder="Password" v-model="data.password" required><br><br>
                            <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
                            <p>don't have account ? <a href="" @click.prevent="isLogin"> Register </a></p>
                        </form>
                    </div>
                    <div class="right">
                        <h1>"papan mlebu"</h1>
                    </div>
                </div>        
            </div>
    </div>

</template>

<script>

import axios from 'axios'

export default {
    name : "LoginForm",

    data () {
        return {
            data : {
                email : '',
                password : '',
            },
            isError : false,
            errors : []
        }
    },
    methods : {
        isLogin(){
            this.$emit('Status', false) 
        },

        login(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/login',
                data : {
                    email : this.data.email,
                    password : this.data.password
                }
            })
            .then(result => {
                
                this.isError = false
                localStorage.setItem('access_token', result.data.access_token)
                this.$emit('loginStatus', true)
                clearForm();
               
            })
            .catch(err => {

                if ( err.response){
                    this.isError = true
                    this.errors = err.response.data.errors  
                } 
            })
        },

        clearForm(){
            this.data.email = '',
            this.data.password = ''
        },
        
    }

}
</script>

<style>



</style>