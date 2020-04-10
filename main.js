const baseUrl = 'http://localhost:3000'
var app = new Vue ({
    el: '#app',
    data: {
        id: '',
        title: '',
        category: '',
        UserId: '',
        userData: {
            email: '',
            password: ''
        },
        tasks: [],
        isLogin: false,
        loginForm: false,
        registForm: false,
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
                    console.log('Successfully registered new account');
                    
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
                    const access_token = data.data.access_token
                    localStorage.setItem('access_token', access_token)
                    this.isLogin = true
                    this.userData.email = ''
                    this.userData.password = ''                    
                    this.readTask()

                })
                .catch(err=> {
                    err.response == undefined? console.log('Login Success') : console.log(err.response.data.msg);
                })
        },

        onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;    
            console.log(id_token);
            
            axios({
                method: 'POST',
                url: baseUrl + '/users/googleSign',
                data: {
                    'id_token' : id_token,
                }
            })
            
                .then(data => {
                    localStorage.setItem('token', data.token)
                    // console.log("Success login");
                    this.isLogin = true
                    this.readTask()
                })
                .catch(err => {
                    console.log(err.responseJSON);
                })
        },
        
        logout(){
            localStorage.clear()
            // auth2.signOut().then(function() {
            //     console.log('User signed out.');
            // });
            this.isLogin = false
        },

        readTask (){
            axios({
                method: 'GET',
                url: baseUrl + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                
            })
            .then(result => {
                this.tasks = result.data.task
                console.log(this.tasks);
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        createTask(){
            let title = this.title
            axios({
                method: 'POST',
                url: baseUrl + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title
                }
            })
            .then(result => {
                console.log("Successfully added new task");
                this.readTask()
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        deleteTask(id){
            axios ({
                method: 'delete',
                url: baseUrl + '/tasks/'+id,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result => {
                console.log("Successfully deleted task");
                this.title = 
                this.readTask()
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        moveForward(id){
            axios ({
                method: 'patch',
                url: baseUrl + '/tasks/for/'+id,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result => {
                console.log("Successfully updated task");
                this.readTask()
                
            })
            .catch(err => {
                console.log(err);
            })
            
        },

        moveBackward(id){
            console.log("backward jalan");
            axios ({
                method: 'patch',
                url: baseUrl + '/tasks/back/'+id,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result => {
                console.log("Successfully updated task");
                this.readTask()
                
            })
            .catch(err => {
                console.log(err);
            })
            
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
            this.readTask()
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