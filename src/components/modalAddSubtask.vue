<template>
   <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                        Add Activity
                    </slot>
                </div>

                <form @submit.prevent="AddActivity()">
                    <div class="form-group">
                        <label for="title-name" class="col-form-label">Title:</label>
                        <input v-model="title" type="text" class="form-control" id="title-name" required/>
                    </div>
                    <div class="form-group">
                        <label for="description-text" class="col-form-label">Description:</label>
                        <textarea v-model="description" class="form-control" id="description-text" required></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-secondary"  @click="$emit('close')" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
let baseUrl = "http://localhost:3000";
export default {
    name: "ModalAddSubTask",
    data(){
        return {
            title: '',
            description : ''
        }
    },
    props:['projectId', 'categgoryId'],
    methods:{
        AddActivity() {
            // alert(this.categgoryId,)
            axios({
                method: "POST",
                url: baseUrl + "/subtask",
                data: {
                    title: this.title,
                    description: this.description,
                    ProjectId: this.projectId,
                    Category: this.categgoryId
                },
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(result => {
                    this.$emit('reFetchTask')
                    this.$emit('close')
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
};
</script>

<style>
</style>