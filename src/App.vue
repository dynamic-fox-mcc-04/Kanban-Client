<template>
  <div id="app">
    <!-- LOGIN PAGE -->
    <LoginPage
      :token1="token"
      v-show="!token"
      @onSignInSuccess="onSignInSuccess"
      @login="login"
      @register="register"
    ></LoginPage>

    <MainPage
      :token1="token"
      :projects1="projects"
      :categories1="categories"
      :tasks1="tasks"
      :taskDetails1="taskDetails"
      :members1="members"
      v-show="token"
      @logout1="logout"
      @addProject1="addProject"
      @dropProject1="dropProject"
      @enterProject1="enterProject"
      @inviteMember1="inviteMember"
      @fireMember1="fireMember"
      @addNewTask1="addNewTask"
      @showTasks1="showTasks"
      @editTask1="editTask"
      @deleteTask1="deleteTask"
    ></MainPage>
  </div>
</template>
<script>
import socket from "./config/socket";
import axios from "./config/api";
import LoginPage from "./views/LoginPage";
import MainPage from "./views/MainPage";
export default {
  name: "App",
  components: {
    LoginPage,
    MainPage
  },
  data() {
    return {
      isConnected: false,
      token: "",
      tasks: {},
      projects: [],
      taskDetails: {},
      projectTitle: "",
      project: {},
      projectId: 0,
      taskId: 0,
      userId: 0,
      title: "",
      category: "",
      categories: ["backlog", "pending", "review", "done"],
      tpid: 0,
      user: "",
      members: [],
      room: ''
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
          let arr = err.responseJSON.errors;
          arr.forEach(el => {
            this.$toasted.error(el);
          });
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
          this.user = response.data.email;
          // this.$toasted.success(`Welcome Back, ${response.data.email}`);
          socket.emit("loggedin", response);

          socket.on("loggedin2", response => {
            let wlcm = "HELLO AGAIN, " + response;
            this.$toasted.success(wlcm);
            console.log(wlcm);
            this.fetchProjects();
          });
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    logout(payload) {
      console.log(payload);
      localStorage.clear();
      socket.emit("loggedout", this.user);
      this.token = "";
      this.user = "";
      socket.on("loggedout2", payload => {
        console.log(`${payload} HAS LOGGED OUT`);
        this.$toasted.show(`${payload} LOGGED OUT`);
      });

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
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
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
          // console.log(response.data[0].id);
          // socket.emit("getProjects", response.data);
          // socket.on("getProjects2", payload => {
          //     this.$toasted.success("FETCHING ALL PROJECTS");
          //     this.projects = payload;
          //   });

          this.projects = response.data;
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    addProject(payload) {
      console.log("ADDING NEW PROJECT");
      console.log(payload);
      axios({
        method: "post",
        url: "/projects",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: payload
        }
      })
        .then(response => {
          console.log("NEW PROJECT ADDED");
          console.log(response.data);
          socket.emit("new_project", response.data);
          // this.fetchProjects();
          this.projectTitle = "";
          socket.on("added_project", payload => {
            console.log("HELLO NEW PROJECT");
            console.log(payload);
            this.$toasted.success(
              `USER ${payload.UserId} ADDED NEW PROJECT WITH ID: ${payload.ProjectId}`
            );
            console.log(
              `USER ${payload.UserId} ADDED NEW PROJECT WITH ID: ${payload.ProjectId}`
            );
            this.fetchProjects();
          });
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    enterProject(payload) {
      console.log("ENTER PROJECT @ APP.VUE");
      console.log(payload);
      axios({
        method: "get",
        url: "/projects/" + payload,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("WHAT PROJECT UR IN NOW?");
          console.log(response.data);

          if(response.data) {
            this.project = response.data
            // this.members = response.data.Users
            
            socket.emit('join', response.data)
           
            this.fetchMembers(response.data.id)
            this.$toasted.success(`ENTERING PROJECT# ${response.data.id}: ${response.data.title}`)
          } 
         
          // this.fetchMembers()
          // this.showTasks(payload)

        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    fetchMembers(payload) {
      console.log("FETCH PROJECT MEMBERS @ APP.VUE");
      console.log(payload);
      axios({
        method: "get",
        url: "/projects/" + payload + '/members',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("WHO ARE MEMBERS?");
          console.log(response.data);

          if(response.data) {
            this.members = response.data
            console.log("members r");
            console.log(this.members);
          } else {
            this.members = []
          }

        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    // fillInvitation(projectid) {
    //   console.log("FILLING THE PROJECT ID PARAMETER");
    //   this.projectId = projectid;
    // },
    inviteMember(payload) {
      console.log("SANITY CHECK BEFORE INVITE");
      console.log(payload.invitee, payload.projectId);
      axios({
        method: "post",
        url: "/projects/" + payload.projectId + "/invite",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          email: payload.invitee
        }
      })
        .then(response => {
          console.log("NEW MEMBER INVITED");
          console.log(response.data);
          socket.emit("new_member", response.data);
          // this.$toasted.success("MEMBER INVITED");
          this.projectId = 0;
          this.invitee = "";
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    fireMember(payload) {
      console.log("SANITY CHECK BEFORE FIRE @ APP");
      console.log(payload.member, payload.projectId);
      this.projectId = payload.projectId
      axios({
        method: "delete",
        url: "/projects/" + this.projectId + "/fire",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          member_email: payload.member
        }
      })
        .then(response => {
          console.log("NEW MEMBER INVITED");
          console.log(response.data.message);
          socket.emit("member_fired", {
            msg: response.data.message,
            pid: this.projectId
          });
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    dropProject(payload) {
      console.log("DELETE ONE");
      console.log(payload);
      axios({
        method: "delete",
        url: "/projects/" + payload,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("PROJCT DROPPED");
          console.log(response.data);
          socket.emit("project_deleted", response.data);
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    showTasks(payload) {
      console.log("SHOWING ALL TASKS OF DAT PROJECT");
      console.log(payload);
      axios({
        method: "get",
        url: "/projects/" + payload + "/tasks",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("WHAT'S DAT PROJECTS' TASKS?");
          console.log(response.data);
          this.projectId = response.data.ProjectId;
          this.tasks = response.data;
          // socket.emit("getTasks", response.data);
          // socket.on("getTasks2", payload => {
          //   this.$toasted.success("FETCHING TASKS OF A PROJECT");

          // });
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    fillAddTaskForm(projectid) {
      console.log("FILLING THE PROJECT ID PARAMETER 2 ADD TASK");
      this.projectId = Number(projectid);
    },
    addNewTask(payload) {
      console.log("ADDING NEW TASK");
      console.log(payload.title, payload.projectId);
      axios({
        method: "post",
        url: "/projects/" + payload.projectId + "/tasks",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: payload.title
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

          // this.showTasks(response.data.ProjectId);
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    showEditTaskForm(payload) {
      console.log("FILLING THE DETAILS OF TASK WE'RE ABT UPDATING");
      console.log(payload);
      axios({
        method: "get",
        url: "/projects/" + payload.projectId + "/tasks/" + payload.taskId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log("FOUND'EM, NOW POPULATING");
          console.log(response.data);
          this.taskDetails = response.data;
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    editTask(payload) {
      console.log("NOW EDITING TASK");
      console.log(payload);
      axios({
        method: "put",
        url: "/projects/" + payload.projectId + "/tasks/" + payload.taskId,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: payload.title,
          category: payload.category
        }
      })
        .then(response => {
          console.log("UPDATE SUCCESS");
          // console.log(response.data);
          socket.emit("task_update", response.data);
          // this.$toasted.success(`${response.data.title} has been updated`)

          // this.showTasks(response.data.ProjectId)
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    },
    deleteTask(payload) {
      console.log("DELETE ONE TASK @ APP.VUE");
      console.log(payload);
      this.projectId = payload.projectId
      var pid = this.projectId
      axios({
        method: "delete",
        url: "/projects/" + payload.projectId + "/tasks/" + payload.taskId,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("TASK DROPPED");
          console.log(response.data);
          socket.emit("task_deleted", {
            msg: response.data,
            pid: pid
          });
          // this.showTasks(projectid);
        })
        .catch(err => {
          console.log(err.response);
          let arr = err.response.data.errors;
          let code = err.response.status;
          let type = err.response.statusText;
          let ct = code + " " + type;
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`);
          });
        });
    }
  },
  watch: {},
  created() {
    // console.log(io);
    // io.on('success', (msg) => {
    //     this.$toasted.show(msg.message)
    // })
    this.test();
    // this.fetchProjects()
    socket.on('join2', payload => {
      this.$toasted.success(`NOW ENTERING ROOM ${payload}`)
      this.room = payload
    })
    socket.on("new_member2", payload => {
      let ms = `User ${payload.UserId} has been added to Project ${payload.ProjectId}`;
      console.log(ms);
      this.$toasted.success(ms);
      this.fetchMembers(payload.ProjectId)
      this.fetchProjects();
    });
    socket.on('member_fired2', (payload) => {
      this.$toasted.show(payload.msg)
      console.log(payload.msg);
      this.fetchMembers(payload.pid)
      this.fetchProjects();
    }) 
    socket.on("droppedProject", msg => {
      this.$toasted.show(msg);
      console.log(msg);
      this.fetchProjects();
    });
    socket.on("added_task", payload => {
      this.$toasted.success(`Task ${payload.title} has been added.`);

      this.showTasks(payload.ProjectId);
    });
    socket.on("updated_task", payload => {
      this.$toasted.success(`${payload.title} has been updated`);
      this.showTasks(payload.ProjectId);
      console.log(`${payload.title} has been updated`);
    });
    socket.on("deleted_task", payload => {
      console.log("TASK HAS BEEN DROPPED");
      this.$toasted.success(payload.msg.message);
      this.showTasks(payload.pid);
      // this.fetchProjects()
    });
  }
};
</script>

<style lang="scss">
  
  $def-pad: 2vh;
  $def-margin: 2vh;
  $def-font: 'Courier New', Courier, monospace;
  
  #app {
    justify-content: space-evenly;
    align-content: center;
    font-family: $def-font;
    font-weight: bolder;
    margin: $def-margin;
    padding: $def-pad;

  }

</style>