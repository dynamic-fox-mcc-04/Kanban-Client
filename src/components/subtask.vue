<template>
    <!-- card child -->
    <div id="subtask" class="card my-2" style="">
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">
                {{title}}
                <i class="fas fa-times" style="color:black;cursor:pointer" v-on:click="deleteTask(subtaskId)"></i>
            </h5>
            <p class="lead">{{description}}</p>
            <p class="card-text">
                <small class="text-muted">Created by : {{user.email}}</small>
            </p>
            <div class="row ">
                <div v-if="categoryId != 1" v-on:click.prevent="patchTask(subtaskId, categoryId - 1)" class="button col d-flex justify-content-center">
                    <a>Left</a>
                </div>
                <div v-if="categoryId != 4" v-on:click.prevent="patchTask(subtaskId, categoryId + 1)" class="button col d-flex justify-content-center ">
                    <a>Right</a>
                </div>
            </div>
        </div>
    </div>
    <!-- end card child -->
</template>

<script>
let baseUrl = "http://localhost:3000";
export default {
    name: 'subtask',
    props: ['subtaskId', 'title', 'description', 'user', 'categoryId', 'projectId'],
    data(){
        return {
            
        }
    },
    methods:{
        deleteTask(id){
            // alert(this.subtaskId)
            axios({
                method: 'DELETE',
                url : baseUrl + '/subtask/' + id,
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(result => {
                    this.$emit('reFetchTask')
                })
                .catch(err => {
                    console.log(err.response);
                    swal(err.response.data.message);
                });
        },
        patchTask(id, categoryNew){
            // alert(this.subtaskId)
            axios({
                method: 'PATCH',
                url : baseUrl + '/subtask/' + id,
                data:{
                    category : categoryNew
                },
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(result => {
                    this.$emit('reFetchTask')
                })
                .catch(err => {
                    console.log(err.response);
                    swal(err.response.data.message);
                });
        }
    }
};
</script>

<style scoped>
.button{
    cursor: pointer;
    border: solid 1px black;
    background-color: rgba(0,0,0,.03);
}
.button a{
    text-decoration: none;
    color: black;
    font-size: 0.75em;
}
</style>