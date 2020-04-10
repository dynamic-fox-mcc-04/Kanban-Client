<template>
  <div>
    <!-- <div v-if="showError" class="alert alert-danger error-msg">{{ error }}</div> -->
    <!-- <Board v-if="logStatus"></Board> -->
    <LoginPage @post-register="register" @post-login="login"></LoginPage>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import LoginPage from './components/LoginPage.vue'
import Register from './components/Register.vue'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      error: '',
      showError: false,
      logStatus: false,
      tasks: [
        {
          id: 1,
          title: 'asdf',
          description: 'No description added.',
          category: 'Backlog'
        },
        {
          id: 2,
          title: 'asdf',
          description: 'No description added.',
          category: 'Ongoing'
        },
        {
          id: 3,
          title: 'asdf',
          description: 'No description added.',
          category: 'Development'
        },
      ]
    };
  },
  components: {
    Board: Board,
    LoginPage: LoginPage,
    Register: Register
  },
  methods: {
    login: function(userData) {
      axios({
        method: 'POST',
        url: `https://salty-mesa-68078.herokuapp.com/login`,
        data: {
          email: userData.email,
          password: userData.password
        }
      }).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('avatar', response.data.avatar)
        this.logStatus = true
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages, setTimeout(this.emptyError(), 3000))
        // setTimeout(this.emptyError(), 3000)
      })
    },
    register: function(userData) {
      axios({
        method: 'POST',
        url: `https://salty-mesa-68078.herokuapp.com/register`,
        data: {
          email: userData.email,
          password: userData.password
        }
      }).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('avatar', response.data.avatar)
        this.logStatus = true
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages, setTimeout(this.emptyError(), 3000))
        // setTimeout(this.emptyError(), 3000)
      })
    },
    displayError: function(messages, callback) {
      this.error = messages.join(', ')
      this.showError = true
    },
    emptyError: function() {
      console.log('harusnya di sini berhenti.')
      this.error = ''
      this.showError = false
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.logStatus = true
      // this.getTasks()
    }
  }
};
</script>

<style>
</style>

