<template>
  <div>
    <!-- dont disturb -->
    <!-- <Access @isLogin="!isLogin" @isRegister="!isRegister" /> -->
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
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else outside
              organization.
            </small>
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
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else outside
              organization.
            </small>
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
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
        <button v-google-signin-button="clientId" class="google-signin-button">
          Continue with Google
        </button>
        <br />
        <!-- <ul v-if="githubUser">
          <li v-for="repository in repositories" :key="repository.id">
            <a :href="repository.html_url" target="_blank">{{
              repository.name
            }}</a>
          </li>
        </ul>
        <div v-else>
          <button @click.prevent="connect">Connect to GitHub</button>
        </div>-->
        <label>Don't Have an Account?</label>
        <button @click="registerForm">Register</button>
      </div>
    </div>
    <!-- ===END OF LOGIN FORM=== -->

    <!-- === MAIN PAGE === -->
    <div v-else-if="isLogin">
      <vue-topprogress ref="topProgress"></vue-topprogress>
      <!-- COMPONENT BELOW HEADER -->
      <div class="container topPage">
        <!-- LOGOUT BUTTON -->
        <div class="row logout">
          <button @click="logout" type="button" class="btn btn-danger">
            Logout
          </button>
        </div>
        <!-- END OF LOGOUT BUTTON -->

        <!-- ADDCONTRIBUTOR SELECT FORM -->
        <div class="col col-3">
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
            <button type="submit" class="btn btn-secondary">Select</button>
          </form>
        </div>
        <!-- END OF ADDCONTRIBUTOR -->

        <!-- ADDPROJECT FORM -->
        <form @submit.prevent="addProject" class="col col-3">
          <div class="form-group row col-12">
            <label for="add-project">Add Project</label>
            <input
              type="text"
              class="form-control"
              id="add-project"
              placeholder="write your new project here..."
              aria-describedby="addProject"
              v-model="user.currentProject"
            />
            <button type="submit" class="btn btn-secondary">Submit</button>
          </div>
        </form>
        <!-- END OF ADDPROJECT -->

        <!--  SETPROJECT SELECT FORM -->
        <div class="col col-3">
          <form @submit.prevent="setProject">
            <label for="project">Please select the project</label>
            <div>
              <select id="set" class="form-control form-control-sm" v-model="selected">
                <option
                  v-for="currentProject in currentProjects"
                  :key="currentProject.ProjectId"
                  :value="currentProject.ProjectId"
                  >{{ currentProject.title }}</option
                > 
              </select>
              <button class="btn btn-secondary" type="submit">Select</button>
            </div>
          </form>
        </div>
        <!-- END OF SETPROJECT -->

        <!-- QUITPROJECT SELECT FORM -->
        <div class="col col-3">
          <form @submit.prevent="quitProject">
            <label for="project">Select to quit the project</label>
            <div>
              <select
                class="form-control form-control-sm"
                v-model="projectToQuit"
              >
                <option
                  v-for="currentProject in currentProjects"
                  :key="currentProject.ProjectId"
                  :value="currentProject.ProjectId"
                  >{{ currentProject.title }}</option
                >
              </select>
              <button class="btn btn-secondary" type="submit">Select</button>
            </div>
          </form>
        </div>
        <!-- END OF QUIT PROJECT -->
      </div>
      <!-- END OF COMPONENT BELOW HEADER -->

      <!-- KANBAN BOARD TITLE -->
      <div class="row" id="first">
        <div class="col col-3" style="background-color: gray;">Prelog</div>
        <div class="col col-3">Todo</div>
        <div class="col col-3" style="background-color: gray;">OnProcess</div>
        <div class="col col-3">Completed</div>
      </div>
      <!-- END OF KANBAN BOARD TITLE -->
      <!-- CARD FOR KANBAN -->
      <div class="row" id="card">
        <div class="col col-3" id="first">
          <div class="card" id="first">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <label>Add Your New Task</label>
                <input
                  class="col col-12"
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

          <div class="card bg-primary" v-for="task in tasks" :key="task.id">
            <div class="card-body" v-if="task.category == 'prelog'">
              <h4 class="card-title">Prelog</h4>
              <p class="card-text">{{ task.title }}</p>
              <button @click="cancelTask(task.id)" class="btn btn-secondary">
                Delete
              </button>
              <button @click="addTodo(task.id)" class="btn btn-dark">
                Next
              </button>
            </div>
          </div>
        </div>

        <div class="col col-3" id="second">
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

        <div class="col col-3">
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

        <div class="col col-3">
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
      </div>
      <!-- END OF KANBAN CARD -->
    </div>

    <!-- ==END MAIN PAGE== -->

    <!-- dont disturb -->
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
import { vueTopprogress } from "vue-top-progress";
import Access from "./views/Access";
export default {
  name: "App",
  components: {
    Access,
    vueTopprogress
  },
  data() {
    return {
      clientId:
        "1043279586008-aibiiffrpqe0h9vm1d7gmo9grvte499k.apps.googleusercontent.com",
      isLogin: false,
      isRegister: true,
      users: [],
      user: {
        email: "",
        password: "",
        currentProject: "",
        task: ""
      },
      selected: "",
      selectedUser: "",
      projects: [],
      tasks: [],
      currentProjects: [],
      projectToQuit: ""
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
          password: this.user.password
        }
      })
        .then(result => {
          const { data } = result;
          this.user.email = "";
          this.user.password = "";
          this.isRegister = true;
          this.$alert(`Success register, please login!`);
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    registerForm() {
      this.isRegister = false;
    },
    setProject(event) {
      this.$alert(`Project is choosen!`);
      event.preventDefault();
      if (localStorage.ProjectId) {
        localStorage.ProjectId = this.selected;
        // this.selected = "";
        return this.getProjects();
      } else {
        localStorage.setItem("ProjectId", this.selected);
        // this.selected = "";
        return this.getProjects();
      }
    },
    addContributor() {
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/contributors",
        data: {
          ProjectId: localStorage.ProjectId,
          UserId: this.selectedUser
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const { UserId } = data;
          this.$alert(`Success add contributor with id : ${UserId}`);
          this.getProjects();
          this.selectedUser = "";
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    login() {
      axios
        .post("https://evening-stream-54386.herokuapp.com/login", {
          email: this.user.email,
          password: this.user.password
        })
        .then(result => {
          const { data } = result;
          const { email, access_token } = data;
          localStorage.setItem("access_token", access_token);
          this.user.email = "";
          this.user.password = "";
          this.isLogin = true;
          this.getProjects();
          this.getCurrentProjects();
          this.$alert(`Success login. Welcome ${email}!`);
        })
        .catch(err => {
          this.$alert(`Invalid password/email, please try again!`);
        });
    },
    addProject(event) {
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/projects",
        data: {
          title: this.user.currentProject
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$alert(`Project "${data.title}" added!`);
          event.preventDefault();
          localStorage.setItem("ProjectId", data.id);
          this.user.currentProject = "";
          this.getCurrentProjects();
        })
        .catch(err => this.$alert(err));
    },
    getProjects() {
      axios
        .get("https://evening-stream-54386.herokuapp.com/projects", {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(result => {
          const { data } = result;
          const { projects } = data;
          this.projects = projects;
          this.getUsers();
          projects.filter(project => {
            if (project.ProjectId == localStorage.ProjectId) {
              this.tasks = project.Project.Tasks;
            }
          });
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    getCurrentProjects() {
      axios
        .get("https://evening-stream-54386.herokuapp.com/projects", {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(result => {
          this.currentProjects = [];
          const { data } = result;
          const { projects } = data;
          this.projects = projects;
          projects.map(project => {
            this.currentProjects.push({
              title: project.Project.title,
              ProjectId: project.ProjectId
            });
          });
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
      this.projects = [];
      this.tasks = [];
      this.currentProjects = [];
      this.projectToQuit = "";
      this.$alert(`Thank you for your contribution. Please login next time!`);
    },
    addTask(event) {
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/tasks",
        data: {
          title: this.user.task,
          ProjectId: localStorage.ProjectId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const { title } = data;
          event.preventDefault();
          this.user.task = "";
          this.getProjects();
          this.$alert(
            `Your added "${title}" task, please consider it before continue!`
          );
        })
        .catch(err => this.$alert("ini", err));
    },
    cancelTask(id) {
      axios({
        method: "delete",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(_ => {
          this.$alert("the task deleted!");
          return this.getProjects();
        })
        .catch(err => this.$alert(err));
    },

    addTodo(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "todo"
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.getProjects();
        })
        .catch(err => this.$alert(err));
    },

    cancelTodo(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "prelog"
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.getProjects();
        })
        .catch(err => this.$alert(err));
    },
    addProcess(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "process"
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.getProjects();
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    cancelProcess(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "todo"
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          // this.$alert("OK", result);
          this.getProjects();
        })
        .catch(err => {
          this.$alert(err);
        });
    },

    addComplete(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "complete"
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.$alert("Congrats for finishing the task!");
          this.getProjects();
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    cancelComplete(id) {
      axios({
        method: "put",
        url: `https://evening-stream-54386.herokuapp.com/tasks/${id}`,
        data: {
          category: "process"
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.getProjects();
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    getUsers() {
      axios({
        method: "get",
        url: "https://evening-stream-54386.herokuapp.com/users",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.users = data.users;
        })
        .catch(err => {
          this.$alert(err);
        });
    },

    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
        method: "post",
        url: "https://evening-stream-54386.herokuapp.com/googleSign",
        data: {
          id_token: idToken
        }
      })
        .then(({ data }) => {
          const { email } = data;
          localStorage.setItem("access_token", data.access_token);
          this.getProjects();
          this.isLogin = true;
          this.getCurrentProjects();
          this.$alert(`Success login. Welcome ${email}!`);
        })
        .catch(err => this.$alert("error", err));
    },
    OnGoogleAuthFail(error) {
      this.$alert(error);
    },
    quitProject() {
      axios({
        method: "delete",
        url: "https://evening-stream-54386.herokuapp.com/contributors",
        data: {
          ProjectId: this.projectToQuit
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.getProjects();
          this.getCurrentProjects();
          this.projectToQuit = "";
          this.$alert(`Thanks for your contribution with this project!`);
        })
        .catch(err => {
          this.$alert(err);
        });
    }
  },

  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
      this.getUsers();
      this.getCurrentProjects();
      this.getProjects();
    } else {
      this.isLogin = false;
      this.projects = [];
      this.users = [];
    }
  }
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

/* .row#card {
  background-color: #c35354;
} */
.container.topPage {
  display: flex;
}
.row.logout {
  border: solid 8px;
  height: 50%;
  margin: 0;
}

#set.form-control {
  height: 40px;
}
</style>
