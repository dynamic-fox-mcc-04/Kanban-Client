<template>
    <div>
        <div style="display:flex; justify-content:flex-end;">
        <button class="logoutButton" @click="$emit('logout')">logout</button>
        </div>
        <div class="main-page">
            <div class="body-header">
                <h1>Kanban Board</h1>
            </div>
            <div class="addButton">
                <button 
                @click="addTodo"
                >Add Todo</button>
            </div>
            <div class="container-body">
                <card
                v-for="(category) in categories"
                :key="category.id"
                :task="task.filter(el => el.category == category.name)"
                :category="category.name"
                :categoryId="category.id"
                @moveToTheLeft="moveToTheLeft"
                @moveToTheRight="moveToTheRight"
                @hapus="hapus">
                </card>
            </div>
                <add-todo 
                v-if="isAdd"
                @createTodo="createTodo" 
                @close="close"></add-todo>
            </div>
        
            
    </div>
</template>

<script>
import Card from '../components/card'
import AddTodo from '../components/addTodo'
export default {
    name: "MainPage",
    components: {
        Card,
        AddTodo
    },
    data() {
        return {
            categories:[
                {
                id:1,
                name:'backlog'
                }, {
                    id:2,
                    name:'todo'
                }, {
                    id:3,
                    name:'done'
                }, {
                    id:4,
                    name:'completed'
                } 
            ],
            isAdd: false
        }
    },
    methods:{
        addTodo() {
            if(localStorage.access_token) {
                this.isAdd = true
            }
        },
        close() {
            this.isAdd= false   
        },
        createTodo(formValue) {
            this.close()
            this.$emit('createTodo',formValue)
        },
        hapus(id) {
            this.$emit('hapus',id)
        },
        moveToTheLeft(data){
            this.$emit('moveToTheLeft',data)
        },
        moveToTheRight(data){
            this.$emit('moveToTheRight',data)
        }
    },
    props:['task']
}
</script>

<style>

</style>