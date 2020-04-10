<template>
  <div id="landingPage" v-if="currentPage === 'landingPage'">
    <!-- SIGNUP -->
    <div id="signup-page" v-if="!isSignup">
      <div class="wrapper">
        <div class="left">
          <div id="signup">
            <div class="logo">
              <img src="../image/kl.png" alt="Sluralpright" />
            </div>
            <form @submit.prevent="signup">
              <div>
                <label>Name</label>
                <input v-model="name" type="text" class="text-input" required />
              </div>
              <div>
                <label>Email</label>
                <input v-model="email" type="text" class="text-input" required />
              </div>
              <div>
                <label>Password</label>
                <input v-model="password" type="password" class="text-input" required />
              </div>
              <button type="submit" class="primary-btn">Sign Up</button>
            </form>
            <div class="links">
              <p>
                Already have account?
                <a @click="toSignin()">Get In!</a>
              </p>
            </div>
          </div>
          <footer class="main-footer">
            <p>Copyright &copy; 2020, KanBan-Te All Rights Reserved</p>
            <div>
              <a>terms of use</a> |
              <a>Privacy Policy</a>
            </div>
          </footer>
        </div>
        <div class="right">
          <div class="showcase">
            <div class="showcase-content">
              <h1 class="showcase-text">
                Let's manage the future
                <strong>together</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SIGNIN -->
    <div id="signin-page" v-else>
      <div class="wrapper">
        <div class="left">
          <div id="signin">
            <div class="logo">
              <img src="../image/kl.png" alt="Sluralpright" />
            </div>
            <form @submit.prevent="signin">
              <div>
                <label>Email</label>
                <input v-model="email" type="text" class="text-input" required />
              </div>
              <div>
                <label>Password</label>
                <input v-model="password" type="password" class="text-input" required />
              </div>
              <button type="submit" class="primary-btn">Sign In</button>
            </form>
            <div class="links">
              <p>
                Need account?
                <a @click="toSignup()">Join Us</a>
              </p>
            </div>
            <div class="or">
              <hr class="bar" />
              <span>OR</span>
              <hr class="bar" />
            </div>
            <g-signin-button
              class="secondary-btn"
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError"
            ><i class="fab fa-google"></i>Sign in</g-signin-button>
          </div>
          <footer class="main-footer">
            <p>Copyright &copy; 2020, KanBan-Te All Rights Reserved</p>
            <div>
              <a>terms of use</a> |
              <a>Privacy Policy</a>
            </div>
          </footer>
        </div>
        <div class="right">
          <div class="showcase">
            <div class="showcase-content">
              <h1 class="showcase-text">
                Let's manage the future
                <strong>together</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "landingPage",
  props: ["currentPage"],
  data() {
    return {
      isSignup: true,
      name: "",
      email: "",
      password: "",
      googleSignInParams: {
        client_id:
          "745681398322-els88qbv8pknp3akt474oc143rqn57pd.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    toSignup: function() {
      this.isSignup = false;
    },
    toSignin: function() {
      this.isSignup = true;
    },
    signup: function() {
      axios({
        method: "POST",
        url: "https://radiant-hollows-48189.herokuapp.com/signup",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.token);
          this.$toasted.show('KanBan-Te Kudasai!', {
            duration: 3000
          })
          this.$emit("changeCurrentPage", "dashboard");
          this.$emit("changeStatus", true);
          this.name = "";
          this.email = "";
          this.password = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    signin: function() {
      axios({
        method: "POST",
        url: "https://radiant-hollows-48189.herokuapp.com/signin",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.token);
          this.$toasted.show('Glad to see you!', {
            duration: 3000
          })
          this.$emit("changeCurrentPage", "dashboard");
          this.$emit("changeStatus", true);
          this.email = "";
          this.password = "";
        })
        .catch(err => {
          this.$toasted.show(err.response.data.message, {
            duration: 3000
          })
          console.log(err);
        });
    },
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "https://radiant-hollows-48189.herokuapp.com/gsignin",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.token);
          this.$toasted.show('Glad to see you!', {
            duration: 3000
          })
          this.$emit("changeCurrentPage", "dashboard");
          this.$emit("changeStatus", true);
          this.email = "";
          this.password = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSignInError(error) {
      console.log(error);
    }
  },
  watch: {
    isSignup(val) {
      this.isSignup = val;
    }
  }
};
</script>

<style>
</style>