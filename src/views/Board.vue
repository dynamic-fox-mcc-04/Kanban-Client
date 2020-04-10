<template>
    <!-- board -->
    <div class="board-data">
        <div class="mx-5 my-2">
            <h5>Add Boards</h5>
            <div class="row">
                <form @submit.prevent="addproject()">
                    <div class="col py-2">
                        <input v-model="project_name" type="text" class="form-control" placeholder="Enter Board Name" required/>
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-info">Add Board</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- User board -->
        <div class="mx-5">
            <h4>User Board</h4>
            <div class="row p-2">
                <user-board v-for="project in Projects"
                :key = "project.id"
                :title = "project.project_name"
                :id = "project.id"
                @reFetchProject = "$emit('reFetchProject')"
                @openTask ="openTask"
                ></user-board>
            </div>
        </div>
        <!-- User board end -->

        <!-- board organisation -->
        <div class="mx-5">
            <h4>Organisation Board</h4>
            <div class="row p-2">
                <!-- board card -->
                <organisation-board v-for="orgProject in OrgProjects" 
                :key="orgProject.id"
                :id ="orgProject.id"
                :title ="orgProject.project_name"
                @openTask ="openTask"
                ></organisation-board>
                <!-- board card end -->
            </div>
        </div>
        <!-- end board organisation -->
    </div>
    <!-- board end -->
</template>

<script>
let baseUrl = "http://localhost:3000";
import userBoard from '../components/userBoard'
import orgBoard from '../components/orgBoard'
export default {
    name: 'board',
    data(){
        return {
            project_name : ''
        }
    },
    components:{
        "user-board" : userBoard,
        "organisation-board" : orgBoard
    },
    props:['Projects', 'OrgProjects'],
    methods:{
        addproject(){
            axios({
                method: "POST",
                url: baseUrl + "/project",
                data: {
                    project_name : this.project_name
                },
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then((result)=>{
                    this.$emit('reFetchProject')
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
        },
        openTask(id, title){
            this.$emit('openTask', id, title)
        }
    }
};
</script>

<style>
</style>