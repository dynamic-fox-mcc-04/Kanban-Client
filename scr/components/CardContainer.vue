<template>
  <div id="container-item" >
        <div id="container-backlog" class="overflow-auto scrollbar scrollbar-primary">
        <button type="button" class="btn btn-primary fa fa-plus m-1" @click.prevent="addbutton">  </button>
           <!-- <div class="item"> -->
             <task-card             
             v-for="task in  StatusCheck('Backlog')"
             :key="task.id"
             :content="task"             
              @refreshData='refreshData'></task-card>            
            <!-- </div> -->
           
        </div>
        <div id="container-product" class="overflow-auto scrollbar scrollbar-primary" >
             <task-card             
             v-for="task in  StatusCheck('Todo')"
             :key="task.id"
             :content="task"             
              @refreshData='refreshData'></task-card>  
           
        </div>
        <div id="container-development" class="overflow-auto scrollbar scrollbar-primary">
             <task-card             
             v-for="task in  StatusCheck('Done')"
             :key="task.id"
             :content="task"             
              @refreshData='refreshData'></task-card>  
        </div>
        <div id="container-done" class="overflow-auto scrollbar scrollbar-primary">
             <task-card             
             v-for="task in  StatusCheck('Completed')"
             :key="task.id"
             :content="task"             
              @refreshData='refreshData'></task-card>  
        </div>
    </div>
</template>

<script>
import TaskCard from "./TaskCard"
export default {
  name:"CardContainer",
  components:{
    TaskCard
  },
  props:['dataAllTaskFromHome'],
  data(){
    return {
      backlog:[],
      title:[],
      description:[],
      status:[],
      createdAt:[],
      UpdateAt:[],
      
    }
  },
  methods:{
    StatusCheck(status){      
     let datafilter=[]
      
     if(this.dataAllTaskFromHome.data != undefined){
       datafilter= this.dataAllTaskFromHome.data.filter(function (item) { return item.status == status });
     }
     console.log(datafilter);
     
      return datafilter
    },
    refreshData(){
      console.log('refresh');
      
      this.$emit('refreshData')
    },
    addbutton(){
      
      this.$emit('addbutton')
    }
  }
  
}
</script>

<style>

</style>