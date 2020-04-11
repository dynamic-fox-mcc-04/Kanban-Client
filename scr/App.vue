<template>  
<div id="IndexPage">
<front-page @showhome="loginsucces" v-if="!islogin"></front-page>
<home-page :dataAllTaskFromApp="alltask" @refreshData="fetchAllTask" v-else @logout="logout"></home-page>
</div>

</template>

<script>
import config from './config'
import axios from './axios'
import FrontPage from './views/Front'
import HomePage from './views/Home'
import { Socket } from 'net';
import { log } from 'util';

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
        
            this.islogin = true
            this.fetchAllTask();
        },
        fetchAllTask(){         
            console.log('pakai urlbase');
            
            axios({
                method:"GET",
                url:"/task",
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
         
       
    io.connect(config.serverUrl).on('drserver', ()=> {
            axios({
                method:"GET",
                url:"/task",
                 headers:{
                    token:localStorage.token
                 }
            })
             .then(result=>{
                
                this.alltask = result.data
            })
            });
        if(localStorage.token){
            this.islogin = true
            this.fetchAllTask();
        }else {
            this.islogin = false
        }       
    },
    updated(){
    }
    
};

</script>

<style scoped>

</style>