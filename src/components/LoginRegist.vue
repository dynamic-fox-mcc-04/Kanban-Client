<template>
  <div id="login-register">
        <div class="d-flex justify-content-center align-items-center">
            
            <div id="container" class="p-5" style="width: 390px; height: 600px;  background-color: #263238; border-radius: 15px;">

              <div id="login-form">
                <div class="d-flex flex-column align-items-center">
                  <h2 class="text-warning mb-5 mt-2" style="text-align: center;">{{logVal.titleLog}}</h2>
                  <form>
                    <div class="form-group mt-5">
                      <label for="email-login" style="color: white;">Email:</label>
                      <input class="form-control" id="email-login" placeholder="Enter email" v-model="form.email" required>
                    </div>
                    <div class="form-group mb-5">
                      <label for="pwd-login" style="color: white;">Password:</label>
                      <input type="password" class="form-control" id="pwd-login" placeholder="Enter password" v-model="form.password" name="pwd-login" required>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <button @click.prevent="regLog" class="form-control btn btn-warning mb-4" type="submit">Submit</button>
                        <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                      </g-signin-button>

                    </div>
                  </form>
                  <div class="align-self-center mt-5">
                    <p style="color: white;">{{logVal.fooMsg}} <a @click.prevent="chgLR" href="#">{{logVal.hrefLog}}</a></p>
                  </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import socket from '../config'

export default {
    name: "LoginRegist",
    props: ['message', 'isLogin', 'isInLogin', 'logVal'],
    data() {
        return {
          baseUrl: 'http://localhost:3000',
          form: {
            email: '',
            password: ''
          },
          googleSignInParams: {
            client_id: '404650277802-fe2k0coeuccm9qnh21keml2fnv43ch6h.apps.googleusercontent.com'
          }
        }
    },
    methods: {
      onSignInSuccess (googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users
        const profile = googleUser.getBasicProfile() // etc etc
        const token = googleUser.getAuthResponse().id_token;
        console.log(token)
        axios({
          method: 'POST',
          url: this.baseUrl + '/users/googleSign',
          data: {
              token:token
          }
        })
        .then((result) => {
          console.log(result)
          localStorage.setItem('access_token', result.access_token)
          this.clearInput()
          this.authLog()
        }).catch((err) => {
          console.log(err)
          this.clearInput()
          this.authLog()
        });
      },
      onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      },
      authLog() {
        if (localStorage.access_token) {
              this.$emit('login', true)
          } else {
              this.$emit('login', false)
          }
      },
      register() {
        axios({
          method: 'POST',
          url: this.baseUrl + '/users/register',
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        .then((result) => {
          console.log(result.data)
          localStorage.setItem('access_token', result.data.token)
          this.authLog()
          this.clearInput()
        }).catch((err) => {
          console.log(err)
          this.clearInput()
        });
      },
      clearInput() {
          this.form.email = ''
          this.form.password = ''
      },
      login() {
        axios({
          method: 'POST',
          url: this.baseUrl + '/users/login',
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        .then((result) => {
          localStorage.setItem('access_token', result.data.token)
          this.$swal("Successfully Loggen In!", `Welcome Back ${result.data.email}`, "success");
          
        this.$emit('add')
          this.clearInput()
          this.authLog()
        }).catch((err) => {
          console.log(err)
          this.$swal.fire({
            icon: 'error',
            title: 'Invalid Email/Password',
            text: 'Something went wrong!',
          })
          this.clearInput()
          this.authLog()
        });
        },
        toLogin() {
            this.$emit('chgInLoginVal', true)
        },
        toRegister() {
            this.$emit('chgInLoginVal', false)
        },
        chgLR() {
          if (this.isInLogin) {
             this.toRegister()
          } else {
            this.toLogin()
          }
        },
        regLog() {
          if (this.isInLogin) {
             this.login()
          } else {
            this.register()
          }
        }
        
        
    }

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
}
</style>