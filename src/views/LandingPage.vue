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
                <input v-model="name" type="text" class="text-input" />
              </div>
              <div>
                <label>Email</label>
                <input v-model="email" type="text" class="text-input" />
              </div>
              <div>
                <label>Password</label>
                <input v-model="password" type="password" class="text-input" />
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
                <input v-model="email" type="text" class="text-input" />
              </div>
              <div>
                <label>Password</label>
                <input v-model="password" type="password" class="text-input" />
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
            <a class="secondary-btn">
              <i class="fab fa-google" style="margin-right: 10px;"></i>Sign-in
            </a>
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
      password: ""
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
        method: 'POST',
        url: 'http://localhost:3000/signup',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          localStorage.setItem('token', data.token)
          this.$emit('changeCurrentPage', 'dashboard')
          this.$emit('changeStatus', true)
        })
        .catch(err => {
          console.log(err);
        });
    },
    signin: function() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          localStorage.setItem('token', data.token)
          this.$emit('changeCurrentPage', 'dashboard')
          this.$emit('changeStatus', true)
        })
        .catch(err => {
          console.log(err);
        });
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