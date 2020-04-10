<template>
  <div class="login-register">
    <h2><b>KanChalk!</b></h2>
    <div v-if="!registration" id="login-form">
      <form class="form-group" id="login">
        <p> <b>Login:</b> </p>
        <input type="text" id="email" v-model="email" placeholder="E-mail"><br>
        <input type="password" id="password" v-model="password" placeholder="Password"><br><br>
        <button v-on:click.prevent="login">Login</button>
      </form>
      <div>
        <p>Don't have an account? Register <a class="link" href="" v-on:click.prevent="toRegister">Here.</a></p>
      </div>
    </div>
    <div v-else id="register-form">
      <form class="form-group" id="login">
        <p> <b>Register:</b> </p>
        <input type="text" id="email" v-model="email" placeholder="E-mail"><br>
        <input type="password" id="password" v-model="password" placeholder="Password"><br><br>
        <button v-on:click.prevent="register">Register</button>
      </form>
      <div>
        <p>Or login <a class="link" href="" v-on:click.prevent="toLogin">Here.</a></p>
      </div>
    </div>
    <div><br>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Sign in with Google
      </g-signin-button><br>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
        registration: false,
        googleSignInParams: {
          client_id: "1016326809584-ma8nhm6oq5srehnlmmei2mf8bajg4vgc.apps.googleusercontent.com"
        }
      }
    },
    methods: {
      login: function() {
        this.$emit('post-login', {email: this.email, password: this.password})
      },
      register: function() {
        this.$emit('post-register', {email: this.email, password: this.password})
      },
      toRegister: function() {
        this.registration = true
        this.email = ''
        this.password = ''
      },
      toLogin: function() {
        this.registration = false
        this.email = ''
        this.password = ''
      },
      onSignInSuccess: function(googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users
        const profile = googleUser.getBasicProfile() // etc etc
        console.log(profile, 'ini profile')
        let gtoken = googleUser.getAuthResponse().id_token;
        this.$emit('google-sign', {token: gtoken})
      },
      onSignInError: function(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
      }
    }
}
</script>

<style>
.link {
  color: #3c82f7!important;
}

</style>