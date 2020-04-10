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
        console.log(result, "this is token result")
        // console.log(result.data.access_token)
        localStorage.access_token = result.data.access_token
        this.user.email = ""
        this.user.password = ""
        this.isLoggedIn = true

      })
      .catch(error => {
        console.log(error)
      })
    },
    getTasks(){
      axios.get(`http://localhost:3000/tasks`)
      .then(result => {
        this.tasks = result.data
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
    // this.reassignTasks()
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