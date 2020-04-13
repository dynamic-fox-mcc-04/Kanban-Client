<template>
  <div id="card">
  <b-card :title="Task.Title" :sub-title="Task.Description">

    <b-button variant='danger' @click="Delete">Delete</b-button>
    <b-button variant='primary' @click="showUpdate">Update</b-button>
  </b-card>
  <update :Task="Task" v-on:Update="Update"></update>
</div>
</template>

<script>
import update from './updatetask'
export default {
    props: ['Task'],
    data() {
        return {

        }
    },
    components: {
        update
    },
    methods: {
        showUpdate() {
            let n = this.Task.id.toString()
            this.$bvModal.show(n)
        },
        Update(value) {
            this.$emit('Update', value)
        },
        Delete() {
            let payload = {
                id: this.Task.id
            }
            this.$emit('Delete', payload)
        }
    }
}
</script>
    

<style>
#card {
    width: 17vw;
    height: 11vh;
    margin-left: 1vw;
    margin-top: 1vh;
}
.card-link :hover {
    cursor: pointer;
}

</style>