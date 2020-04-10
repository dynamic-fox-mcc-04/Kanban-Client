let app = new Vue({
    el: '#app',
    data: {
        userLogin: {
            email: '',
            password: ''
        },
        userRegister: {
            email: '',
            password: ''
        },
        status: {
            backlog: [],
            upcoming: [],
            progress: [],
            done: []
        },
        isRegisterForm: false,
        isLoginForm: false,
        isLogin: false,
        moreTask: {
            title: '',
            description: ''
        },
        edit: {
            // form: false,
            id: '',
            title: '',
            description: '',
            status: ''
        }
    },
    methods: {
        registerForm() {
            this.isRegisterForm = true
            this.isLoginForm = false
        },
        loginForm() {
            this.isLoginForm = true
            this.isRegisterForm = false
        },
        register() {
            let account = {
                email: this.userRegister.email,
                password: this.userRegister.password
            }
            axios.post(`http://localhost:3000/users/register`, account)
                .then(result => {
                    localStorage.setItem('token', result.data.token)
                    this.isLogin = true
                    this.userRegister.email = ''
                    this.userRegister.password = ''
                    this.getTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        login() {
            let account = {
                email: this.userLogin.email,
                password: this.userLogin.password
            }
            axios.post(`http://localhost:3000/users/login`, account)
                .then(result => {
                    localStorage.setItem('token', result.data.token)
                    this.isLogin = true
                    this.userLogin.email = ''
                    this.userLogin.password = ''
                    this.isRegisterForm = false
                    this.isLoginForm = false
                    this.getTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout() {
            localStorage.clear()
            this.isLogin = false
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log('User signed out.');
            });
        },
        onSignIn(googleUser) {
            let id_token = googleUser.getAuthResponse().id_token;
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/googleLogin',
                    data: {
                        id_token
                    }
                })
                .then((user) => {
                    localStorage.setItem('token', user.token)
                    auth()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getTasks() {
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
        },
        stepForward(id, oldStatus) {
            console.log(`masuk step forward`)
            console.log(id, oldStatus)
            let update = {};
            if (oldStatus === "backlog") {
                update = { id: id, status: "upcoming" };
                this.update(update);
            } else if (oldStatus === "upcoming") {
                update = { id: id, status: "progress" };
                this.update(update);
            } else if (oldStatus === "progress") {
                update = { id: id, status: "done" };
                this.update(update);
            }
        },
        stepBackward(id, oldStatus) {
            let update = {};
            if (oldStatus === "done") {
                update = { id: id, status: "progress" };
                this.update(update);
            } else if (oldStatus === "progress") {
                update = { id: id, status: "upcoming" };
                this.update(update);
            } else if (oldStatus === "upcoming") {
                update = { id: id, status: "backlog" };
                this.update(update);
            }
        },
        update(update) {
            console.log(`masuk update patch`)
            console.log(update)
            axios({
                    method: 'patch',
                    url: `http://localhost:3000/tasks/${update.id}`,
                    data: {
                        id: update.id,
                        status: update.status
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log(result)
                    this.getTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editForm(id) {
            return false
        },
        formEdit(id, title, desc, status) {
            this.edit.id = id
            this.edit.title = title
            this.edit.description = desc
            this.edit.status = status
            this.editForm(id) = !this.editForm(id)
        },
        updatePut() {
            console.log(`masuk update put`)
            axios({
                    method: 'put',
                    url: `http://localhost:3000/tasks/${this.edit.id}`,
                    data: {
                        title: this.edit.title,
                        description: this.edit.description,
                        status: this.edit.status
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log(result)
                    this.edit.id = ''
                    this.edit.title = ''
                    this.edit.description = ''
                    this.edit.status = ''
                    this.getTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        removeTask(id) {
            console.log(`masuk delete`)
            console.log(id)
            axios({
                    method: 'delete',
                    url: `http://localhost:3000/tasks/${id}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log(result)
                    this.getTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        create() {
            console.log(`masuk create`)
            console.log(this.moreTask.title)
            console.log(this.moreTask.description)
            axios({
                    method: 'post',
                    url: `http://localhost:3000/tasks`,
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
                    this.getTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    // computed: {
    //     backlog() {
    //         return this.status.backlog
    //     },
    //     upcoming() {
    //         return this.status.upcoming
    //     },
    //     progress() {
    //         return this.status.progress
    //     },
    //     done() {
    //         return this.status.done
    //     }
    // },
    // watch: {
    //     backlog() {
    //         this.status.backlog.forEach(task => {
    //             if (task.status !== 'backlog') {
    //                 let id = task.id
    //                 axios.patch(`http://localhost:3000/tasks/${id}`, { status: 'backlog' })
    //                     .then(result => {
    //                         console.log(result)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //             }
    //         })
    //     },
    //     upcoming() {
    //         this.status.upcoming.forEach(task => {
    //             if (task.status !== 'upcoming') {
    //                 let id = task.id
    //                 axios.patch(`http://localhost:3000/tasks/${id}`, { status: 'upcoming' })
    //                     .then(result => {
    //                         console.log(result)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //             }
    //         })
    //     },
    //     progress() {
    //         this.status.progress.forEach(task => {
    //             if (task.status !== 'progress') {
    //                 let id = task.id
    //                 axios.patch(`http://localhost:3000/tasks/${id}`, { status: 'progress' })
    //                     .then(result => {
    //                         console.log(result)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //             }
    //         })
    //     },
    //     done() {
    //         this.status.done.forEach(task => {
    //             if (task.status !== 'done') {
    //                 let id = task.id
    //                 axios.patch(`http://localhost:3000/tasks/${id}`, { status: 'done' })
    //                     .then(result => {
    //                         console.log(result)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //             }
    //         })
    //     }
    // },
    created() {
        if (localStorage.token) {
            this.isLogin = true
            this.getTasks()
        }
    }

})