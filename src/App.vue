<template>
    <div>
        <div v-if = "!isLogin"><auth-form @isLoginStatus="isLoginStatus" ></auth-form></div>
        <div v-else>
            <nav-bar @logout="logout" @openBoard="changeScreen"></nav-bar>
            <board v-if="isCurrentPage === 'board' " :Projects = "Projects" :OrgProjects = "ProjectOrg" @reFetchProject="fetchProject(), fetchProjectOrg()" @openTask="changeScreen"></board>
            <task v-else-if="isCurrentPage === 'task' " :projectId="tmpProjectId" @reFetchTask="fetchTask" :Tasks="Task" :project_name="tmpProjectName"></task>
            <!-- <pageEmpty v-else></pageEmpty> -->
        </div>
    </div>
</template>

<script>
let baseUrl = "http://localhost:3000";
import axios from "axios";
import AuthForm from './views/Auth'
import Nav from './components/navBar'
import Board from './views/Board'
import Task from './views/Task'

export default {
    name: "App",
    components:{
        "auth-form" : AuthForm,
        "nav-bar": Nav,
        "board" : Board,
        "task": Task
    },
    data() {
        return {
            Projects: [],
            ProjectOrg: [],
            Task: [],
            SubTask: [],
            tmpProjectName: '',
            tmpProjectId : 0,
            isLogin: false,
            isCurrentPage: "board",
        };
    },
  methods: {

    isLoginStatus(){
        this.isLogin = true
        this.fetchProject()
        this. fetchProjectOrg()
    },

    register() {
       
    },

    logout() {
        localStorage.clear()
        this.isCurrentPage = "board"
        this.isLogin = false
        this.clear()
    },

    fetchProject() {
        axios({
            method: "GET",
            url: baseUrl + "/project",
            headers:{
                access_token : localStorage.access_token
            }
        })
            .then(result => {
                this.Projects = result.data;
            })
            .catch(err => {
                console.log(err);
            });
    },

    fetchProjectOrg(){
        axios({
            method: "GET",
            url: baseUrl + "/project/organisation",
            headers:{
                access_token : localStorage.access_token
            }
        })
            .then(result => {
                // alert(result.data)
                this.ProjectOrg = result.data;
            })
            .catch(err => {
                console.log(err);
            });
    },

    changeScreen(id, title){
        if(this.isCurrentPage === "board"){
            this.Task =[]
            this.isCurrentPage = "task"
            this.tmpProjectId = id
            this.fetchTask(title)
        }else{
            this.isCurrentPage = "board"
            this.tmpProjectId = 0
            this.fetchProject()
            this.fetchProjectOrg()
        }
    },

    fetchTask(title) {
        axios({
          methods: "GET",
          url: baseUrl + "/task?id_project=" + this.tmpProjectId,
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(result => {
            this.tmpProjectName = title
            this.Task = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    clear(){
        this.Task = [],
        this.SubTask = [],
        this.Projects = []
        this.ProjectOrg = []
    }
  },

  // lifecycle
  cereated() {
    if(localStorage.access_token)
        {
            this.isLogin = true
            this.fetchProject()
            this.fetchProjectOrg()
        }
  }
};
</script>

<style>
</style>