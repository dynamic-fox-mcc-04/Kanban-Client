<template>
    <div id="opening">
        <Auth v-if="!isLogin" @refetchTasks="getTasks" @isLoginEmit="isLoginEmit"></Auth>
        <Main v-else :listBacklog="status.backlog"
        :listUpcoming="status.upcoming"
        :listProgress="status.progress"
        :listDone="status.done"
        @refetchTasks="getTasks"
        @isLoginEmit="isLoginEmit"></Main>
    </div>
</template>

<script>
import axios from 'axios'
import Main from './views/home.vue'
import Auth from './views/auth.vue'

export default {
    name: 'App',
    components: {
        Main,
        Auth
    },
    data() {
        return {
            status: {
                backlog: [],
                upcoming: [],
                progress: [],
                done: []
            },
            isLogin: false,
            moreTask: {
                title: '',
                description: ''
            },
            // isLoading: false,
            edit: {
                id: '',
                title: '',
                description: '',
                status: ''
            }
        }
    },
    methods: {
        // isLoadingEmit(value) {
        //     this.isLoading = value
        // },
        isLoginEmit(value) {
            console.log(value)
            this.isLogin = value
        },
        getTasks() {
            // this.isLoading = true
            axios({
                    method: 'get',
                    url: 'http://localhost:3000/tasks',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log(result.data.Tasks)
                    let arrBacklog = []
                    let arrUpcoming = []
                    let arrProgress = []
                    let arrDone = []
                    let tasks = result.data.Tasks
                    tasks.forEach(task => {
                        let taskObj = {}
                        switch (task.status) {
                            case 'backlog':
                                taskObj = task;
                                arrBacklog.push(task)
                                break
                            case 'upcoming':
                                taskObj = task;
                                arrUpcoming.push(task)
                                break
                            case 'progress':
                                taskObj = task;
                                arrProgress.push(task)
                                break
                            case 'done':
                                taskObj = task;
                                arrDone.push(task)
                                break
                        }
                    })
                    this.status.backlog = arrBacklog
                    this.status.upcoming = arrUpcoming
                    this.status.progress = arrProgress
                    this.status.done = arrDone
                })
                .catch(err => {
                    console.log(err)
                })
                // .finally(()=>{
                //     this.isLoading = false
                // })
        }
    },
    created() {
        if (localStorage.token) {
            this.isLogin = true
            this.getTasks()
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

#opening {
    height: 100%;
}

body {
    overflow-y: hidden;
}

.navbar {
    top: 0;
    position: fixed;
    min-width: 98vw;
    z-index: 999999;
    border-radius: 10px;
}

#formadd,
#formedit {
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px 0 grey;
}

#task-page {
    padding: 0 50px;
    margin-top: 80px;
}

.task-container {
    height: 80vh;
    overflow-y: scroll !important;
    background-color: whitesmoke;
}

.card-main-con {
    padding: 1px;
    margin: 0 8px;
    box-shadow: 5px 5px 5px 0 grey;
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.card-todo-footer ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.card-todo {
    background-color: yellow;
    box-shadow: 5px 5px 5px 0 grey;
    cursor: pointer;
}

.card-footer button {
    border: none;
    padding: 1vh;
    border-radius: 2px;
    background-color: whitesmoke;
}

.card-footer button:hover {
    border: none;
    padding: 1vh;
    border-radius: 2px;
    background-color: rgb(11, 255, 23);
}

.title {
    font-family: 'tahoma';
    /* font-family: 'Josefin Sans', sans-serif; */
    font-weight: 700;
    text-align: center;
}

.backlog {
    color: #F05D5E;
}

.inprogress {
    color: rgb(93, 240, 142);
}

.upcoming {
    color: blue;
}

.complete {
    color: #272932;
}

.modal-content {
    margin-top: 200px;
    width: 500px;
    align-items: center;
}


/* width */

::-webkit-scrollbar {
    width: 5px;
}


/* Track */

 ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 1px;
}


/* Handle */

 ::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 2px;
}

#header-title {
    font-family: 'Permanent Marker', cursive;
    font-weight: 400;
    font-size: 24px;
}

#landingpage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    background-image: url('https://cdn.hipwallpaper.com/i/32/8/ErjBcp.jpg');
    background-size: cover;
    background-attachment: fixed;
}

#landingpage h2 {
    font-family: "Permanent Marker", cursive;
    font-weight: 700;
    font-size: 96px;
    margin: 0;
}

.divLanding {
    display: flex;
    flex-direction: column;
    align-items: center;
}


#auth-btn {
    margin-bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

h5 {
    font-family: "Josefin Sans", sans-serif;
}

#landingpage img {
    width: 5vw;
}


.authModal {
    margin: 8px;
    border-radius: 8px;
    width: 100px;
    height: 50px;
    background-color: gold;
    font-weight: bold;
    margin-top: 40px;
}

.authModal:hover {
    margin-top: 40px;
    border-radius: 8px;
    width: 100px;
    height: 50px;
    background-color: gold;
    font-weight: bold;
    opacity: 0.6;
    transition: 0.1s;
}

.auth-form input {
    width: 250px;
}

.auth-form input:hover {
    width: 250px;
    border: 2px solid blue;
}

.auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-form h3 {
    font-family: "lobster", cursive;
}

.auth-container {
    padding: 2vh;
    margin: 2vh;
    width: 350px;
    margin: 5px auto;
    height: min-content;
    overflow: hidden;
    border-radius: 40px;
    box-shadow: 5px 5px 10px 0 grey;
    background-color: grey;
}
</style>
