<template>
  <div>
    <div v-if="showError">
      <input class="alert-state" id="alert-4" type="checkbox">
      <div class="alert alert-danger dismissible error-msg">
        {{ error }}
        <label class="btn-close" v-on:click="emptyError" for="alert-4">X</label>
      </div>
    </div>
    <div v-if="showSuccess">
      <input class="alert-state" id="alert-5" type="checkbox">
      <div class="alert alert-success dismissible success-msg">
        {{ success }}
        <label class="btn-close" v-on:click="emptySuccess" for="alert-5">X</label>
      </div>
    </div>
    <!-- <div v-if="showError" class="alert alert-danger error-msg">{{ error }}</div> -->
    <Board v-if="logStatus" v-bind:email="email" v-bind:avatar="avatar" :tasks="tasks" :isLoading="isLoading"
    @create-task="createTask" @destroy-item="destroyTask" @modify-item="updateTask" @logout="logout"
    ></Board>
    <LoginPage v-else @post-register="register" @post-login="login" @google-sign="googleSignIn"></LoginPage>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import LoginPage from './components/LoginPage.vue'
import Register from './components/Register.vue'
import axios from 'axios'
import socket from './config/socket'

export default {
  name: 'App',
  data() {
    return {
      email: '',
      avatar: '',
      error: '',
      success: '',
      showError: false,
      logStatus: false,
      isLoading: false,
      showSuccess: false,
      tasks: [
        {
          id: 1,
          title: 'asdf',
          description: 'No description added.',
          category: 'Backlog',
          email: 'fadhil@mail.com'
        },
        {
          id: 2,
          title: 'kentang',
          description: 'No description added.',
          category: 'Ongoing',
          email: 'fadhil@mail.com'
        },
        {
          id: 3,
          title: 'asdfasdsafa',
          description: 'No description added.',
          category: 'Development',
          email: 'sdasfas@mail.com'
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
    fetchData: function() {
      this.isLoading = true
      axios({
        method: 'GET',
        url: `https://salty-mesa-68078.herokuapp.com/tasks`
      }).then(response => {
        this.tasks = response.data
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages)
        // setTimeout(this.emptyError(), 3000)
      }).finally(_ =>{
        this.isLoading = false
      })
    },
    createTask: function(newItem) {
      axios({
        method: 'POST',
        url: `https://salty-mesa-68078.herokuapp.com/tasks`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: newItem.title,
          description: newItem.description,
          category: newItem.category
        }
      }).then(response => {
        // this.fetchData()
        socket.emit('userAction')
        this.displaySuccess(`${response.data.title} created`)
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages)
        // setTimeout(this.emptyError(), 3000)
      })
    },
    destroyTask: function(id) {
      axios({
        method: 'DELETE',
        url: `https://salty-mesa-68078.herokuapp.com/tasks/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        // this.fetchData()
        socket.emit('userAction')
        this.displaySuccess('Item destroyed')
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages)
        // setTimeout(this.emptyError(), 3000)
      })
    },
    updateTask: function(item) {
      axios({
        method: 'PUT',
        url: `https://salty-mesa-68078.herokuapp.com/tasks/${item.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: item.title,
          description: item.description,
          category: item.category
        }
      }).then(response => {
        // this.fetchData()
        socket.emit('userAction')
        this.displaySuccess(`${item.title} changed into ${response.data.title}`)
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages)
        // setTimeout(this.emptyError(), 3000)
      })
    },
    login: function(userData) {
      axios({
        method: 'POST',
        url: `https://salty-mesa-68078.herokuapp.com/login`,
        data: {
          email: userData.email,
          password: userData.password
        }
      }).then(response => {
        this.sendToLocal(response.data)
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages)
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
        this.sendToLocal(response.data)
      }).catch(err => {
        console.log(err.response)
        this.displayError(err.response.data.messages)
        // setTimeout(this.emptyError(), 3000)
      })
    },
    googleSignIn: function (gToken) {
      console.log(gToken)
      axios({
        method: 'POST',
        url: `https://salty-mesa-68078.herokuapp.com/googleSignIn`,
        headers: {
          token: gToken.token
        }
      }).then(response => {
        console.log('google signed-in')
        this.sendToLocal(response.data)
      }).catch(err => {
        console.log(err.response)
      })
    },
    logout: function() {
      localStorage.clear()
      this.logStatus = false
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    },
    sendToLocal(data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)
      localStorage.setItem('avatar', data.avatar)
      this.email = data.email
      this.avatar = data.avatar
      this.logStatus = true
      this.fetchData()
    },
    displayError: function(messages) {
      this.error = messages.join(', ')
      console.log('masuk display-error')
      this.showError = true
    },
    displaySuccess: function(message) {
      this.success = message
      console.log('masuk display-success')
      this.showSuccess = true
    },
    emptyError: function() {
      console.log('harusnya di sini berhenti.')
      this.error = ''
      this.showError = false
    },
    emptySuccess: function() {
      console.log('harusnya di sini berhenti.')
      this.success = ''
      this.showSuccess = false
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.logStatus = true
      this.email = localStorage.getItem('email')
      this.avatar = localStorage.getItem('avatar')
      this.fetchData()
      console.log('Logged')
      // this.socket.open()
      // this.getTasks()
    }
  },
  mounted () {
    socket.on('timeToFetch', () => {
      console.log('timeToFetch')
      this.fetchData()
    })
  }
};
</script>

<style>
  .success-msg{
    position: fixed;
    bottom: 0;
    z-index: 30;
  }
</style>

