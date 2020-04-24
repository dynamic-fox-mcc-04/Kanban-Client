<template>
    <div>
    <!-- <div v-if="isLoading" class="loading">
        <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_jIuMBG.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
        </lottie-player>
    </div> -->
   <div class="container">
       <Navbar @loginStatus="loginStatus"></Navbar>
       <Card></Card> 
    </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'

export default {
    name : 'Dashboard',
    components: {
      Navbar,
      Card
    },
    data() {
        return {
          isLoading : true
        }
    },
    methods : {
        loginStatus (e) {
            this.$emit('loginStatus', e)
        },
        loadingStatus (e) {
           this.isLoading = e
        }
    }
}
</script>

<style>


</style>