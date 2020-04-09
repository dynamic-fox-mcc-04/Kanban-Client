<template>
  <div id="Body">
      <vue-progress-bar></vue-progress-bar>
      <navbar :isLogin='isLogin' :isProject="isProject" :Projects='Projects' v-on:SelectProject="SelectProject" v-on:Logout="Logout" v-on:AddFriend="AddFriend" v-on:DeleteFriend="DeleteFriend" :Members="Members" v-on:AddProject="AddProject"></navbar>
      <landing v-if="!isLogin"></landing> 
      <login v-on:Login="Login" v-on:GoogleLogin="GoogleLogin"></login>
      <register v-on:Register="Register"></register>
      <createtask v-on:CreateTask="CreateTask"></createtask>
      <div id="KanbanBoard" v-if="isProject">
      <outerboard :Category="Category" v-for="(Category,index) in Categories" :key="index" :Tasks="Datas" v-on:Update="Update" v-on:Delete="Delete"> </outerboard>
      </div>
  </div>
</template>

<script>
import io from './src/components/socket'
import axios from 'axios'
import navbar from './src/components/navbar'
import login from './src/components/login'
import outerboard from './src/components/outerboard'
import register from './src/components/register'
import createtask from './src/components/createtask'
import landing from './src/components/landingpage'
export default {
    name: "App",
    data() {
        return {
            isConnected: false,
            isProject: false,
            Datas: [],
            isLogin: false,
            Projects: [],
            CurrentProject: '',
            Members: [],
            Categories: ['Backlog', 'Product', 'Development', 'Done']
        }
    },
    methods: {
        connected() {
            this.isConnected = true
        },
        Logout() {
            this.isProject = false
            this.isLogin = false
            this.CurrentProject = ''
            localStorage.removeItem('access_token')
            localStorage.removeItem('Email')
        },
        Register(value) {
            console.log(value)
            this.$Progress.start()
            axios({
                url: 'http://localhost:3000/user/register',
                method: 'POST',
                data: {
                    Email: value.Email,
                    Password: value.Password
                }
            })
            .then(result => {
                this.$Progress.finish()
                this.$toasted.show('Register Success')
                this.$bvModal.hide('RegisterModal')
                this.$bvModal.show('LoginModal')
            }).
            catch(err => {
                console.log(err)
                this.$toasted.show('Register Failed')
            })
        },
        Login(value) {
            this.$Progress.start()
            axios({
                url: 'http://localhost:3000/user/login',
                method: 'POST',
                data: {
                    Email: value.Email,
                    Password: value.Password
                }
            })
                .then(result => {
                    this.$Progress.finish()
                    this.$toasted.show('Login Success!!')
                    localStorage.setItem('access_token', result.data.Access_Token)
                    localStorage.setItem('Email', result.data.Email)
                    this.$bvModal.hide('LoginModal')
                    this.isLogin = true
                    this.FetchProject()
                })
                .catch(err => {
                    // this.$Progress.finish()
                    console.log(err)
                })
        },
        FetchProject(value) {
            axios({
                url: 'http://localhost:3000/project',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(result => {
                    this.Projects = result.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        SelectProject(value) {
            this.CurrentProject = value.ProjectId
           axios({
                url: 'http://localhost:3000/project/task',
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    ProjectId: value.ProjectId
                }
            })
                .then(result => {
                    this.isProject = true
                    this.Datas = result.data
                    this.FetchFriend()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        Update(value) {
            this.$Progress.start()
            axios({
                url: `http://localhost:3000/project/task/${value.id}`,
                method: "PATCH",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    Title: value.Title,
                    Description: value.Description,
                    Category: value.Category,
                    Projectid: this.CurrentProject
                }
            })
                .then(result => {
                    value.ProjectId = this.CurrentProject
                    this.$Progress.finish()
                    this.$$toasted.show('Update Success!')
                    this.SelectProject(value)
                })
                .catch(err => {
                    value.ProjectId = this.CurrentProject
                    this.$Progress.finish()
                    this.$toasted.show('Update Failed')
                    this.SelectProject(value)
                })
        },
        FetchFriend() {
            axios({
                url: 'http://localhost:3000/project/getfriend',
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    ProjectId: this.CurrentProject
                }
            })
                .then(result => {
                    this.Members = result.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        AddFriend(value) {
            if(value.Email == '') {
                this.$toasted.show('PLEASE FILL THE EMAIL')
            }
            else{
                this.$Progress.start()
                axios({
                    url: 'http://localhost:3000/project/friend',
                    method: 'POST',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        Email: value.Email,
                        ProjectId: this.CurrentProject
                    }
                })
                    .then(result => {
                        this.$Progress.finish()
                        this.$toasted.show('Add Friend Success!!')
                        this.FetchFriend()
                    })
                    .catch(err => {
                        this.$Progress.finish()
                        this.$toasted.show('Failed to Add Friend')
                    })
            }
        },
        DeleteFriend(value) {  
            if(value.Email == '') {
                this.$toasted.show('PLEASE FILL THE EMAIL')
            }
            else{
                this.$Progress.start()
                axios({
                    url: 'http://localhost:3000/project/friend',
                    method: 'DELETE',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        Email: value.Email,
                        ProjectId: this.CurrentProject
                    }
                })  
                    .then(result => {
                        this.$Progress.finish()
                        this.$toasted.show('Delete Friend Success')
                        this.FetchFriend()
                    })
                    .catch(err => {
                        this.$Progress.finish()
                        this.$toasted.show('Failed to Delete Friend')
                    })
            }
        },
        AddProject(value) {
            if(value.Title == '') {
                this.$toasted.show('PLEASE FILL THE PROJECT')
            }
            else{
                this.$Progress.start()
                axios({
                    url: "http://localhost:3000/project/",
                    method: 'POST',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        Title: value.Title
                    }
                })
                    .then(result => {
                        this.$Progress.finish()
                        this.$toasted.show('Add Project Success!')
                        this.FetchProject()
                    })
                    .catch(err => {
                        this.$Progress.finish()
                        this.$toasted.show('Add Project Failed!')
                        this.FetchProject()
                    })
            }
        },
        CreateTask(value) {
            this.$Progress.start()
            axios({
                url: 'http://localhost:3000/project/addtask',
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    Title: value.Title,
                    Description: value.Description,
                    Category: value.Category,
                    ProjectId: this.CurrentProject
                }
            })
                .then(result => {
                    value.ProjectId = this.CurrentProject
                    this.$Progress.finish()
                    this.$toasted.show('Create Task Success!!')
                    this.$bvModal.hide('CreateTask')
                    this.SelectProject(value)
                })
                .catch(err => {
                    this.$Progress.finish()
                    this.$toasted.show('Create Task Failed!!')

                })
        },
        Delete(value) {
            axios({
                url: `http://localhost:3000/project/task/${value.id}`,
                method: "DELETE",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(result => {
                this.$toasted.show('Delete Success!!')
                value.ProjectId = this.CurrentProject
                this.SelectProject(value)
            })
            .catch(err => {
                this.$toasted.show('Delete Failed!!')
            })
        },
        GoogleLogin(value){
            this.$toasted.show('Login Success!!')
            localStorage.setItem('access_token', value.Access_Token)
            localStorage.setItem('Email', value.Email)
            this.$bvModal.hide('LoginModal')
            this.isLogin = true
            this.FetchProject()
        }

    },
    computed: {
        
    },
    components: {
        navbar,
        login,
        outerboard,
        register,
        createtask,
        landing
    },
    created() {
        console.log(io)
        io.on('success',(msg) => {
            this.connected()
            this.$toasted.show('MASUK EUYYYYY')
        })
        io.emit('join', {
            ProjectId: 1
        })
        io.on('rooms', function(rooms) {
            console.log(rooms)
        })
        if(localStorage.getItem('access_token')) {
            this.isLogin = true
            this.FetchProject()
        }
    },
    watch: {
        CurrentProject() {
            this.CurrentProject
        }
    }


}
</script>

<style>
#Body{
    background-color: powderblue;
    height: 102vh;
}
#KanbanBoard {
    width: 100vw;
    position: absolute;
    overflow: scroll;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;}
</style>