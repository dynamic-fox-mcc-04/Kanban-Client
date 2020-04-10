<template>
  <div class="loginPage">
    <div class="loginCard">
        <div class="loginCardLeft">

        </div>
        <div class="loginCardRight">
            <div class="loginFormHead">
                <h1>Signin</h1>
            </div>
            <div class="loginForm">
                <form v-on:submit.prevent="login">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Insert email" name="email" id="email" style="margin: 3% 0;" v-model="email">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Insert password" name="password" id="password" style="margin: 3% 0;" v-model="password">
                    <button type="submit" style="margin: 3% 0;" >Login</button>
                    <button type="submit" style="margin: 3% 0;" v-on:click="register">Register</button>
                <g-signin-button class="g-signin-button"
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError"><i class="fab fa-google"></i>
                    Sign in with Google
                </g-signin-button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>        
import axios from 'axios'
import RegisterPage from '../views/register'
export default {
    name:"LoginPage",
    components:{
        RegisterPage
    },
    data() {
        return {
            email:'',
            password: '',
            googleSignInParams: {
                clientId: '810068078388-9ls5svqutvajena5c4r3cerbeak9tgmd.apps.googleusercontent.com'
            }
        }
    },
    methods:{
        login () {
            axios({
                method:"POST",
                url: "http://localhost:3000/user/signin",
                data:{
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                console.log('masuk')
                localStorage.setItem('access_token',data.access_token)
                this.$emit('login')
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSignInSuccess (googleUser) {
            const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;
            axios({
                method:"POST",
                url: "http://localhost:3000/user/googlesign",
                headers:{
                    token
                }
            })
            .then(({data}) => {
                console.log('masuk')
                localStorage.setItem('access_token',data.access_token)
                this.$emit('login')
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSignInError (error) {
        // `error` contains any error occurred.
        console.log(error)
        },
        register: function() {
            this.$emit('register')
        }
    }
    }

</script>

<style>

</style>