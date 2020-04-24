<template>
 		
			<div class="wrap-contact3">
				<form class="contact3-form validate-form">
					<span class="contact3-form-title">
						Add Task
					</span>
					

					<div class="wrap-input3 validate-input" data-validate="Title is required">
						<input class="input3" type="text" name="title" placeholder="Title" v-model="payload.title">
						<span class="focus-input3"></span>
					</div>

					
					<div class="wrap-input3 validate-input" data-validate = "Description is required">
						<textarea class="input3" name="description" placeholder="Description" v-model="payload.description"></textarea>
						<span class="focus-input3"></span>
					</div>

					<div class="container-contact3-form-btn container-login100-form-btn">
						<button class="contact3-form-btn" @click.prevent="AddingTask">
							Submit
						</button>
                        <button class="contact3-form-btn" @click.prevent="cancelbutton">
							Cancel
						</button>
					</div>
				</form>
			</div>
</template>

<script>

import axios from '../axios'
import { log } from 'util'
export default {
    name:"AddTask",
    data(){
        return{
           payload:{
               title: '',
               description:''
           }
        }
    },
    methods:{
        cancelbutton(){
            this.$emit('cancelbutton')
        },
        AddingTask(){
            axios({
                method:"POST",
                 url:"/task",
                 data:{
                   title: this.payload.title,
                   description : this.payload.description
                },
                headers:{
                    token:localStorage.token
                }
            })
            .then(result=>{        
                io.connect(config.serverUrl).emit('msg');       
				this.$emit('refreshData')
				Vue.toasted.global.my_app_success({
                    message : 'Add Task Succes'
                });
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>