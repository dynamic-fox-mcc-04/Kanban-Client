<template>
  <div id="dashboard-page" v-if="currentPage === 'dashboard'">
    <Navbar
      @signout="signout"
    ></Navbar>
    <MainPage></MainPage>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import MainPage from '../components/MainPage'

export default {
  name: "dashboard",
  props: ["currentPage"],
  components: {
    Navbar,
    MainPage
  },
  methods: {
    signout: function() {
      this.$emit('signout')
    }
  }
};
</script>

<style>
</style>