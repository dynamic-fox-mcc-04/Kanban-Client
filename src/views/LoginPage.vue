<template>
  <div v-show="!token1" id="pg-login">
    <!-- REGISTER FORM - BOOTSTRAP -->
    <div id="pg-form-register">
      <b-form inline id="form-register" @submit.prevent="register()">
        <label class="sr-only" for="inline-form-input-email">Email</label>
        <b-input
          v-model="reg_email"
          id="inline-form-input-email"
          required
          type="email"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="janedoe@mail.com"
        ></b-input>

        <label class="sr-only" for="inline-form-input-password">Password</label>
        <b-input
          v-model="reg_password"
          id="inline-form-input-password"
          required
          type="password"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Your Password"
        ></b-input>

        <b-button variant="primary">REGISTER</b-button>
      </b-form>
    </div>

    <!-- LOGIN FORM -->
    <form id="form-login" @submit.prevent="login()">
      Email:
      <input type="email" required v-model="login_email" />
      <br /><br>
      Password:
      <input type="password" required v-model="login_password" />
      <br /><br>
      <b-button type="submit" variant="primary">LOGIN</b-button>
      <b-button type="reset" variant="danger">RESET</b-button>
    </form>

    <!-- GOOGLE LOGIN -->
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >Sign in with Google</g-signin-button>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      reg_email: "",
      reg_password: "",
      login_email: "",
      login_password: "",
      googleSignInParams: {
        client_id:
          "690202558342-irf6sfd6vm9th2g4otl26jd55r004efg.apps.googleusercontent.com"
      }
    };
  },
  props: ["token1"],
  methods: {
    register() {
      const email = this.reg_email;
      const password = this.reg_password;
      const params = {
        email: email,
        password: password
      };

      this.$emit("register", params);
    },

    login() {
      const email = this.login_email;
      const password = this.login_password;
      const params = {
        email: email,
        password: password
      };

      this.$emit("login", params);
    },

    onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      this.$emit("onSignInSuccess", id_token);
    },

    onSignInError(error) {
      console.log("OH NOES", error);
    }
  }
};
</script>

<style>
#pg-form-register {
  background-color: brown;
  color: cornsilk;
  margin: 1vh;
  padding: 1vh;
}

#form-login {
  margin: 1vh;
  padding: 1vh;
}
</style>