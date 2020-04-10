<template>
    <contRegLog
        :isLogin="isLogin"
        :isInLogin="isInLogin"
        :message="message"
        :logVal="getLoginVal"
        :status='status'
        @chgInLoginVal="chgInLoginVal"
        @login="auth"
        @logout="auth"
        @add="fetchTask"
        @deleteTask="fetchTask"
        
        style="position: absolute;
    background-color: black;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;"
    >
        
    </contRegLog>
</template>

<script>
import axios from 'axios'
import contRegLog from './views/contLogReg'
import socket from './config';

export default {
    name: "App",
    components: {
        contRegLog
    },
    data () {
        return {
            message: "Hello World",
            isLogin: false,
            isInLogin: true,
            baseUrl: 'http://localhost:3000',
            status: {
                'Pre-Log': [],
                'To-Do': [],
                'On-Going': [],
                'Finished': []
            }
        }
    },
    computed: {
        getLoginVal() {
            if (this.isInLogin) {
                return {
                    titleLog: "LOGIN",
                    fooMsg: "Don't have account?",
                    hrefLog: "Register Here",

                }
            } else {
                 return {
                    titleLog: "REGISTER",
                    fooMsg: "Already have account?",
                    hrefLog: "Login Here",

                }
            }
        },
        preLog() {
            return this.status['Pre-Log']
        },
        toDo() {
            return this.status['To-Do']
        },
        onGoing() {
            return this.status['On-Going']
        },
        finished() {
            return this.status['Finished']
        }
    },
    methods: {
        chgInLoginVal(val) {
            this.isInLogin = val
        },
        auth(val) {
            this.isLogin = val
        },
        fetchAllTask() {
            this.fetchTask('Pre-Log')
            this.fetchTask('To-Do')
            this.fetchTask('On-Going')
            this.fetchTask('Finished')
            console.log(this.status['On-Going'][0].title, 'hai semua')
        },
        fetchTask() {
            console.log('masook gann')
            axios({
                method: 'GET',
                url: this.baseUrl + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then((result) => {
                this.status['Pre-Log'] = []
                this.status['To-Do'] = []
                this.status['On-Going'] = []
                this.status['Finished'] = []
                result.data.tasks.forEach(el => {
                    if (el.category == 'Pre-Log') {
                        this.status['Pre-Log'].push(el)
                    } else if (el.category == 'To-Do') {
                        this.status['To-Do'].push(el)
                    } else if (el.category == 'On-Going') {
                        this.status['On-Going'].push(el)
                    } else if (el.category == 'Finished') {
                        this.status['Finished'].push(el)
                    }
                })
                // socket.emit('fetchClient')
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    watch: {
        preLog() {
            this.status['Pre-Log'].forEach(el => {
                if (el.category !== 'Pre-Log') {
                    axios({
                        method: 'PATCH',
                        url: this.baseUrl + '/tasks/' + el.id + '?type=category',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            title: el.title,
                            category: 'Pre-Log'
                        }
                    })
                    .then((result) => {
                        console.log(result)
                        // this.fetchTask()
                        socket.emit('fetchClient')
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            })
        },
        toDo() {
            console.log('wadidaw')
            this.status['To-Do'].forEach(el => {
                if (el.category !== 'To-Do') {
                    axios({
                        method: 'PATCH',
                        url: this.baseUrl + '/tasks/' + el.id + '?type=category',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            title: el.title,
                            category: 'To-Do'
                        }
                    })
                    .then((result) => {
                        console.log(result)
                        // this.fetchTask()
                        socket.emit('fetchClient')

                    }).catch((err) => {
                        console.log(err)
                    });
                }
            })
            console.log('woiii')
        },
        onGoing() {
            this.status['On-Going'].forEach(el => {
                if (el.category !== 'On-Going') {
                    axios({
                        method: 'PATCH',
                        url: this.baseUrl + '/tasks/' + el.id + '?type=category',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            title: el.title,
                            category: 'On-Going'
                        }
                    })
                    .then((result) => {
                        console.log(result)
                        // this.fetchTask()
                        socket.emit('fetchClient')
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            })
        },
        finished() {
            this.status['Finished'].forEach(el => {
                if (el.category !== 'Finished') {
                    axios({
                        method: 'PATCH',
                        url: this.baseUrl + '/tasks/' + el.id + '?type=category',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            title: el.title,
                            category: 'Finished'
                        }
                    })
                    .then((result) => {
                        console.log(result)
                        // this.fetchTask()
                        socket.emit('fetchClient')
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            })
        }
    },
    created() {
        if (localStorage.access_token) {
            this.isLogin = true
            this.fetchTask()
        } else {
            this.isLogin = false
        }
        socket.on('fetch', () => {
            this.fetchTask()
        })
    }
}
</script>

<style scoped>
    * {
    margin: 0;
    padding: 0;
}

/* body {
    position: absolute;
    background-color: black;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
} */

/* .navbar {
    top: 0.2%;
    margin: 0 6px;
    border-radius: 0.5rem;
    background-color: #263238;
} */

#outer-cont {
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    
}

#cont-board {
    width: 100vw;
    margin: 2px 6px;
    height: 89vh;
    background-color: #263238;
    border-radius: 0.5rem;
    
}

.card-body {
    overflow-y: scroll;
}

</style>