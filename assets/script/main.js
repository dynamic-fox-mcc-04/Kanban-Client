var baseUrl = 'http://localhost:3000'
var app = new Vue({
    el: "#app",
    data:{
        isLogin: false,
        user:{
            email: '',
            password: ''
        },
        Project: {
            user_project: [],
            organisation_project:[]
        },
        board:{
            project_name: ''
        },
        TmpProjectName : '',
        TmpProjectId : null,
        Category: []
    },
    methods:{
        login(){
            axios.post(baseUrl + '/user/login', this.user)
                .then((result)=>{
                    localStorage.setItem('access_token', result.data.access_token)
                    this.isLogin = true
                    this.user.email = ''
                    this.user.password = ''
                    this.getProject()
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        logout(){
            localStorage.clear()
            this.isLogin = false
        },
        // board
        addBoard(){
            console.log(this.board.project_name);
            
            axios.post(baseUrl + '/project', this.board, {
                headers: {
                    access_token : localStorage.access_token
                },
            })
                .then((result)=>{
                    console.log(result);
                    this.getProject()
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
        },
        deleteBoard(id){
            axios.delete(baseUrl + '/project/' + id,{
                headers: {
                    access_token : localStorage.access_token
                },
            })
                .then((result)=>{
                    console.log(result);
                    this.TmpProjectName = '',
                    this.TmpProjectId = null,
                    this.getProject()
                    this.getTask()
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
        },
        getProject(){
            axios.get(baseUrl + '/project', {
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then((result)=>{
                    this.Project.user_project = result.data
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        getTask(id , projectName){
            const id_project = id
            axios.get(baseUrl + '/task',{
                headers:{
                    access_token : localStorage.access_token,
                    id_project
                }
            })
                .then((result)=>{
                    console.log(result.data);
                    this.TmpProjectId = id
                    this.TmpProjectName = projectName
                    this.Category = result.data
                })
        }
    },
    beforeCreate(){

    },
    created(){
        if(localStorage.access_token){
            this.isLogin = true
            this.getProject()
        }
    },
    beforeMount(){

    },
    mounted(){

    }
})