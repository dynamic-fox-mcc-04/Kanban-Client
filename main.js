const baseUrl = 'http://localhost:3000'
var app = new Vue ({
    el: '#app',
    data: {
        userData: {
            email: '',
            password: ''
        },
        isLogin: false,
        loginForm: false,
        registForm: false,
        tasks: [
            {id: 1, task: "This is kanban (backlog)", category: 'backlog'},
            {id: 2, task: "This is kanban (todo)", category: 'todo'},
            {id: 3, task: "This is kanban (done)", category: 'done'},
            {id: 4, task: "This is kanban (completed)", category: 'completed'},
            {id: 5, task: "This is kanban (backlog)", category: 'backlog'},
            {id: 6, task: "This is kanban (done)", category: 'done'},
        ]
    },
    computed: {

    },
    methods: {
        getHomePage(){
            this.registForm = false,
            this.loginForm = false
        },

        getRegistForm(){
            this.registForm = true
            this.loginForm = false
        },

        getLoginForm(){
            this.loginForm = true
            this.registForm = false
        },

        register(){
            let email= this.userData.email
            let password= this.userData.password

            axios({
                method: 'POST',
                url: baseUrl + '/users/register',
                data: { 
                    email,
                    password
                }
            })
                .then(({data})=> {
                    const access_token = data.access_token
                    localStorage.setItem('access_token', access_token)
                    this.isLogin = true
                    this.userData.email = ''
                    this.userData.password = ''
                })
                .catch(err=> {
                    console.log(err.response.data.errors[0].message);
                })
        },
            

        login(){
            
            let email= this.userData.email
            let password= this.userData.password

            axios({
                method: 'POST',
                url: baseUrl + '/users/login',
                data: { 
                    email,
                    password
                }
            })
                .then(data => {
                    const access_token = data.access_token
                    localStorage.setItem('access_token', access_token)
                    this.isLogin = true
                    this.userData.email = ''
                    this.userData.password = ''

                })
                .catch(err=> {
                    console.log(err.response.data.msg);
                })
        },

        logout(){
            localStorage.clear()
            this.isLogin = false
        },

        readTask (){
            axios({
                method: 'GET',
                url: baseUrl + '/tasks',
                headers: {
                    access_token: localStorage.token
                }
            })
            .then()
            .catch()
        },

        createTask(){
            axios({  
                method: 'POST',
                url: baseUrl + '/tasks',
                headers: {
                    access_token: localStorage.token
                },
                data: {
                    newTask
                }
            })
            .then()
            .catch()

        }

    },
    // Vue Lifecycle
    beforeCreate(){
        console.log('beforeCreate')
    },
    created(){
        console.log('created')
        if(localStorage.access_token){
            this.isLogin = true
        }
    },
    beforeMount(){
        console.log('beforeMount')
    },
    mounted(){
        console.log('mounted')
    },
    beforeUpdate(){
        console.log('beforeUpdate')
    },
    updated(){
        console.log('updated')
    },
    beforeDestroy(){
        console.log('beforeDestroy')
    },
    destroyed(){
        console.log('destroyed')
    }
})