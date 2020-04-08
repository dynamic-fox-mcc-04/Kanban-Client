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
        }
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
        }
    }
})