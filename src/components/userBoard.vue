<template>
    <!-- board card -->
    <div class="col-sm-3">
        <div class="card my-2" >
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="" style="cursor: pointer;" v-on:click="$emit('openTask', id, title)">{{title}}</h5>
                    <i class="fas fa-times" style="color:black;cursor:pointer" v-on:click="deleteProject"></i>
                </div>
            </div>
        </div>
    </div>
    <!-- board card end -->
</template>

<script>
let baseUrl = "http://localhost:3000";
export default {
    name: 'userBoard',
    props:['id', 'title'],
    methods:{
        deleteProject(){
            axios({
                method: 'DELETE',
                url : baseUrl + '/project/' + this.id,
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(result => {
                    this.$emit('reFetchProject')
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};

</script>

<style>
</style>