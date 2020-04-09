<template>
  <div>
    <!-- dont disturb -->

    <!-- === LOGIN FORM === -->
    <div class="row" v-if="!isLogin">
      <div class="col-md-4 offset-md-4">
        <form @submit.prevent="login">
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
              >We'll never share your email with anyone else.</small
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
      </div>
    </div>
    <!-- ===END OF LOGIN FORM=== -->

    <!-- === MAIN PAGE === -->
    <div v-else>
      <div class="container">
        <div class="row">
          <button @click="logout" type="button" class="btn btn-danger">
            Logout
          </button>
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
                        <p class="card-text">Write your task here</p> -->

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
                  <a href="#" class="card-link"
                    ><button class="btn btn-secondary">Cancel</button></a
                  >
                  <a href="#" class="card-link"
                    ><button type="submit" class="btn btn-dark">
                      Add
                    </button></a
                  >
                </div>
              </form>
            </div>
          </div>
          <!-- End of main card -->

          <div class="card bg-primary" v-for="task in tasks" :key="task.id">
            <div class="card-body">
              <h4 class="card-title">Prelog</h4>
              <p class="card-text">{{ task.title }}</p>
              <a href="#" class="card-link"
                ><button @click="cancelTask" class="btn btn-secondary">
                  Undo
                </button></a
              >
              <a href="#" class="card-link"
                ><button @click="addTodo" class="btn btn-dark">
                  Next
                </button></a
              >
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
                </div> -->
          <!-- End of main card -->
          <div class="card bg-warning" v-if="todo.task">
            <div class="card-body">
              <h4 class="card-title">Todo</h4>
              <p class="card-text">{{ todo.task }}</p>
              <a href="#" class="card-link"
                ><button @click="cancelTodo" class="btn btn-secondary">
                  Undo
                </button></a
              >
              <a href="#" class="card-link"
                ><button @click="addProcess" class="btn btn-dark">
                  Next
                </button></a
              >
            </div>
          </div>
        </div>

        <!-- End Of Colum 2 -->

        <!-- Column 3 -->
        <div class="col">
          <!-- main card -->
          <div class="card">
            <div class="card-body">
              <!-- <h4 class="card-title">Card title</h4>
                        <p class="card-text">Some example text. Some example text.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a> -->
            </div>
          </div>
          <!-- End of Main Card -->
          <div class="card bg-info" v-if="process.task">
            <div class="card-body">
              <h4 class="card-title">Process</h4>
              <p class="card-text">{{ process.task }}</p>
              <a href="#" class="card-link"
                ><button @click="cancelProcess" class="btn btn-secondary">
                  Undo
                </button></a
              >
              <a href="#" class="card-link"
                ><button @click="addComplete" class="btn btn-dark">
                  Done
                </button></a
              >
            </div>
          </div>
        </div>
        <!-- End of Column 3 -->

        <!-- Column 4 -->
        <div class="col">
          <!-- main card -->
          <!-- <div class="card"> -->
          <!-- <div class="card-body">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">Some example text. Some example text.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div> -->
          <!-- </div> -->
          <!-- End of main card -->

          <div class="card bg-success" v-if="completed.task">
            <div class="card-body">
              <h4 class="card-title">Complete</h4>
              <p class="card-text">{{ completed.task }}</p>
              <a href="#" class="card-link"
                ><button @click="cancelComplete" class="btn btn-secondary">
                  Undo
                </button></a
              >
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
      user: {
        email: "",
        password: "",
        currentProject: "",
        task: "",
      },
      projects: [],
      tasks: [],
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
    login() {
      axios
        .post("http://localhost:3000/login", {
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
          //   this.getTasks()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProject() {
      axios({
        method: "post",
        url: "http://localhost:3000/projects",
        data: {
          title: this.user.currentProject,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data.id);
          localStorage.setItem("ProjectId", data.id);
          this.user.console = "";
        })
        .catch((err) => console.log(err));
    },
    getProjects() {
      //bisa juga untuk manggil tasks
      axios
        .get("http://localhost:3000/projects", {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then((result) => {
          const { data } = result;
          const { projects } = data;
          this.projects = projects;
        //   console.log("YA", projects);
          projects.filter((project) => {
            if (project.ProjectId === 12) {
              this.tasks = project.Project.Tasks;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
      this.projects = [];
    },
    addTask() {
      axios({
        method: "post",
        url: "http://localhost:3000/tasks",
        data: {
          title: this.user.task,
          ProjectId: localStorage.ProjectId,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.prelog.task = this.user.task;
          this.user.task = "";
        })
        .catch((err) => console.log(err));
    },
    addTodo() {},
    cancelTask() {},
    getTasks() {
      axios
        .get("http://localhost:3000/tasks", {
          headers: {
            access_token: localStorage.access_token,
            ProjectId: localStorage.ProjectId,
          },
        })
        .then((result) => {
          const { data } = result;
          //   const { tasks } = data; /
          console.log("INI", data);
          //   this.tasks = projects;
          //   console.log(projects);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
      this.getProjects();
      //   if (localStorage.ProjectId) {
      // this.getTasks();
      //   }
    } else {
      this.isLogin = false;
      this.projects = [];
    }
  },
};
</script>

<style></style>
