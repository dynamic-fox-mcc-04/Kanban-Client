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
          alltask:[],
          type:''
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
       Vue.toasted.register('my_app_error',
            (payload) => {
                return payload.message;
            },{duration:1500,theme:'bubble' ,type:'error'}
        )

        Vue.toasted.register('my_app_success',
            (payload) => {
                return payload.message;
            },{duration:1500,theme:'bubble' ,type:'success'}
        )

        Vue.toasted.register('my_app_info',
            (payload) => {
                return payload.message;
            },{duration:1500,theme:'bubble' ,type:'info'}
        )
    
        
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
                 Vue.toasted.global.my_app_info({
                    message : 'Someone Update the Task'
                });
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