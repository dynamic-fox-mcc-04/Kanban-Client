<template>
  <div>
    <!-- dont disturb -->

    <!-- === REGISTER FORM === -->
    <div class="row" v-if="!isRegister && !isLogin">
      <div class="col-md-4 offset-md-4">
        <form @submit.prevent="register">
          <h3>Please Register</h3>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="user.email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else outside
              organization.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="user.password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          <button @click="backToLogin" class="btn btn-info">Back</button>
        </form>
      </div>
    </div>
    <!-- ===END OF REGISTER FORM=== -->

    <!-- === LOGIN FORM === -->
    <div class="row" v-if="!isLogin && isRegister">
      <div class="col-md-4 offset-md-4">
        <form @submit.prevent="login">
          <h3>Login first!</h3>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="user.email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else outside
              organization.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="user.password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <label>Don't Have an Account?</label>
        <button @click="registerForm">Register</button>
      </div>
    </div>
    <!-- ===END OF LOGIN FORM=== -->

    <!-- === MAIN PAGE === -->
    <div v-else-if="isLogin">
      <div class="container">
        <div class="row">
          <button @click="logout" type="button" class="btn btn-danger">
            Logout
          </button>
        </div>
        <div class="col col-4">
          <label>Add Contributor</label>
          <form @submit.prevent="addContributor">
            <div>
              <select
                class="form-control form-control-sm"
                v-model="selectedUser"
              >
                <option v-for="user in users" :key="user.id" :value="user.id">{{
                  user.email
                }}</option>
              </select>
            </div>
            <button class="col col-4" type="submit">Select</button>
          </form>
        </div>
        <form @submit.prevent="addProject">
          <div class="form-group row col-5">
            <label for="add-project">Add Project</label>
            <input
              type="text"
              class="form-control"
              id="add-project"
              aria-describedby="addProject"
              v-model="user.currentProject"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <div class="col col-4">
          <form @submit.prevent="setProject">
            <label for="project">Please select the project</label>
            <div>
              <select class="form-control form-control-sm" v-model="selected">
                <option
                  v-for="currentProject in currentProjects"
                  :key="currentProject.ProjectId"
                  :value="currentProject.ProjectId"
                  >{{ currentProject.title }}</option
                >
              </select>
            </div>
            <button class="col col-4" type="submit">Select</button>
          </form>
        </div>
        <!-- end of select project -->
      </div>
      <div class="row" id="first">
        <div class="col col-3" style="background-color: gray;">Prelog</div>
        <div class="col col-3">Todo</div>
        <div class="col col-3" style="background-color: gray;">OnProcess</div>
        <div class="col col-3">Completed</div>
      </div>
      <!-- Row 2 -->
      <div class="row">
        <!-- Column 1 -->
        <div class="col" id="first">
          <!-- Main card -->
          <div class="card" id="first">
            <div class="card-body">
              <!-- <h4 class="card-title">Prelog</h4>
              <p class="card-text">Write your task here</p>-->

              <form @submit.prevent="addTask">
                <label>Add Your New Task</label>
                <input
                  type="text"
                  id="task"
                  placeholder="Write your task here"
                  v-model="user.task"
                  required
                />
                <div class="btn-container">
                  <button class="btn btn-secondary">Cancel</button>

                  <button type="submit" class="btn btn-dark">Add</button>
                </div>
              </form>
            </div>
          </div>
          <!-- End of main card -->

          <div class="card bg-primary" v-for="task in tasks" :key="task.id">
            <div class="card-body" v-if="task.category == 'prelog'">
              <h4 class="card-title">Prelog</h4>
              <p class="card-text">{{ task.title }}</p>
              <!-- <a href="#" class="card-link"> -->
              <button @click="cancelTask(task.id)" class="btn btn-secondary">
                Delete
              </button>
              <!-- </a> -->
              <!-- <a href="#" class="card-link"> -->
              <button @click="addTodo(task.id)" class="btn btn-dark">
                Next
              </button>
              <!-- </a> -->
            </div>
          </div>
        </div>
        <!-- End of Column 1 -->

        <!-- Column 2 -->
        <div class="col" id="second">
          <!-- main card -->
          <!-- <div class="card" id="second">
                    <div class="card-body">
                 
                    </div>
          </div>-->
          <!-- End of main card -->
          <div class="card bg-warning" v-for="task in tasks" :key="task.id">
            <div class="card-body" v-if="task.category == 'todo'">
              <h4 class="card-title">Todo</h4>
              <p class="card-text">{{ task.title }}</p>

              <button @click="cancelTodo(task.id)" class="btn btn-secondary">
                Back
              </button>

              <button @click="addProcess(task.id)" class="btn btn-dark">
                Next
              </button>
            </div>
          </div>
        </div>

        <!-- End Of Colum 2 -->

        <!-- Column 3 -->
        <div class="col">
          <div class="card bg-info" v-for="task in tasks" :key="task.id">
            <div class="card-body" v-if="task.category == 'process'">
              <h4 class="card-title">Process</h4>
              <p class="card-text">{{ task.title }}</p>

              <button @click="cancelProcess(task.id)" class="btn btn-secondary">
                Back
              </button>

              <button @click="addComplete(task.id)" class="btn btn-dark">
                Done
              </button>
            </div>
          </div>
        </div>
        <!-- End of Column 3 -->

        <!-- Column 4 -->
        <div class="col">
          <div class="card bg-success" v-for="task in tasks" :key="task.id">
            <div class="card-body" v-if="task.category == 'complete'">
              <h4 class="card-title">Complete</h4>
              <p class="card-text">{{ task.title }}</p>

              <button
                @click="cancelComplete(task.id)"
                class="btn btn-secondary"
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <!-- End of column 4 -->
      </div>
    </div>

    <!-- ==END MAIN PAGE== -->

    <!-- dont disturb -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      isRegister: true,
      users: [],
      user: {
        email: "",
        password: "",
        currentProject: "",
        task: "",
      },
      selected: "",
      selectedUser: "",
      projects: [],
      tasks: [],
      currentProjects: [],
      // auth2: gapi.auth2.getAuthInstance(),
      //   ga dipake///
      prelog: {
        task: "",
      },
      todo: {
        task: "",
      },
      process: {
        task: "",
      },
      completed: {
        task: "",
      },
      //ga dipake
    };
  },

  methods: {
    backToLogin() {
      this.isRegister = true;
    },

    register() {
      //ok
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/register",
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((result) => {
          const { data } = result;
          // const { access_token } = data;
          // localStorage.setItem("access_token", access_token);
          this.user.email = "";
          this.user.password = "";
          this.isRegister = true;
          // this.getProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registerForm() {
      this.isRegister = false;
    },
    setProject(event) {
      //ok
      event.preventDefault();
      if (localStorage.ProjectId) {
        // event.preventDefault();
        localStorage.ProjectId = this.selected;
        this.selected = "";
        return this.getProjects();
        // this.getCurrentProjects;
        // this.getProjects();
      } else {
        // event.preventDefault();
        localStorage.setItem("ProjectId", this.selected);
        this.selected = "";
        return this.getProjects();
        // this.getProjects();
      }
    },
    addContributor() {
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/contributors",
        data: {
          ProjectId: localStorage.ProjectId,
          UserId: this.selectedUser,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log(result);
          this.getProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      //ok
      axios
        .post("https://evening-stream-54386.herokuapp.com/login", {
          email: this.user.email,
          password: this.user.password,
        })
        .then((result) => {
          const { data } = result;
          const { access_token } = data;
          localStorage.setItem("access_token", access_token);
          this.user.email = "";
          this.user.password = "";
          this.isLogin = true;
          this.getProjects();
          // this.getTasks();
          this.getCurrentProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProject(event) {
      //ok
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/projects",
        data: {
          title: this.user.currentProject,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          // console.log(data.id);
          event.preventDefault();
          localStorage.setItem("ProjectId", data.id);
          this.user.currentProject = "";
          this.getCurrentProjects();
        })
        .catch((err) => console.log(err));
    },
    getProjects() {
      //ok
      //bisa juga untuk manggil tasks
      // event.preventDefault();
      axios
        .get("https://evening-stream-54386.herokuapp.com/projects", {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then((result) => {
          // event.preventDefault();
          const { data } = result;
          const { projects } = data;
          this.projects = projects;
          // console.log("YA", projects);
          // if (this.currentProjects === 0) {
          // projects.map(project => {
          //   // event.preventDefault()
          //   this.currentProjects.push({
          //     title: project.Project.title,
          //     ProjectId: project.ProjectId
          //   });
          // });
          // }
          projects.filter((project) => {
            if (project.ProjectId == localStorage.ProjectId) {
              this.tasks = project.Project.Tasks;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentProjects() {
      axios
        .get("https://evening-stream-54386.herokuapp.com/projects", {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then((result) => {
          // event.preventDefault();
          this.currentProjects = [];
          const { data } = result;
          const { projects } = data;
          this.projects = projects;
          // console.log("YA", projects);
          // if (this.currentProjects === 0) {
          projects.map((project) => {
            // event.preventDefault()
            this.currentProjects.push({
              title: project.Project.title,
              ProjectId: project.ProjectId,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      //ok
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function() {
      //   console.log("User signed out.");
      // });
      // this.auth2.signOut().then(function() {
      //   console.log("User signed out.");
      // });

      localStorage.clear();
      this.isLogin = false;
      this.projects = [];
      this.tasks = [];
      this.currentProjects = [];
    },
    addTask(event) {
      //ok
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/tasks",
        data: {
          title: this.user.task,
          ProjectId: localStorage.ProjectId,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log(data);
          event.preventDefault();
          this.user.task = "";
          return this.getProjects();
        })
        .catch((err) => console.log("ini", err));
    },
    cancelTask(id) {
      axios({
        method: "delete",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((_) => {
          // event.preventDefault();
          console.log("ok");
          return this.getProjects();
        })
        .catch((err) => console.log(err));
    },

    addTodo(id) {
      // console.log(id);
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "todo",
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log(result);
          this.getProjects();
        })
        .catch((err) => console.log(err));
    },

    cancelTodo(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "prelog",
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log(result);
          this.getProjects();
        })
        .catch((err) => console.log(err));
    },
    addProcess(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "process",
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log("OK", result);
          this.getProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelProcess(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "todo",
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log("OK", result);
          this.getProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addComplete(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "complete",
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log("OK", result);
          this.getProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelComplete(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "process",
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          // console.log("OK", result);
          this.getProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUsers() {
      axios({
        method: "get",
        url: "https://evening-stream-54386.herokuapp.com/users",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.users = data.users;
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //kayaknya gausah dipake
    getTasks() {
      axios
        .get(`https://evening-stream-54386.herokuapp.com/tasks/`, {
          headers: {
            access_token: localStorage.access_token,
            ProjectId: localStorage.ProjectId,
          },
        })
        .then((result) => {
          const { data } = result;
          //   const { tasks } = data; /
          // console.log("INI", data);
          //   this.tasks = projects;
          //   console.log(projects);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSignIn(googleUser) {
      let profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      this.isLogin = true;
      this.getCurrentProjects();
      this.getProjects();

      // let id_token = this.GoogleAuth;
      // this.$gAuth
      //   .getAuthCode()
      //   .then((authCode) => {
      //     //on success
      //     return this.$http.post("https://evening-stream-54386.herokuapp.com/googleSign", {
      //       // code: authCode,
      //       id_token: id_token
      //     });
      //   })
      //   .then((response) => {
      //     //after ajax
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     //on fail do something
      //     console.log(error);
      //   });
      // axios({
      //   method: "POST",
      //   url: "https://evening-stream-54386.herokuapp.com/googleSign",
      //   data: {
      //     id_token,
      //   },
      // })
      //   .then((datum) => {
      //     localStorage.setItem("access_token", datum.access_token);
      //     // localStorage.setItem("email", datum.email);
      //     console.log(datum);
      //     this.isLogin = true;
      //     this.getProjects();
      //     this.getTasks();
      //     // auth();
      //   })
      //   .fail((err) => console.log(err));
    },
  },

  created() {
    if (localStorage.access_token) {
      // event.preventDefault()
      this.isLogin = true;
      this.getUsers();
      this.getCurrentProjects();
      this.getProjects();
      //   if (localStorage.ProjectId) {
      // this.getTasks();
      //   }
    } else {
      this.isLogin = false;
      // if (!localStorage.ProjectId) {
      this.projects = [];
      this.users = [];
      // }
    }
    // if (localStorage.ProjectId) {
    //   localStorage.ProjectId = this.selectedProjectId;
    //   this.getProjects();
    // } else {
    //   localStorage.setItem("ProjectId", this.selectedProjectId);
    //   this.getProjects();
    // }
  },
};
</script>

<style></style>
