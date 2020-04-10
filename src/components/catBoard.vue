<template>
<div class="m-3" style="width: 22vw; min-width: 15vw;" :status="status">
    <div class="card bg-light" style="width: 22vw; min-height: 25vh; max-height: 80vh;">
        <div class="card-header">{{title}}</div>
        <div class="card-body justify-content-center" style="overflow: scroll;">

            <draggable class="list-group" :list="status" group="tasks" style="min-height: 100px; oveflow: scroll">
                <task :isi="isi" v-for="isi in status" :key="isi.id" @deleteTask="deleteTask"></task>
            </draggable>

            <div class="collapse" :id="title">
                <div class="d-flex flex-column p-2 bg-warning" style="width: auto; min-height: 80px; border-radius: 5px;">
                    <input type="text" name="title-1" id="title-1" class="form-control" placeholder="task title" v-model="titleChg">
                    <div class="d-flex mt-2 justify-content-end">
                        <button class="btn-danger form-control m-1">Cancel</button>
                        <button class="btn-success form-control m-1" @click.prevent="addTask">Save</button>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="card-footer">
            <button class="form-control btn-success" type="button" data-toggle="collapse" :data-target="'#' + title" aria-expanded="false" aria-controls="index1">Add Task</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import task from './task'
import draggable from 'vuedraggable'
import socket from '../config'

export default {
    data() {
        return {
            titleChg: '',
            baseUrl: 'https://intense-basin-29706.herokuapp.com'
        }
    },
    components: {
        task,
        draggable
    },
    props: ['status', 'title'],
    methods: {
        addTask() {
            axios({
                method: 'POST',
                url: this.baseUrl + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.titleChg,
                    category: this.title
                }
            })
            .then((result) => {
                console.log(result)
                socket.emit('add')
               
                this.titleChg = ''
            }).catch((err) => {
                console.log(err)
            });
        },
        deleteTask() {
            this.$emit('deleteTask')
        }
    },
    created() {
    socket.on('addServer', (msg) => {
            this.$emit('add')
            console.log(msg)
        })
    }

}
</script>

<style>

</style>