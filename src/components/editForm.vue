<template>
    <div class="card card-body">
        <form @submit.prevent="updatePut()">
            <div class="form-group">
                <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="title" v-model="edit.title">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="description" v-model="edit.description">
            </div>
            <button type="submit" class="edit-submit-btn btn">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import socket from '../config.js'

export default {
    name: 'EditForm',
    props: ['detail'],
    data() {
        return {
            edit: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        updatePut() {
            console.log(`masuk update put`)
            console.log(`ini detail`, this.detail)
            if (this.edit.description == '' || this.edit.title == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill all the blank form!'
                })
            }
            axios({
                    method: 'put',
                    url: `http://localhost:3000/tasks/${this.detail.id}`,
                    data: {
                        title: this.edit.title,
                        description: this.edit.description,
                        status: this.detail.status
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log(result)

                    this.edit.title = ''
                    this.edit.description = ''
                    this.$emit('isEditDone', false)
                    socket.emit('updatePut')

                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        socket.on('updatePutMention', () => {
            this.$emit('refetchTasks')
        })
    }
}

</script>

<style scoped>
    .edit-submit-btn {
        background-color: red;
        color: white;
        border-radius: 4px;
    }
</style>

