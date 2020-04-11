<template>
  <div>
    <register-page 
    v-if="isRegister && !isLogin" 
    @login="login"
    @loginback="loginBack">
    </register-page>
    <main-page
    v-else-if="isLogin"
    :task="task"
    @createTodo="create"
    @logout="logout"
    @moveToTheLeft="moveToTheLeft"
    @moveToTheRight="moveToTheRight"
    @hapus="hapus">
    </main-page>
    <login-page
    @login= "login"
    @register= "register"
    v-else  >
    </login-page>
  </div>
</template>

<script>
import axios from 'axios'
import MainPage from './views/mainPage'
import LoginPage from './views/login'
import RegisterPage from './views/register'

export default {
    name:"App",
    components:{
        MainPage,
        LoginPage,
        RegisterPage
    },
    data() {
        return {
            isLogin: false,
            isRegister:false,
            task:[],
            add: {
                title:'',
                category:''
            }
        }
    },
    methods: {
        fetchTask () {
            axios({
                method:"GET",
                url: "https://ancient-mesa-33338.herokuapp.com/task",
                headers:{
                    access_token: localStorage.access_token
                } 
            })
                .then(({data}) => {
                    // console.log(data)
                    this.task= data.Task
                })
                .catch(err => {
                    console.log(err)
                })
        },
        register() {
            this.isRegister = true
        },
        logout() {
            localStorage.clear()
            this.isLogin= false
        },
        login() {
            if(localStorage.access_token) {
                this.isLogin = true
            }
        },
        loginBack() {
            this.isRegister=false
        },
        create(formValue) {
            // console.log(formValue.title)
            axios({
                method: 'POST',
                url: 'https://ancient-mesa-33338.herokuapp.com/task',
                headers:{
                    access_token: localStorage.access_token
                },
                data: {
                    title: formValue.title,
                    category: formValue.category
                }
            })
            .then(({data})=> {
                this.fetchTask()
            })
            .catch(err => {
                let error= err.response.data.errors[0].message
                console.log(err.response.data.errors[0].message)
                this.$toast.error(error,{})
            })
        },
        hapus(id) {
            // console.log(id)
            axios({
                method: 'DELETE',
                url:'https://ancient-mesa-33338.herokuapp.com/task/'+id,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(({data})=> {
                this.fetchTask()
            })
            .catch(err => {
                console.log(err.response.data.errors)
                let error= err.response.data.errors ||err.response.data[0].message 
                this.$toast.error(error,{})
            })
        },
        moveToTheLeft(data){
            let moveCategory=''
            if(data.category == 'todo') {
                moveCategory= 'backlog'
            } else if(data.category == 'done') {
                moveCategory= 'todo'
            } else if(data.category == 'completed') {
                moveCategory = 'done'
            }
            axios({
                method:'patch',
                url:'https://ancient-mesa-33338.herokuapp.com/task/'+data.id,
                headers:{
                    access_token: localStorage.access_token
                },
                data: {
                    category: moveCategory
                }
            })
            .then(({data})=> {
                this.fetchTask()
            })
            .catch(err => {
                console.log(err.response.data.errors)
                let error= err.response.data.errors ||err.response.data[0].message 
                this.$toast.error(error,{})
            })
        },
        moveToTheRight(data){
            let moveCategory= ''
            if(data.category == 'backlog') {
                moveCategory= 'todo'
            } else if(data.category == 'todo') {
                moveCategory= 'done'
            } else if(data.category == 'done') {
                moveCategory= 'completed'
            }
            axios({
                method:'patch',
                url:'https://ancient-mesa-33338.herokuapp.com/task/'+data.id,
                headers:{
                    access_token: localStorage.access_token
                },
                data: {
                    category: moveCategory
                }
            })
            .then(({data})=> {
                this.fetchTask()
            })
            .catch(err => {
                console.log(err.response.data.errors)
                let error= err.response.data.errors ||err.response.data[0].message 
                this.$toast.error(error,{})
            })
        }
    },
    created() {
        this.fetchTask()
        this.login()
    }
}
</script>

<style scoped>

</style>