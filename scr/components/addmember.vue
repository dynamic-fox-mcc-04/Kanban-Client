<template>  
        <div class=" input-group border-0 m-0 p-1">
            <select class="custom-select" id="select" v-model="selected">
                <option v-for ="usertask in datamember" :key="usertask.id" :value="[usertask.id,usertask.idtaskchoosen]">{{usertask.username}}</option>    
            </select>
            <div class="input-group-append border-0 m-0">
                <button class="btn btn-outline-secondary" type="button" @click.prevent="addmember()" >Choose</button>
                <button class="btn btn-outline-secondary" type="button" @click.prevent="$emit('close')" >Close</button>
            </div>
        </div>
               
</template>				
<script>
import axios from '../axios'
import config from '../config'
export default {
    name:"AddMember",
    props:['datamember'],
    data(){
        return{
            selected:''
            }

    },
    methods:{
        addmember(){
            
            console.log(this.selected);
            
            axios({
                method:"POST",
                url:"/task/"+this.selected[0]+"/"+this.selected[1],
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                io.connect(config.serverUrl).emit('msg');
                 Vue.toasted.global.my_app_success({
                    message : 'Succes Add Member '
                });
                                
            })
            .catch(err=>{
                console.log(err);
                
                 Vue.toasted.global.my_app_error({
                    message : 'Not Authorized to Access'
                });                
                
            })
        }
    }
}
</script>

<style>

</style>