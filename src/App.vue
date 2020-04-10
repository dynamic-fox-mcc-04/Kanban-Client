<template>
  <div>
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
    <landing
      v-else-if="!isLogin"
      id="landing-page"
      @loginSubmit="loginCheck"
      @regSubmit="registerSubmit"
      @loginGoogle="loginGoogle"
    ></landing>
    <dashboard
      v-else-if="isLogin"
      id="dashboard"
      @logoutBtn="logout()"
      @getTasks="getTasks()"
      :tasks="tasks"
    ></dashboard>
    <div class="loading-container" v-if="isLoading">
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
import Landing from "./views/Landing.vue";
import Dashboard from "./views/Dashboard";

export default {
  name: "App",
  components: {
    Landing,
    Dashboard
  },
  data() {
    return {
      isLoadingLogin: false,
      isLoading: false,
      isLogin: false,
      tasks: []
    };
  },
  methods: {
    loginCheck(email, password) {
      this.isLoadingLogin = true;
      axios({
        method: "post",
        // url: "http://localhost:3000/login",
        url: "https://kanbanhacktiv8.herokuapp.com/login",
        data: {
          email,
          password
        }
      })
        .then(result => {
          console.log(result.data.token)
          localStorage.setItem("token", result.data.token);
          this.isLogin = true;
          this.getTasks();
          this.$toasted.success("You have successfully login");
        })
        .catch(err => {
          let error = err.response.data.errors.message;
          console.log(error)
          this.$toasted.error(error);
        })
        .finally(() => {
          this.isLoadingLogin = false;
        });
    },
    logout() {
      localStorage.clear();
      this.$toasted.success("You have successfully logged out!");
      this.email = '';
      this.password = '';
      this.isLogin = false;
    },
    registerSubmit(data) {
      let { email, password } = data;
      this.isLoadingLogin = true;
      axios({
        method: "post",
        // url: "http://localhost:3000/register",
        url: "https://kanbanhacktiv8.herokuapp.com/register",
        data: {
          email,
          password
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data);
          this.isLogin = true;
          this.$toasted.success("You have successfully registered and logged in");
        })
        .catch(err => {
          let error = err.response.data;
          for (let i = 0; i < error.length; i++) {
            this.$toasted.error(error[i].message);
          }
        })
        .finally(() => {
          this.isLoadingLogin = false;
        });
    },
    getTasks() {
      this.isLoading = true;
      axios({
        method: "get",
        // url: "http://localhost:3000/task",
        url: "https://kanbanhacktiv8.herokuapp.com/task",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(err => {
          let error = err.response.data;
          for (let i = 0; i < error.length; i++) {
            this.$toasted.error(error[i].message);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loginGoogle() {
      this.isLogin = true;
      this.getTasks();
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.getTasks();
    }
  }
};
</script>

<style>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute !important;
  margin: auto;
  top: 35%;
  width: 300px;
  background-color:transparent;
  border-radius: 300px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-screen lottie-player {
  margin: auto;
}
</style>