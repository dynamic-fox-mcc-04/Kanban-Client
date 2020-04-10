<template>
    <div class="container-fluid" id="landingpage">
        <div id="auth-btn">
            <button class="authModal" id="loginFront" @click="loginForm">LOGIN</button>
            <button class="authModal" id="registerFront" @click="registerForm">REGISTER</button>
        </div>
        <div class="divLanding">
            <h2>Fox-Kanban</h2>
            <h5>Always step ahead!</h5>
        </div>

        <div id="login-form-container" class="auth-container" v-if="isLoginForm">
            <form action="" id="login-form" class="auth-form" @submit.prevent="login">
                <h3>Welcome to Fox-Kanban!</h3>
                <div class="alert alert-danger" role="alert" v-if="isLoginFalse">
                    Please fill the form correctly
                </div>
                <div class="auth-notifications"></div>
                <div class="ui small input">
                    <input type="text" name="email" id="email-login" class="form-control" placeholder="email..." autocomplete="off" v-model="userLogin.email">
                </div>
                <br>
                <div class="ui small input">
                    <input type="password" name="password" id="password-login" class="form-control" placeholder="password..." v-model="userLogin.password">
                </div>
                <br>
                <div class="buttongroup-horizontal">
                    <button class="ui primary button" id="signin-btn" type="submit">
                                    sign in
                                </button>
                    <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                    </g-signin-button>
                </div>
            </form>
        </div>
        <div id="signup-form-container" class="auth-container" v-else-if="isRegisterForm">
            <form action="" id="signup-form" class="auth-form" @submit.prevent="register">
                <h3>Welcome to Fox-Kanban!</h3>
                <div class="alert alert-danger" role="alert" v-if="isLoginFalse">
                    Please fill the form correctly
                </div>
                <div class="auth-notifications"></div>

                <div class="ui small input">
                    <input type="text" id="email-signup" name="email" placeholder="email..." autocomplete="off" v-model="userRegister.email" class="form-control">
                </div>
                <br>
                <div class="ui small input">
                    <input type="password" id="password-signup" name="password" placeholder="password..." v-model="userRegister.password" class="form-control">
                </div>
                <br>
                <button class="ui primary button" id="signup-btn" type="submit">
                                sign up
                            </button>
            </form>
        </div>
        <div class="divLanding">
            <h5>powered by:</h5>
                <img src="https://beatricedemontbeillard.fr/pics/logo-socket.png" alt="" style="width: 120px">
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Auth",
    data() {
        return {
            userLogin: {
                email: '',
                password: ''
            },
            userRegister: {
                email: '',
                password: ''
            },
            googleSignInParams: {
                client_id: '431692430492-uj5d003m4cijl5fj24deteq8rn0bcet6.apps.googleusercontent.com'
            },
            isLoginFalse: false,
            isRegisterForm: false,
            isLoginForm: false,
        }
    },
    methods: {
        onSignInSuccess (googleUser) {
            // this.$emit('isLoadingEmit', true)
            console.log(`into googleLogin Form`)
            const profile = googleUser.getBasicProfile()
            const token = googleUser.getAuthResponse().id_token ;
            console.log(`token`, token)
            console.log(`profile`, profile)
            axios({
                method: 'post',
                url: `https://nameless-oasis-92283.herokuapp.com/users/googleLogin`,
                data: {
                    token
                }
            })
            .then(result => {
                console.log(`sucsess login google`)
                this.isLoginFalse = false
                localStorage.setItem('token', result.data.token)
                this.$emit('isLoginEmit', true)
                this.$emit('refetchTasks')
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        },
        registerForm() {
            this.isRegisterForm = true
            this.isLoginForm = false
            this.isLoginFalse = false
            
        },
        loginForm() {
            this.isLoginForm = true
            this.isRegisterForm = false
            this.isLoginFalse = false
        },
        register() {
            // this.$emit('isLoadingEmit', true)
            let account = {
                email: this.userRegister.email,
                password: this.userRegister.password
            }
            axios.post(`https://nameless-oasis-92283.herokuapp.com/users/register`, account)
                .then(result => {
                    localStorage.setItem('token', result.data.token)
                    // this.isLogin = true
                    this.isLoginFalse = false
                    this.$emit('isLoginEmit', true)
                    this.userRegister.email = ''
                    this.userRegister.password = ''
                    this.$emit('refetchTasks')
                })
                .catch(err => {
                    this.isLoginFalse = true
                    console.log(err)
                })
                // .finally(()=>{
                //     this.$emit('isLoadingEmit', false)
                // })
        },
        login() {
            // this.$emit('isLoadingEmit', true)
            let account = {
                email: this.userLogin.email,
                password: this.userLogin.password
            }
            axios.post(`https://nameless-oasis-92283.herokuapp.com/users/login`, account)
                .then(result => {
                    localStorage.setItem('token', result.data.token)
                    this.isLoginFalse = false
                    this.$emit('isLoginEmit', true)
                    this.userLogin.email = ''
                    this.userLogin.password = ''
                    this.isRegisterForm = false
                    this.isLoginForm = false
                    this.$emit('refetchTasks')
                })
                .catch(err => {
                    this.isLoginFalse = true
                    console.log(err)
                })
                // .finally(()=>{
                //     this.$emit('isLoadingEmit', false)
                // })
        }
    }
    // created() {
    //     if (localStorage.token) {
    //         this.isLogin = true
    //         this.$emit('refetchTasks')
    //     }
    // }

    
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>