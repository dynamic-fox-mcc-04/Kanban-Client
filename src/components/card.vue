<template>
    <div class="card border-grey mb-3 card-todo">
        <div class="card-body card-todo-body text-grey">
            <h5 class="card-title card-todo-title">{{taskCard.title}}</h5>
            <p class="card-text card-todo-text">Description: {{taskCard.description}}</p>
        </div>
        <div class="card-footer card-todo-footer bg-transparent border-grey">
            <ul>
                <li @click="removeTask(taskCard.id)"><button><i class="fas fa-trash-alt"></i></button></li>
                <li><button @click="formEdit" ><i class="far fa-edit"></i></button></li>
            </ul>
            <EditForm v-show="editForm" :detail="taskCard" @refetchTasks="refetchTasks" @isEditDone="isEditDone"></EditForm>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import EditForm from './editForm.vue'
import Swal from 'sweetalert2'
import socket from '../config.js'

export default {
    name: 'Card',
    props: ['taskCard'],
    components: {
        EditForm
    },
    data() {
        return {
            editForm: false
        }
    },
    methods: {
        isEditDone(value) {
            this.editForm = value
        },
        formEdit() {
            this.editForm = !this.editForm
        },
        removeTask(id) {
            console.log(`masuk delete`)
            console.log(id)
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        axios({
                            method: 'delete',
                            url: `http://localhost:3000/tasks/${id}`,
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                        .then(result => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )
                            console.log(result)
                            socket.emit('delete')

                        })
                        .catch(err => {
                            console.log(err)
                        })

                    }
                })
        },
        refetchTasks() {
            this.$emit('refetchTasks')
        }
    },
    created() {
        socket.on('deleteMention', () => {
            this.$emit('refetchTasks')
        })
    }
}
</script>

