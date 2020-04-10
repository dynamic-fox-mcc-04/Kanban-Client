<template>
    
   <div class="container">
        <div class="navbar">
            <div class="logo"></div>
            <div class="kanban-title"><h4>Papan mlebu</h4></div>
            <button id = "logout-btn" @click.prevent="logout"> <b>logout</b> </button>
        </div>
        <div class="content">
            <div class="card-list" v-for="category in categories" :key="category.id">
                <div class="card-title"><h3><b>{{ category.name }}</b></h3></div>

                <draggable :id="category.id" v-model="categories" :options="{ group:'tasks'}"  @start ="drag=true" @end ="drag=false" @add ="chooseCategory">
                        <div class="card-content-box" v-for="task in tasks" :key="task.id"> 
                            <!-- <draggable :id="task.id" v-model="tasks" :options="{ group: { name:'tasks'}}" @start ="drag=true" @end ="drag=false" :move="chooseTask"> -->
                                <div class="card-content" v-if="task.CategoryId == category.id"> 
                                    <p style="font-size:13px">{{ task.title }}</p>                           
                                </div>
                            <!-- </draggable> -->
                        </div>
                </draggable>

                <div v-if="!category.statusOpen">
                    <div  class="card-btn" >
                    <button @click="toggleTask(category)">+  add task</button>
                    </div>
                </div>
                <div v-else-if="category.statusOpen"> 
                    <form  @submit.prevent="addTask(category.id)">
                        <input cols="30" rows="10" placeholder="Enter Task here" v-model="data.title" >
                        <button type="submit" class="btn green">Add Task</button> <button type="reset" class="btn grey" @click.prevent="toggleTask(category)">X</button>
                    </form>
                </div>
            </div> 
            
            <div  class="card-list-add">
                    <form v-if="isVisiblity" @submit.prevent="addCategory">
                        <input  v-model="data.name"  type="text" class="add-category" placeholder="Enter Category title . . .">
                        <button type="submit" class="btn green">Add Category</button> <button type="reset" class="btn grey" @click.prevent="toggleModal">X</button>
                    </form>
                <div v-else class="card-btn">
                <button @click="toggleModal">+ add category</button>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
    name : 'Dashboard',
    components:{
        draggable
    },
    data(){
        return {
            data : {
                name : '',
                title : '',
            },
            tasks : [],
            categories : [],
            isVisiblity : false,
            targetCategory : '',
            targetTask : ''
        }
    },
    methods : {

        chooseCategory(event){
            this.targetCategory = event.from.id
        },
        chooseTask(event){
            this.targetTask = event.from.id
        },
        addCategory(){
            axios({
                method:'POST',
                url : 'http://localhost:3000/category',
                data :{
                    name : this.data.name
                },
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(result => {
               this.getCategory()
               this.clearForm()
            })
            .catch(err => {
               console.log(err);
               
            })
        },

        addTask(categoryId){
            axios({
                method:'POST',
                url :'http://localhost:3000/tasks',
                data : {
                    title : this.data.title,
                    CategoryId : categoryId
                },
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(result => {
                this.getTasks()
                this.clearForm()
                
            })
            .catch(err => {
                console.log(err);
                
            })


        },

        logout(){
            localStorage.clear();
            this.$emit('loginStatus', false)
        },
       toggleModal(){
           if ( this.isVisiblity ){
                this.isVisiblity = !this.isVisiblity
           } else {
                this.isVisiblity = true
           }
          
       },
       toggleTask(category){

            if ( category.statusOpen ){
                 category.statusOpen = false
           } else {
                category.statusOpen = true
           }

       },
       getCategory() {
           axios({
               method:'GET',
               url : 'http://localhost:3000/category',
               headers : {
                   access_token : localStorage.access_token
               }
           })
           .then(result => {
               
               result.data.categories.forEach(el => {
                   el.statusOpen = false
               });
               
               this.categories = result.data.categories
               
               
           })
           .then(err => {
               
               
           })
       },

       getTasks(){
           axios({
               method:'GET',
               url : 'http://localhost:3000/tasks',
               headers : {
                   access_token : localStorage.access_token
               }
           })
           .then(result => {
               console.log(result.data);
               
               this.tasks = result.data.tasks
           })
           .catch(err => {
               console.log(err);
               
           })
       },

       clearForm() {
           this.data.name = ''
           this.data.title = ''
       }
    },
    created(){
        this.getCategory()
        this.getTasks()
    }
}
</script>

<style>

</style>