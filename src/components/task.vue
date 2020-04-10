<template>
  <div class="d-flex flex-column p-2 bg-warning mt-2 mb-2" style="width: auto; min-height: 80px; border-radius: 5px;">
    <div id="title-text">
        {{isi.title}}
    </div>
    <div class="d-flex mt-2 justify-content-end">
        <button class="btn-danger form-control m-1" @click.prevent="deleteTask(isi.id)">Delete</button>
        <button class="btn-success form-control m-1" data-toggle="modal" :data-target="'#' + isi.id">Edit</button>

        <div class="modal fade" :id="isi.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="position: absolute;">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h5 class="modal-title">Edit Task</h5>
                    <input type="text" name="changeTitle" id="changeTitle" class="form-control" :placeholder="isi.title" v-model="editTitle"><br>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click.prevent="updateTitle(isi.id)" data-dismiss="modal">Save changes</button>
                </div>
            </div>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import axios from 'axios'
import socket from '../config'
export default {
    data() {
        return {
            baseUrl: 'https://intense-basin-29706.herokuapp.com',
            editTitle: ''
        }
    },
    props: ['isi'],
    methods: {
        deleteTask(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    this.$swal.fire(
                    'Deleted!',
                    `Task with ID: ${id} has been deleted.`,
                    'success'
                    )
                    return axios({
                        method: 'DELETE',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        url: this.baseUrl + '/tasks/' + id
                    })
                }
            })
            .then((result) => {
                console.log(result)
                socket.emit('fetchClient')
                    // this.$emit('deleteTask')
            }).catch((err) => {
                console.log(err)
            });
            
        },
        
        updateTitle(id) {
            axios({
                method: 'PATCH',
                headers: {
                    access_token: localStorage.access_token
                },
                url: this.baseUrl + '/tasks/' + id + '?type=title',
                data: {
                    title: this.editTitle
                }
            })
            .then((result) => {
                console.log(result)
                socket.emit('fetchClient')
                // this.$emit('deleteTask')
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    created() {
        socket.on('fetch', () => {
            this.$emit('deleteTask')
        })

     }

}
</script>

<style>

</style>