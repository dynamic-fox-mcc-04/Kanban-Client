<template>
    <div id="formadd">
        <div class="card card-body">
            <form id="todo-form" @submit.prevent="create">
                <div class="form-group">
                    <input type="text" class="form-control" id="title" placeholder="title...." v-model="moreTask.title">
                </div>
                <div class="form-group">
                    <textarea class="form-control" id="description" placeholder="description...." v-model="moreTask.description"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import socket from '../config.js'

export default {
    name: 'AddForm',
    data() {
        return {
            moreTask: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        create() {
            console.log(`masuk create`)
            if (this.moreTask.description == '' || this.moreTask.title == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill all the blank form!'
                })
            }
            axios({
                    method: 'post',
                    url: `https://nameless-oasis-92283.herokuapp.com/tasks`,
                    data: {
                        title: this.moreTask.title,
                        description: this.moreTask.description
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log(result)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your new task has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.moreTask.title = ''
                    this.moreTask.description = ''
                    this.$emit('showAddFormEmit', false)
                    socket.emit('create')

                })
                .catch(err => {
                    console.log(err)
                })
        },
        refetchTasks() {
            this.$emit('refetchTasks')
        }
    },
    created() {
        socket.on('createMention', () => {
            this.$emit('refetchTasks')
        })
    }
}
</script>
