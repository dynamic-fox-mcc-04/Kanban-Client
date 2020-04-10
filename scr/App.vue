<template>  
<div id="IndexPage">
<front-page @showhome="loginsucces" v-if="!islogin"></front-page>
<home-page :dataAllTaskFromApp="alltask" @refreshData="fetchAllTask" v-else @logout="logout"></home-page>
</div>

</template>

<script>
import axios from 'axios'
import FrontPage from './views/Front'
import HomePage from './views/Home'

export default {
    name:"G-kanban",
    components:{
        FrontPage,
        HomePage
    },
    data(){
        return{          
          islogin:false,
          alltask:[]
        }
    },
    methods:{
        
        loginsucces(){
        console.log('login suces');
            this.islogin = true
            this.fetchAllTask();
        },
        fetchAllTask(){
            console.log("pagillllll");
            
            axios({
                method:"GET",
                url:"http://localhost:3000/task",
                 headers:{
                    token:localStorage.token
                 }
            })
            .then(result=>{
                
                this.alltask = result.data
            })
            .catch(err=>{
                console.log(err);                
            })
        },
        logout(){
            this.islogin = false
            localStorage.clear()
        }
    },
    created(){
        if(localStorage.token){
            this.islogin = true
            this.fetchAllTask();
        }else {
            this.islogin = false
        }
    },
    updated(){
        // this.fetchAllTask();
    }
};

</script>

<style scoped>

</style>