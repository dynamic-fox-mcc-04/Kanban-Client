<template>
<div>
  <div id="logo"> 
    <h1><i> KANBAN </i></h1>
  </div> 
  <section class="stark-login">
  <form v-on:submit.prevent="loginCheck()">	
    <div id="fade-box">
        <input type="email" v-model="email" id="email" placeholder="email" required>
          <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Log In</button> 
          </div>
      </form>
        <p class="control">
          You Don't Have any Account yet?
            <a v-on:click="registerBtn()" class="tombol">
              Register
              Now!
            </a>
        </p>
        <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
        >Sign in with Google</g-signin-button>
      <div class="hexagons">
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <span>&#x2B22;</span>
        <br>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <br>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span> 
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            
            <br>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <span>&#x2B22;</span>
              <br>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
                <span>&#x2B22;</span>
              </div>      
            </section> 
            
            <div id="circle1">
              <div id="inner-cirlce1">
                <h2> </h2>
              </div>
            </div>

            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
    <div class="loading-container" v-if="isLoadingLogin">
      <div class="loading-screen">
        <lottie-player
          src="https://assets10.lottiefiles.com/packages/lf20_bwNmtU.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      googleSignInParams: {
        client_id:
          "875560547981-qh8ognlsdq7qdj02bh8ncv29jfkgkvi0.apps.googleusercontent.com"
      }
    };
  },
  props: {
    password2: String
  },
  methods: {
    registerBtn() {
      this.$emit("methodButton");
    },
    loginCheck() {
      this.$emit("loginSubmit", this.email, this.password);
    },
    loginGoogle() {
      this.$emit("loginGoogle");
    },
    onSignInSuccess(googleUser) {
      
      const profile = googleUser.getBasicProfile(); // etc etc
      let token = googleUser.getAuthResponse().id_token;
      let name = profile.getName();
      this.isLoadingLogin = true;
      axios({
        url: "https://kanbanhacktiv8.herokuapp.com/googleSignIn",
        data: {
          name
        },
        method: "post",
        headers: {
          token: token
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data);
          this.loginGoogle();
          this.$toasted.success("You have successfully login");
        })
        .catch(err => {})
        .finally(() => {
          this.isLoadingLogin = false;
        });
    },
    onSignInError(err) {
      this.$toasted.error(err.error);
    }
  }
};
</script>

<style>
  @import '../../login-regist.css';
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #00a4a2;
  color: #fff;
  box-shadow: 0 3px 0 #00fffc;
  cursor: pointer;
}
</style>