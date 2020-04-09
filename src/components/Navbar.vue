<template>
  <!-- <div class="navbar-page"> -->
    <nav class="navbar navbar-light">
      <div class="navbar-brand">
        <img src="../image/kl.png" alt="KanBan-Te" />
        <a>
          <b>anBan-Te</b>
        </a>
      </div>
      <div id="signout-btn">
        <p
          @click="signout"
        >
          <i class="fas fa-sign-out-alt fa-lg"></i> Sign-out
        </p>
      </div>
    </nav>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    signout: function() {
      this.$emit('signout')
    }
  }
}
</script>

<style>

</style>