<template>
    <!-- list activity -->
    <div class="activity-board">
        <div class="list-btn my-2 mx-5">
            <h4>Project : {{project_name}}</h4>
        </div>
        <!-- add person -->
        <div class="row mx-5">
            <form @submit.prevent="addPerson()">
                <div class="col py-2">
                    <input
                    v-model="email"
                    type="text"
                    class="form-control"
                    id="activity-title"
                    placeholder="Enter Person Email"
                    required
                    />
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-info">Add Person</button>
                </div>
            </form>
        </div>
        <!-- end add person -->

        <!-- ini task -->
        <!--  -->
        <div id="activity-data" class="d-flex py-2 mx-5" >
            <!-- card parent -->
            <div class="col-md-3" v-for="category in Tasks" :key="category.id">
                <div class="card bg-light">
                    <h5 class="parent-card-title card-header d-flex justify-content-between">{{category.task_name}}</h5>
                    <div class="d-flex flex-column align-items-center card-parent p-2">
                       <!-- subtask here -->
                       <sub-task v-for="subtask in category.SubTasks" 
                        :key="subtask.id"
                        :subtaskId="subtask.id"
                        :title="subtask.title"
                        :description="subtask.description"
                        :user="subtask.User" 
                        :categoryId="category.id"
                        :projectId="projectId"
                        @reFetchTask="$emit('reFetchTask')"
                       ></sub-task>
                       <!-- subtask here end-->
                    </div>
                    <div class="d-flex flex-column nav-btn">
                        <div class="row my-2">
                            <div class="col-md-12 d-flex justify-content-center">
                                <div>
                                    <a href="#" type=""  class="col-md-12" id="show-modal" @click="showModal = true,modalName = category.id">Add Activity</a>
                                    <modal-add v-if="showModal && modalName == category.id" @close="showModal = false" @reFetchTask="$emit('reFetchTask')" :projectId="projectId" :categgoryId="category.id"></modal-add>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end card parent -->
        </div>
        <!--ini end task -->
    </div>
</template>

<script>
let baseUrl = "http://localhost:3000";
import subTask from '../components/subtask'
import modalAdd from '../components/modalAddSubtask'
export default {
    name: "task",
    data(){
        return {
            showModal: false,
            modalName: '',
            email : ''
        }
    },
    components:{
        "sub-task" : subTask,
        "modal-add" : modalAdd
    },
    props:['Tasks', 'project_name', 'projectId'],
    methods:{
        addPerson(){
            axios({
                method: "POST",
                url: baseUrl + '/member',
                headers:{
                    access_token : localStorage.access_token
                },
                data:{
                    email : this.email,
                    ProjectId : this.projectId
                }
            })
                .then((result)=>{
                    swal('Success Add person with email '+ this.email)
                })
                .catch((err)=>{
                    swal(err.response.data.message);
                })
        }
    }
    // life cycle
};
</script>
<style scoped>
    .nav-btn{
        background-color: rgba(0,0,0,.03)!important;
        border-top: 1px solid rgba(0,0,0,.125);
    }

    .nav-btn a {
        color: black!important;
        text-decoration: none!important;
        font-size: 0.75em!important;
    }

    
</style>