var app = new Vue({
  el: '#app',
  data: {
    title: 'Feed my dog Doggo some beef kibbles',
    description: "He needs more protein in Monday",
    due_date: "07-08-20",
    imageUrl: "https://img-9gag-fun.9cache.com/photo/aXj502b_460swp.webp",
    //currently there are 4 categories: "backlog","todo","done","completed"
    isLoggedIn: false,
    tasks:[],
    backlogTasks:[],
    todoTasks:[],
    doneTasks:[],
    completedTasks:[],
    user:{
      email:"",
      password:"",
      access_token:""
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
        this.user.access_token = result.data.access_token
        this.user.email = ""
        this.user.password = ""
        this.isLoggedIn = true
        let token = result.data.access_token

        this.getTasks( token )
      })
      .catch(error => {
        console.log(error)
      })
    },
    getTasks( token ){
      // console.log(result.data.access_token, "satu")
      /* 
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      */
      console.log(localStorage.access_token, "dua")
      console.log(token, "tiga")
      

      axios.get(`http://localhost:3000/tasks`, {headers: {
        access_token: token
      }})
      .then(result => {
        console.log(result.data.tasks)
        this.tasks = result.data.tasks
        this.reassignTasks()
      })
      .catch(error => {
        console.log(error)
      })
    }, 
    reassignTasks(){
      console.log("this is classify tasks")
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
      console.log(taskId)
      console.log(newCategory)
      for (let i = 0; i < this.tasks.length; i++) {
        if(this.tasks[i]["id"] == taskId){
          this.tasks[i]["category"] = newCategory
        } 
      }
      this.reassignTasks()
      //harusnya diganti dengan proses axios di sini
    }
  }, 
  //Vue lifecycle starts here
  beforeCreate(){

  },
  created(){
    if(localStorage.token) {
      this.isLoggedIn = true
    }
    this.getTasks()
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