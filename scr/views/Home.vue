<template>
  <div id="container">
      <div class="container-login100" style="background-image: url('/images/bg-01.jpg');">
        <div id="container-header">
        <div><h5>Back Log</h5></div>
        <div><h5>Todo</h5></div>
        <div><h5>Done</h5></div>
        <div><h5>Completed</h5></div>
    </div>
    <card-container :dataAllTaskFromHome="dataAllTaskFromApp" @refreshData="refreshData"></card-container>
      </div>
  </div>

</template>

<script>
import CardContainer from '../components/cardContainer'
import axios from 'axios'
export default {
    name:"HomePage",
    components:{
        CardContainer
    },
    props:['dataAllTaskFromApp'],
    methods:{
      refreshData(){
        this.$emit('refreshData')
      }
    }
    

}
</script>

<style>

</style>