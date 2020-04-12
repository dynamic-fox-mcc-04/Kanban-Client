<template>
  <div id="container">
      <nav class="navbar navbar-dark bg-primary d-flex" style="background-color: #e3f2fd;">     
                      
            <h4>Welcome To G-Kanban {{activeuser}}</h4>
            <button type="button" class="btn btn-primary fa fa-sign-out" @click.prevent="signout"></button>     
          
    </nav>
    <div class="container-login100" style="background-image: url('/images/bg-01.jpg');">

        <div id="container-header">
          <div><h5>Back Log</h5></div>
          <div><h5>Todo</h5></div>
          <div><h5>Done</h5></div>
          <div><h5>Completed</h5></div>
        </div>
      
      <card-container :dataAllTaskFromHome="dataAllTaskFromApp" @refreshData="refreshData" v-if="!formadd" @addbutton="addbutton"></card-container>
      <add-task v-else @cancelbutton="cancelbutton" @refreshData="refreshData"></add-task>
    </div>
  </div>

</template>

<script>
import CardContainer from '../components/cardContainer'
import AddTask from '../components/AddTask'
import axios from 'axios'
export default {
    name:"HomePage",
    components:{
        CardContainer,
        AddTask
        
    },
    data(){
      return{
        formadd : false,
        activeuser:localStorage.username
      }
    },
    props:['dataAllTaskFromApp'],
    methods:{
      refreshData(){
        this.formadd = false
        this.$emit('refreshData')
      },
      addbutton(){        
        this.formadd = true
      },
      cancelbutton(){
         this.formadd = false
      },
      signout(){
        this.$emit('logout')
      }
    }
    

}
</script>

<style>

</style>