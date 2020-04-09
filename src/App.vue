<template>
  <div>
    <LandingPage
      @changeCurrentPage="changeCurrentPage"
      @changeStatus="changeStatus"
      :currentPage="currentPage"
    ></LandingPage>
    <Dashboard
      @signout="signout"
      :currentPage="currentPage"
    ></Dashboard>
  </div>
</template>

<script>
import LandingPage from './views/LandingPage'
import Dashboard from './views/Dashboard'

export default {
  name: 'App',
  components: {
    LandingPage,
    Dashboard
  },
  data() {
    return {
      currentPage: 'landingPage',
      isLogin: false
    }
  },
  methods: {
    changeCurrentPage: function(page) {
      this.currentPage = page
    },

    changeStatus: function(status) {
      this.isLogin = status
    },

    checkLogin: function() {
      let token = localStorage.getItem('token')
      if(token) {
        this.currentPage = 'dashboard'
        this.isLogin = true
      }
      else {
        this.currentPage = 'landingPage'
        this.isLogin = false
      }
    },

    signout: function() {
      localStorage.clear()
      this.currentPage = 'landingPage'
    }
  },
  created() {
    this.checkLogin()
  },
  watch: {
    currentPage(val) {
      this.currentPage = val
    }
  }
}
</script>

<style>

</style>