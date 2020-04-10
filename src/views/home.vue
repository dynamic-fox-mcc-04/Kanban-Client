<template>
    <div class="container-fluid" id="mainpage">
        <nav class="navbar navbar-light bg-light">
            <button @click="logout" id="logout-btn" type="button" class="btn btn-danger">Logout</button>
            <div id="header-title">Hi! Wellcome to Fox-Kanban!</div>
            <button class="btn btn-primary" type="button" @click="showAddForm" aria-expanded="false" aria-controls="collapseExample">
                Add Task
            </button>
        </nav>

        <div class="container-fluid d-flex flex-column justify-content-around" id="task-page">

            <AddForm @refetchTasks="refetchTasks" @showAddFormEmit="showAddFormEmit" v-show="isAddFormShow"></AddForm>
            <div class="container-fluid d-flex flex-row justify-content-around" id="card-page">

                <Board title="Backlog" :list="listBacklog" @refetchTasks="refetchTasks"></Board>
                <Board title="Upcoming" :list="listUpcoming" @refetchTasks="refetchTasks"></Board>
                <Board title="Progress" :list="listProgress" @refetchTasks="refetchTasks"></Board>
                <Board title="Done" :list="listDone" @refetchTasks="refetchTasks"></Board>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AddForm from '../components/addForm.vue'
import Board from '../components/board.vue'
import socket from '../config'


export default {
    name: 'Main',
    components: {
        Board,
        AddForm
    },
    props: ['listBacklog','listUpcoming','listProgress','listDone', 'isLoading'],
    data() {
        return {
            moreTask: {
                title: '',
                description: ''
            },
            edit: {
                id: '',
                title: '',
                description: '',
                status: ''
            },
            isAddFormShow: false
        }
    },
    methods: {
        showAddFormEmit(value) {
            this.isAddFormShow = value
        },
        showAddForm() {
            this.isAddFormShow = !this.isAddFormShow
        },
        logout() {
            localStorage.clear()
            this.$emit('isLoginEmit', false)
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log('User signed out.');
            });
        },
        refetchTasks() {
            this.$emit('refetchTasks')
        }
    },
    computed: {
        allList() {
            return [listBacklog, listUpcoming, listProgress, listDone]
        },
        backlog() {
            return this.listBacklog
        },
        upcoming() {
            return this.listUpcoming
        },
        progress() {
            return this.listProgress
        },
        done() {
            return this.listDone
        }
    },
    watch: {
        backlog() {
            this.listBacklog.forEach(task => {
                if (task.status !== 'backlog') {
                    console.log(`masuk backlog`)
                    let id = task.id
                    axios({
                        method: 'patch',
                        url: `http://localhost:3000/tasks/${id}`,
                        data: {
                            id: task.id,
                            status: 'backlog'
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .then(result => {
                            console.log(result)
                            socket.emit('updatePatch')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        },
        upcoming() {
            this.listUpcoming.forEach(task => {
                if (task.status !== 'upcoming') {
                    console.log(`masuk upcoming`)
                    let id = task.id
                    axios({
                        method: 'patch',
                        url: `http://localhost:3000/tasks/${id}`,
                        data: {
                            id: task.id,
                            status: 'upcoming'
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .then(result => {
                            console.log(result)
                            socket.emit('updatePatch')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        },
        progress() {
            this.listProgress.forEach(task => {
                if (task.status !== 'progress') {
                    console.log(`masuk progress`)
                    let id = task.id
                    axios({
                        method: 'patch',
                        url: `http://localhost:3000/tasks/${id}`,
                        data: {
                            id: task.id,
                            status: 'progress'
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .then(result => {
                            console.log(result)
                            socket.emit('updatePatch')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        },
        done() {
            this.listDone.forEach(task => {
                if (task.status !== 'done') {
                    console.log(`masuk done`)
                    let id = task.id
                    axios({
                        method: 'patch',
                        url: `http://localhost:3000/tasks/${id}`,
                        data: {
                            id: task.id,
                            status: 'done'
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .then(result => {
                            console.log(result)
                            socket.emit('updatePatch')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        }
    },
    created() {
        socket.on('updatePatchMention', () => {
            this.$emit('refetchTasks')
        })
    }
}
</script>

