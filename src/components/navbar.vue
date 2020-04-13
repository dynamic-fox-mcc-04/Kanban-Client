<template>
  <div >
    <nav class="navbar">
    <span class="navbar-brand mb-0 h1">Kanban-Board</span>
    <div id='Project' center>
        <div id="Dropdown">
            <b-dropdown text="Project" v-if="isLogin" size="sm">
                <b-dropdown-item :value="Project.Project.id" v-model="SelectProject" v-for="Project in Projects" :key="Project.Project.id" @click.prevent='SelectProject = Project.ProjectId'>{{Project.Project.Title}}</b-dropdown-item>
            </b-dropdown>
            <b-dropdown text="Members" v-if="isProject" size="sm">
            <b-dropdown-item :value="Member.User.Email" v-model="Email" v-for="Member in Members" :key="Member.User.id" @click.Prevent="SelectEmail" >{{Member.User.Email}}</b-dropdown-item>
            </b-dropdown>
        </div>
        <div v-if="isProject">
            <b-form-input v-model="Email" placeholder="Enter Email Here" size="sm" ></b-form-input>
            <b-button variant='secondary' @click="AddFriend">Add Friend</b-button>
            <b-button variant='secondary' @click="DeleteFriend">Delete Friend</b-button>
        </div>
        <div v-if="isLogin">
            <b-form-input v-model="Project" placeholder="Enter Project Here" size="sm" ></b-form-input>
            <b-button variant='secondary' @click="AddProject">Add Project</b-button>
            <b-button variant='secondary' @click="$bvModal.show('CreateTask')" v-if="isProject">Create Task</b-button>
        </div>
    </div>

    <div id='User'>
        <b-dropdown text="User" right > 
            <b-dropdown-item v-if="!isLogin" @click="$bvModal.show('RegisterModal')">Register</b-dropdown-item>
            <b-dropdown-item v-if="!isLogin" @click="$bvModal.show('LoginModal')">Login</b-dropdown-item>
            <b-dropdown-item v-if="isLogin" @click.prevent="Logout">Logout</b-dropdown-item>
        </b-dropdown>
    </div>
    </nav>


</div>
</template>

<script>
export default {
    props: ['isLogin', 'Projects', 'Members', 'isProject'],
    data() {
        return {
            SelectProject: '',
            Email: '',
            Project: '',
            Required: false
        }
    },
    methods: {
        Login() {
            this.$emit('Login')
        },
        Register() {
            this.$emit('Register')
        },
        ProjectSelect() {
            this.$emit('SelectProject', {
                ProjectId: this.SelectProject
            })
        },
        SelectEmail() {
            
        },
        AddFriend() {
            let payload = {
                Email: this.Email
            }
            this.$emit('AddFriend', payload)
            this.Email = ''
        },
        DeleteFriend() {
            let payload = {
                Email: this.Email
            }
            this.$emit('DeleteFriend', payload)
            this.Email = ''
        },
        AddProject() {
            this.$emit('AddProject', {
                Title: this.Project
            })
        },
        Logout() {
            this.$emit('Logout')
            this.SelectProject = ''
        }
    },
    watch: {
        SelectProject() {
            if(this.SelectProject == '') {
                this.SelectProject
            }
            else {
                this.ProjectSelect()
            }
        },
        isProject() {
            this.isProject
        }
    }

}
</script>


<style>
.navbar{
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font: bold;
    font-style: oblique;
    background-color: #6c757d;
    color: palegreen;
    
}
.navbar{
    width: 100vw;
}
#Project{
    display: flex;
    flex-direction: row;
}
#Dropdown {
    display: flex;
    flex-direction: column;
}
</style>