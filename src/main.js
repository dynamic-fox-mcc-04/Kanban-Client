// import Vue from 'vue';
// import App from './App.vue';

// new Vue({
//   render: h => h(App),
// }).$mount('#app');

var app = new Vue({
  el: '#app',
  data: {
    title: 'Feed my dog Doggo some beef kibbles',
    description: "He needs more protein in Monday",
    due_date: "07-08-20",
    imageUrl: "https://img-9gag-fun.9cache.com/photo/aXj502b_460swp.webp",
    //currently there are 4 categories: "backlog","todo","done","completed"
    isLoggedIn: false,
    isLogInPage: true,
    isMainPage: false,
    isAddTaskPage: false,
    isEditTaskPage:false,
    isRegisterPage:false,
    tasks:[],
    backlogTasks:[],
    todoTasks:[],
    doneTasks:[],
    completedTasks:[],
    newTask:{
      title:"",
      category:"",
      tags:"",
      description:"",
      due_date:""
    },
    selectedTask:"",
    user:{
      email:"",
      password:"",
      access_token:""
    },
    registerUser: {
      email:"",
      password:""
    }
  },
  methods:{
    login(){
      //create payload -- hit api using axios for registering -- gained token from server
      let payload = {
        email : this.user.email,
        password : this.user.password
      }
      axios.post(`http://localhost:3000/login`,payload)
      .then(result => {
        // console.log(result.data.access_token, "this is token result")
        
        localStorage.access_token = result.data.access_token
        // console.log(localStorage.access_token, "this is token at localStorage")
        this.user.email = ""
        this.user.password = ""
        this.isLoggedIn = true
        this.isMainPage = true
        this.getTasks()
      })
      .catch(error => {
        console.log(error)
      })
    },
    logout(){
      localStorage.clear()
      this.isLoggedIn = false
    },
    getTasks( ){
      axios.get(`http://localhost:3000/tasks`, {headers: {
        access_token: localStorage.access_token
      }})
      .then(result => {
        (result.data.tasks).map(el =>{
          let date = new Date(el.due_date)
          el.due_date = date.toDateString()
        })
        console.log("UPDATED ALLDATA", result.data.tasks)


        this.tasks = result.data.tasks
        this.reassignTasks()
      })
      .catch(error => {
        console.log(error)
      })
    }, 
    reassignTasks(){
      // console.log("this is classify tasks")
      // console.log(this.tasks)
      this.backlogTasks = []
      this.todoTasks = []
      this.doneTasks = []
      this.completedTasks = []
      for (let i = 0; i < (this.tasks).length; i++) {
        if(this.tasks[i]["category"] === "backlog"){
          this.backlogTasks.push(this.tasks[i])
        } else if(this.tasks[i]["category"] === "todo"){
          this.todoTasks.push(this.tasks[i])
        } else if(this.tasks[i]["category"] === "done"){
          this.doneTasks.push(this.tasks[i])
        } else if(this.tasks[i]["category"] === "completed"){
          this.completedTasks.push(this.tasks[i])
        }
      }
    },
    moveCategory( taskId , newCategory ){
      console.log(taskId, "ini task id")
      console.log(newCategory, "ini new category")
      // console.log(localStorage.access_token, "+++++++++++")
      // console.log(this.user.access_token, "------------")

      //proses axios di sini untuk patch specific Task -- this.reassignTASKS
      // {{ host  }}/tasks/12/?newCategory=done

      // `http://localhost:3000/tasks/${taskId}/?newCategory=${newCategory}`,
      axios({
        method: 'patch',
        url: `http://localhost:3000/tasks/${taskId}/?newCategory=${newCategory}`,
        headers: {
          access_token: localStorage.access_token, // make sure to consistently use localStorage.access_token
        }
      })
      .then(result =>{
        // console.log(result.data, "result dari patch")
        this.getTasks()
      })
      .catch(error => {
        console.log("error at moveCategory caused by", error)
      })
    },
    addNewTask(){
      this.isAddTaskPage = true
    },
    deleteTask( taskId ){
      console.log(taskId)
      axios({
        method: "delete",
        url:`http://localhost:3000/tasks/${taskId}`,
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then( result =>{
        console.log(result)
        this.getTasks()
        this.reassignTasks()
      })
      .catch(error => {
        console.log(error)
      })
    },
    showAddTaskPage(){
      this.isMainPage = false
      this.isAddTaskPage = true
    },
    addNewTask(){
      let title = this.newTask.title
      let description = this.newTask.description
      let due_date = this.newTask.due_date
      let payload = {
        title,
        description,
        due_date,
        tags : "",
        category : "backlog"
      }
      axios({
        method: "post",
        url: `http://localhost:3000/tasks`,
        headers: {
          access_token: localStorage.access_token, // make sure to consistently use localStorage.access_token
        },
        data : payload
      })
      .then(result => {
        this.isAddTaskPage = false
        this.isMainPage = true
        this.getTasks()
        this.reassignTasks()
      })
      .catch(error => {
        console.log(error)
      })


    },
    backToMainPage(){
      this.isAddTaskPage = false
      this.isEditTaskPage = false
      this.isMainPage = true
    },
    showEditPage( taskId ){
      this.isMainPage = false
      this.isEditTaskPage = true
      axios({
        method:'get',
        url:`http://localhost:3000/tasks/${taskId}`,
        headers :{
          access_token: localStorage.access_token
        }
      })
      .then(result => {
        console.log(result.data.task)
        this.selectedTask = ""
        let StringDate = new Date(result.data.task.due_date)
        let displayDate = StringDate.toISOString().substring(0, 10)
        result.data.task.due_date = displayDate
        this.selectedTask = result.data.task


      })
      .catch(error => {
        console.log(error)
      })

    },
    showRegisterPage(){
      this.isMainPage = false
      this.isRegisterPage = true
      this.isLogInPage = false
    },
    register(){
      let payload = {
        email: this.registerUser.email,
        password: this.registerUser.password
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data:payload
      })
      .then(_ =>{
        this.isRegisterPage = false
        this.isLogInPage = true
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }, 
  //Vue lifecycle starts here
  beforeCreate(){

  },
  created(){
    if(localStorage.access_token) {
      this.isLoggedIn = true
      this.isMainPage = true
      this.getTasks()
    }
  },
  beforeMounted(){
    
  },
  mounted(){
    
  },
  beforeUpdated(){

  },
  updated(){

  },
  beforeDestroy(){

  },
  destroyed(){

  }

})