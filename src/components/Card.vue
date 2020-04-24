<template>
<div>
    <div v-if="isLoading" class="loading">
        <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_jIuMBG.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
        </lottie-player>
    </div>
     <div v-if="isLoad" class="loading">
        <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_FRN4R4.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
        </lottie-player>
    </div>
  <div class="content">
    <div class="card-list" v-for="category in categories" :key="category.id">
        <div v-if="!category.editable" class="card-title"><h3><b>{{ category.name }}</b></h3></div>
            <form v-else @submit.prevent="updateCategory(category.id)">
                <input type="text" v-model="data.name" > 
                <button type="submit"  class="btn orange">save</button> <button @click="category.editable=false" class="btn grey">X</button> 
            </form>
                <div class="card-content-box" v-for="task in tasks" :key="task.id"> 
                        <div class="card-content" v-if="task.CategoryId == category.id"> 
                                    <ul>
                                    <li>
                                        <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                                        <ul class="dropdown">
                                            <li><a @click.prevent ="toggleEdit(task)" href="#"><i class="far fa-edit"></i> Edit Task</a></li>
                                            <li><a  @click.prevent="deleteTask(task.id)" href="#"><i class="far fa-trash-alt"></i>Delete Task</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            <div>
                            <div v-if="!task.editable">
                                <p  style="font-size:16px" >{{ task.title }}</p>
                                <div class="move"  v-if="task.statusMove"> 
                                    <select  v-model="selected" style="display: block;">
                                        <option selected value=""></option>
                                        <option v-for="cat in categories" :key="cat.id" :value="cat.id"> {{ cat.name }}</option>
                                    </select>
                                    <button @click="updateTask(task.id, task)"> Move <i class="fas fa-arrow-right"></i></button>
                                </div>
                                <div v-else>
                                    <button @click="toggleMove(task)"> Move <i class="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <div v-else>
                                    <form @submit.prevent="updateTaskTitle(task.id, category.id)">
                                    <input v-model="data.title" >
                                    <button type="submit" class="btn orange"> Save </button> 
                                    <button type="reset" class="btn grey" @click.prevent="toggleEdit(task)">X</button>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>

        <div v-if="!category.statusOpen">
            <div  class="card-btn" >
                <button @click="toggleTask(category)">+  add task</button>  
                <button @click="category.editable=true"   id=edit> <i class="far fa-edit"></i> </button>
                <button @click="deleteCategory(category.id)" id="delete"><i class="far fa-trash-alt"></i></button>
                
            </div>
                
        </div>
        <div v-else-if="category.statusOpen"> 
            <form  @submit.prevent="addTask(category.id)">
                <input  placeholder="Enter Task here" v-model="data.title" >
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

export default {
    name: 'Card',
    data () {
        return {
            data : {
                name : '',
                title : '',
            },
            tasks : [],
            categories : [],
            isVisiblity : false,
            selected : '',
            isLoading : true,
            isLoad: false
        }
    },
    methods: {
         updateCategory(categoryId){
             this.isLoad = true
             axios({
                method:'PUT',
                // url : 'https://kanban-ids.herokuapp.com/category/' + categoryId,
                url : 'http://localhost:3000/category/' + categoryId,
                data : {
                    name : this.data.name
                },
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(result => {
                this.getCategory()
                this.getTasks()
                this.clearForm()
            })
            .catch(err => {
                console.log(err.response.data);
            })

        },

        deleteCategory(categoryId){
            this.isLoad = true
             axios({
                method:'DELETE',
                // url : 'https://kanban-ids.herokuapp.com/category/' + categoryId,
                url : 'http://localhost:3000/category/' + categoryId,
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(result => {
                this.getCategory()
                this.getTasks()
                this.clearForm()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },


        deleteTask(taskId) {
             this.isLoad = true
             axios({
                method:'DELETE',
                // url : 'https://kanban-ids.herokuapp.com/tasks/' + taskId,
                url : 'http://localhost:3000/tasks/' + taskId,
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(result => {
                this.getCategory()
                this.getTasks()
                this.clearForm()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        
        
        },



        updateTaskTitle(taskId, categoryId){
              this.isLoad = true
             if ( this.data.title ){
                axios({
                    method:'PUT',
                    // url : 'https://kanban-ids.herokuapp.com/tasks/' + taskId,
                    url : 'http://localhost:3000/tasks/' + taskId,
                    data : {
                        title : this.data.title,
                        CategoryId : categoryId
                    },
                    headers : {
                        access_token : localStorage.access_token
                    }
                })
                .then(result => {
                    this.getCategory()
                    this.getTasks()
                    this.clearForm()
                })
                .catch(err => {
                    console.log(err.response.data);
                })
                
            }
        },

        updateTask(taskId, idx){
           this.toggleMove(idx)
           this.isLoad = true
           if (this.selected){
                axios({
                    method:'PATCH',
                    // url : 'https://kanban-ids.herokuapp.com/tasks/' + taskId,
                    url : 'http://localhost:3000/tasks/' + taskId,
                    data : {
                        CategoryId : this.selected
                    },
                    headers : {
                        access_token : localStorage.access_token
                    }
                })
                .then(result => {
                    this.getCategory()
                    this.getTasks()
                    this.clearForm()
                })
                .catch(err => {
                    console.log(err);
                })
            }
           


        },
        addCategory(){
            this.isLoad = true
            axios({
                method:'POST',
                // url : 'https://kanban-ids.herokuapp.com/category',
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
            if ( this.data.title) {
                axios({
                    method:'POST',
                    // url :'https://kanban-ids.herokuapp.com/tasks',
                    url : 'http://localhost:3000/tasks',
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

            }
        },

        // logout(){
        //     localStorage.clear();
        //     this.$emit('loginStatus', false)
        // },

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
       
       toggleMove( task ){
            if ( task.statusMove ){
                 task.statusMove = false
           } else {
                task.statusMove = true
           }
       },
        toggleEdit( task ){
            if ( task.editable ){
                 task.editable = false
           } else {
                task.editable = true
           }
       },

       getCategory() {
           axios({
               method:'GET',
            //    url : 'https://kanban-ids.herokuapp.com/category',
               url : 'http://localhost:3000/category',
               headers : {
                   access_token : localStorage.access_token
               }
           })
           .then(result => {
               
               result.data.categories.forEach(el => {
                   el.statusOpen = false
                   el.editable = false
               });
               
               this.categories = result.data.categories
           })
           .catch(err => {
               console.log(err.response.data);
           })
           .finally(() => {
               this.isLoading = false
               this.isLoad = false
           })
       },

       getTasks(){
           axios({
               method:'GET',
            //    url : 'https://kanban-ids.herokuapp.com/tasks',
               url : 'http://localhost:3000/tasks',
               headers : {
                   access_token : localStorage.access_token
               }
           })
           .then(result => {
               
               result.data.tasks.forEach(el => {
                   el.statusMove = false;
                   el.editable = false;
               });
               
               this.tasks = result.data.tasks
           })
           .catch(err => {
           })
            .finally(() => {
              this.isLoading = false
              this.isLoad = false
           })
       },

       clearForm() {
           this.data.name = ''
           this.data.title = ''
           this.selected = ''
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