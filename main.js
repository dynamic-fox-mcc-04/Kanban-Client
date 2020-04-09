let app = new Vue({
    el: '#app',
    data: {
        user: {
            task: ''
        },
        prelog: {
            task: ''
        },
        todo: {
            task: ''
        },
        process: {
            task: ''
        },
        completed: {
            task: ''
        },
        isLogin: false,
        user: {
            email: '',
            password: ''
        },
        projects: []
    },
    computed: {

    },
    methods: {
        addTask() {
            this.prelog.task = this.user.task
            this.user.task = ''
            // console.log()
        },
        cancelTask() {
            this.prelog.task = ''
        },
        addTodo() {
            this.todo.task = this.prelog.task
            this.prelog.task = ''
        },
        cancelTodo() {
            this.prelog.task = this.todo.task
            this.todo.task = ''
        },

        addProcess() {
            this.process.task = this.todo.task
            this.todo.task = ''
        },
        cancelProcess() {
            this.todo.task = this.process.task
            this.process.task = ''
        },
        addComplete() {
            this.completed.task = this.process.task
            this.process.task = ''
        },
        cancelComplete() {
            this.process.task = this.completed.task
            this.completed.task = ''
        },

        login() {
            axios.post("http://localhost:3000/login", {
                email: this.user.email,
                password: this.user.password
            })
                .then(result => {
                    const { data } = result
                    const { access_token } = data
                    localStorage.setItem("access_token", access_token)
                    this.user.email = ''
                    this.user.password = ''
                    this.isLogin = true
                    this.getProjects()
                })
                .catch(err => {
                    console.log(err)
                })
        },
       
        getProjects() {
            axios.get("http://localhost:3000/projects", {
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(result => {
                const { data } = result
                const { projects } = data
                this.projects = projects
                console.log(projects)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    beforeCreate() {

    },
    created() {
        if (localStorage.access_token) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }

    }
})