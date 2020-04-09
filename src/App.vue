<template>
  <div id="app">


    <!-- LOGIN PAGE -->
    <LoginPage 
      v-show="!token"
      @onSignInSuccess="onSignInSuccess"
      @login="login"
      @register="register"
      ></LoginPage>

      <!-- <MainPage
        v-show="token"
        @logout="logout"
        @addProject="addProject"
        @dropProject="dropProject"
        @fillInvitation="fillInvitation"
        @inviteMember="inviteMember"
        @addNewTask="addNewTask"
        @showTasks="showTasks"
        @fillAddTaskForm="fillAddTaskForm"
        @showEditTaskForm="showEditTaskForm"
        @editTask="editTask"
        >
      </MainPage> -->
      
      <div id="pg-main" v-show="token">
      <h1>HOLA, MUNDO!</h1>

      <button @click="logout()">LOGOUT</button>

      <div id="home">
        <h1>WELCOME TO KANBAN HOMEPAGE</h1>
      </div>

      <div class="dashboard">
        <div class="board-projects">
          <form id="form-add-project" @submit.prevent="addProject()">
            Title:
            <input type="text" required id="add-project-title" v-model="projectTitle" />
            <input type="submit" value="ADD PROJECT" />
          </form>

          <form id="form-invitation" @submit.prevent="inviteMember()">
            Email:
            <input type="email" required id="invitee-email" v-model="invitee" />
            ProjectID:
            <input
              type="text"
              readonly
              id="invitee-projectid"
              v-model="projectId"
            />
            <input type="submit" value="INVITE" />
          </form>

          <form id="form-add-task" @submit.prevent="addNewTask()">
            ProjectID:
            <input type="text" readonly id="add-task-projectid" v-model="projectId" />
            Title:
            <input type="text" required id="add-task-title" v-model="title" />

            <input type="submit" value="ADD NEW TASK" />
          </form>

          <div class="list-projects" v-for="project in projects" :key="project.id">
            <h4>HELLO, IT;S ME</h4>
            <p>MY ID: {{ project.UserId }}</p>
            <p>PROJECT ID: {{ project.ProjectId }}</p>
            <p>PROJECT NAME: {{ project.Project.title }}</p>
            <button @click.prevent="showTasks(project.ProjectId)">SHOW TASKS</button>
            <button @click.prevent="fillAddTaskForm(project.ProjectId)">ADD TASK</button>
            <button @click.prevent="fillInvitation(project.ProjectId)">Invite</button>
            <button @click.prevent="dropProject(project.ProjectId)">DROP</button>
          </div>
          <div class="board-tasks">
            <div id="pg-editTaskForm">
              <form id="form-editTask" @submit.prevent="editTask()">
                ProjectID:
                <input type="text" readonly id="edit-task-project-id" v-model="projectId" />
                <br />
                TaskID:
                <input type="text" readonly id="edit-task-id" v-model="taskId" />
                <br />
                Title:
                <input type="text" required id="edit-task-title" v-model="title" />
                <br />Category:
                <select class="task-category" v-model="category">
                  <option value="backlog">BACKLOG</option>
                  <option value="pending">PENDING</option>
                  <option value="review">REVIEW</option>
                  <option value="done">DONE</option>
                </select>
                <input type="submit" value="UPDATE">
              </form>
            </div>
            <div class="subboard1">
              BACKLOG
              <div v-for="(task, idx) in backlogs" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>

            <div class="subboard2">
              PENDING
              <div v-for="(task, idx) in pendings" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                </p>
                <p>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>

            <div class="subboard3">
              REVIEW
              <div v-for="(task, idx) in reviews" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                </p>
                <p>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>

            <div class="subboard4">
              DONE
              <div v-for="(task, idx) in dones" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                </p>
                <p>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import socket from "./config/socket";
import axios from "./config/api";
import LoginPage from "./views/LoginPage"
// import MainPage from "./views/MainPage"
export default {
  name: "App",
  components :{
    LoginPage
    // MainPage
  },
  data() {
    return {
      isConnected: false,
      token: "",
      projects: [],
      backlogs: [],
      pendings: [],
      reviews: [],
      dones: [],
      projectTitle: "",
      invitee: "",
      projectId: 0,
      taskId: 0,
      userId: 0,
      title: "",
      category: "",
      tpid: 0,
      user: ""
    };
  },
  methods: {
    connected() {
      isConnected = true;
    },
    test() {
      axios({
        method: "get",
        url: "/"
      })
        .then(data => {
          socket.emit("test", {
            message: "HI FROM CLIENT"
          });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    register(payload) {
      console.log("REGISTER FROM CLIENT");
      console.log(payload);

      axios({
        method: "POST",
        url: "/users/register",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          console.log("WELCOME NEW USER!");
          socket.emit("registered", response);
        })
        .catch(err => {
          console.log(err);
          let arr = err.responseJSON.errors
          arr.forEach(el => {
            this.$toasted.error(el)
          })
        });
    },
    login(payload) {
      console.log("LOGIN FROM CLIENT");
      console.log(payload);

      axios({
        method: "POST",
        url: "/users/login",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          console.log("WELCOME BACK, USER!");
          localStorage.setItem("access_token", response.data.access_token);
          this.token = response.data.access_token;
          this.user =  response.data.email
          // this.$toasted.success(`Welcome Back, ${response.data.email}`);
          socket.emit("loggedin", response);
          this.fetchProjects();
          socket.on("loggedin2", response => {
            let wlcm = "HELLO AGAIN, " + response;
            this.$toasted.success(wlcm);
            console.log(wlcm);
          });
          
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    logout() {
      console.log("LOGGINGOUT");
      localStorage.clear();
      socket.emit("loggedout", this.user);
      this.token = "";
      this.user = ""
      socket.on('loggedout2', (payload) => {
        console.log(`${payload} HAS LOGGED OUT`)
        this.$toasted.show(`${payload} LOGGED OUT`)
      })
      
      this.$toasted.show("UNTIL NEXT TIME!");
    },
    onSignInSuccess(id_token) {
     
      axios({
        method: "POST",
        url: "/users/googleLogin",
        headers: {
          access_token: id_token
        }
      })
        .then(response => {
          console.log("SUCCESS LOGIN FROM GOOGLE");
          console.log(response);
          localStorage.setItem("access_token", response.data.access_token);
          this.token = response.data.access_token;
          this.$toasted.success(`Welcome Back, ${response.data.email}`);
          socket.emit("loggedin", response);
          this.fetchProjects();
          //   socket.on("loggedin2", response => {
          //     let wlcm = "HELLO AGAIN, " + response;
          //     this.$toasted.success(wlcm)
          //   });
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    fetchProjects() {
      console.log("FETCHING PROJECTS");
      axios({
        method: "get",
        url: "/projects",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("WHAT'S PROJECTS?");
          console.log(response.data);
          console.log("any id?");
          console.log(response.data[0].id);
          socket.emit('getProjects', response.data)
          socket.on('getProjects2', (payload) => {
            this.$toasted.success('FETCHING ALL PROJECTS')
            this.projects = payload
          })
          // this.projects = response.data;
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    addProject() {
      console.log("ADDING NEW PROJECT");
      console.log(this.projectTitle);
      axios({
        method: "post",
        url: "/projects",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.projectTitle
        }
      })
        .then(response => {
          console.log("NEW PROJECT ADDED");
          console.log(response.data);
          socket.emit("new_project", response.data);
          this.fetchProjects();
          this.projectTitle = "";
          socket.on('added_project', (payload) => {
            console.log("HELLO NEW PROJECT");
            console.log(payload);
            this.$toasted.success(`USER ${payload.UserId} ADDED NEW PROJECT WITH ID: ${payload.ProjectId}`)
            console.log(`USER ${payload.UserId} ADDED NEW PROJECT WITH ID: ${payload.ProjectId}`);
            
          })
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    fillInvitation(projectid) {
      console.log("FILLING THE PROJECT ID PARAMETER");
      this.projectId = projectid;
    },
    inviteMember() {
      console.log("SANITY CHECK BEFORE INVITE");
      console.log(this.invitee, this.projectId);
      axios({
        method: "post",
        url: "/projects/" + Number(this.projectId) + "/invite",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          email: this.invitee
        }
      })
        .then(response => {
          console.log("NEW MEMBER INVITED");
          console.log(response.data);
          socket.emit("new_member", response.data);
          // this.$toasted.success("MEMBER INVITED");
          this.projectId = 0;
          this.invitee = "";
          socket.on('new_member2', (payload) => {
            let ms = `User ${payload.UserId} has been added to Project ${payload.ProjectId}`
            console.log(ms);
            this.$toasted.success(ms)
            this.fetchProjects()
          })
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    dropProject(projectid) {
      console.log("DELETE ONE");
      console.log(projectid);
      axios({
        method: "delete",
        url: "/projects/" + projectid,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("PROJCT DROPPED");
          console.log(response.data);
          socket.emit("project_deleted", response.data);
          socket.on('droppedProject', (msg) => {
            this.$toasted.show(msg)
            console.log(msg);
            this.fetchProjects();
          })
          
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    showTasks(projectid) {
      console.log("SHOWING ALL TASKS OF DAT PROJECT");
      console.log(projectid);
      axios({
        method: "get",
        url: "/projects/" + projectid + "/tasks",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("WHAT'S DAT PROJECTS' TASKS?");
          console.log(response.data)
          this.projectId = response.data.ProjectId
          socket.emit('getTasks', response.data)
          socket.on('getTasks2', (payload) => {
            this.$toasted.success('FETCHING TASKS OF A PROJECT')
            this.backlogs = payload["backlog"]; 
            this.pendings = payload["pending"];
            this.reviews = payload["review"];
            this.dones = payload["done"];
          })
           //for watcher
          // this.backlogs = response.data["backlog"]; 
          // this.pendings = response.data["pending"];
          // this.reviews = response.data["review"];
          // this.dones = response.data["done"];
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    fillAddTaskForm(projectid) {
      console.log("FILLING THE PROJECT ID PARAMETER 2 ADD TASK");
      this.projectId = Number(projectid);
    },
    addNewTask() {
      console.log("ADDING NEW TASK");
      console.log(this.title, this.projectId);
      axios({
        method: "post",
        url: "/projects/" + Number(this.projectId) + "/tasks",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.title
        }
      })
        .then(response => {
          console.log("NEW TASK ADDED");
          console.log(response.data);
          this.title = "";
          socket.emit("new_task", response.data);
          // this.$toasted.success("TASK ADDED");
          // console.log("WHAT'S ID?");
          // console.log(response.data.id);
          socket.on('added_task', (payload) => {
            this.$toasted.success(`Task ${payload.title} has been added.`)
            
            this.showTasks(payload.ProjectId);
          })
          // this.showTasks(response.data.ProjectId);
          
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    showEditTaskForm(taskid, projectid) {
      console.log("FILLING THE DETAILS OF TASK WE'RE ABT UPDATING");
      console.log(taskid, projectid);
      axios({
        method: "get",
        url: "/projects/" + projectid + "/tasks/" + taskid,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log("FOUND'EM, NOW POPULATING");
        console.log(response.data);
        this.projectId = response.data.ProjectId
        this.taskId = response.data.id
        this.title = response.data.title,
        this.category = response.data.category
      })
      .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    },
    editTask() {  
      console.log("NOW EDITING TASK");
      console.log([this.title, this.category, this.taskId, this.projectId]);
      axios({
        method: 'put',
        url: '/projects/' + this.projectId + '/tasks/' + this.taskId,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.title,
          category: this.category
        }
      })
      .then(response => {
        console.log("UPDATE SUCCESS");
        // console.log(response.data);
        socket.emit('task_update', response.data)
        // this.$toasted.success(`${response.data.title} has been updated`)
        socket.on('updated_task', (payload) => {
          this.$toasted.success(`${payload.title} has been updated`)
          this.showTasks(payload.ProjectId)
          console.log(`${payload.title} has been updated`);
        })
        // this.showTasks(response.data.ProjectId)
      })
      .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });

    },
    deleteTask(taskid, projectid) {
      console.log("DELETE ONE TASK");
      console.log(taskid);
      console.log(projectid);

      axios({
        method: "delete",
        url: "/projects/" + projectid + "/tasks/" + taskid,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("TASK DROPPED");
          console.log(response.data);
          socket.emit("task_deleted", response.data);
          socket.on('deleted_task', (msg) => {
            console.log("PROJECT HAS BEEN DROPPED");
            this.$toasted.success(msg)
            this.showTasks(projectid);
            this.fetchProjects()
          })
          // this.showTasks(projectid);
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors
          let code = err.response.status
          let type = err.response.statusText
          let ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
          
        });
    }
  },
  watch: {
    // projectTitle() {
    //   this.fetchProjects()
    // },
    // backlogs() {
    //   this.showTasks(this.projectId)
    // },
    // pendings() {
    //   this.showTasks(this.projectId)
    // },
    // reviews() {
    //   this.showTasks(this.projectId)
    // },
    // dones() {
    //   this.showTasks(this.projectId)
    // }

  },
  created() {
    // console.log(io);
    // io.on('success', (msg) => {
    //     this.$toasted.show(msg.message)
    // })
    this.test();
    // this.fetchProjects()
  }
};
</script>

<style>
</style>