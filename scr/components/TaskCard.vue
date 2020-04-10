<template>

 <div class="item">
    <div class="card text-white bg-primary mb-1" style="max-width: 18rem;">
        <div class="card-header">{{content.title}}</div>
        <div class="card-body">
            <h5 class="card-title">{{content.createAt}}</h5>
            <p class="card-text">{{content.description}}</p>
        </div>
        <div class="d-flex justify-content-around">

            <button class="card-link text-white" v-if="content.status !='Backlog'" @click.prevent="updatePrev(content.id,content.status)">Previous</button>
            <button class="card-link text-white" @click.prevent="dele(content.id)">Delete</button>
            <button class="card-link text-white" @click.prevent="updateNext(content.id,content.status)">Next</button>
        </div>
    </div>    
        <div class="text-center font-weight-light mb-1 mt-1" :id="id">{{content.id}}</div>
        <div class="d-none" >{{content.status}}</div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
    
    name:"TaskCard",
    props:['content'],
    data(){
        return{
            id :'',
            status:''
        }
    },
    methods:{
        updateNext(id,status){
           axios({
                method:"PUT",
                url:"http://localhost:3000/task/forward/"+status+"/"+id,
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                this.$emit('refreshData')
                console.log(result);
                
            })
            .catch(err=>{
                console.log(err);
                
            })
        },
         updatePrev(id,status){
           axios({
                method:"PUT",
                url:"http://localhost:3000/task/backward/"+status+"/"+id,
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                this.$emit('refreshData')
                console.log(result);
                
            })
            .catch(err=>{
                console.log(err);
                
            })
        },
        dele(id){
            axios({
                method:"DELETE",
                url:"http://localhost:3000/task/"+id,
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                this.$emit('refreshData')
                console.log(result);
                
            })
            .catch(err=>{
                console.log(err);
                
            })
        }
    }
    
}
</script>

<style>

</style>