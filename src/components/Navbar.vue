<template>
  <div>
    <div class="navbar">
        <div class="logo"></div>
        <div class="kanban-title"><h4>Papan mlebu</h4></div>
        <button id = "logout-btn" @click.prevent="logout"> <b>logout</b> </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout(){
      localStorage.clear();
      this.$emit('loginStatus', false)
    },
  }
}
</script>

<style>

</style>