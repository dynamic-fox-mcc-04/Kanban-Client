<template>
  <div id="pg-main" v-show="token1">
    

    <!-- START NAVBAR -->
    <Navbar
      :projects2="projects1"
      @logout2="logout1"
      @addProject2="addProject1"
      @inviteMember2="inviteMember1"
      @addNewTask2="addNewTask1"
      @dropProject2="dropProject1"
      @showTasks2="showTasks1"
    ></Navbar>
    <!-- END NAVBAR -->

    <h1>WELCOME TO KANBAN HOMEPAGE</h1>

    <!-- START DASHBOARD -->
      <Dashboard
        :tasks2="tasks1"
        :categories2="categories1"
        @editTask2="editTask1"
        @deleteTask2="deleteTask1">
      </Dashboard>

    
</template>

<script>
import Navbar from "../components/Navbar";
import Dashboard from '../components/Dashboard'
export default {
  name: "MainPage",
  components: {
    Navbar, 
    Dashboard
  },
  props: ["token1", 
  "projects1", 
  "tasks1", 
  "categories1",
  "taskDetails1"],
  data() {
    return {
      taskId: 0,
      projectId: 0,
      projectTitle: "",
      title: "",
      invitee: ""
    };
  },
  methods: {
    logout1(msg) {
      console.log(msg);
      this.$emit("logout1", "LOGGING OUT -->");
    },
    addProject1(payload) {
      // const title = this.projectTitle
      console.log("ADD PROJECT @ MAINPAGE -->");
      this.$emit("addProject1", payload);
    },
    inviteMember1(payload) {
      console.log("INVITE MEMBER @ MAINPAGE -->");
      this.$emit("inviteMember1", payload);
    },
    addNewTask1(payload) {
      console.log("ADD NEW TASK @ MAINPAGE -->");
      this.$emit('addNewTask1', payload)
    },
    dropProject1(payload) {
      console.log("DROP PROJECT @ MAINPAGE -->");
      this.$emit('dropProject1', payload)
    },
    showTasks1(payload) {
      console.log("SHOW PROJECT'S TASKS @ MAINPAGE -->");
      this.$emit('showTasks1', payload)
    },
    showTaskEditForm1(payload) {
      console.log("SHOW PROJECT'S TASK EDIT FORM @ MAINPAGE -->");
      console.log(payload);
      this.$emit('showTaskEditForm1', payload)
    },
    editTask1(payload) {
      console.log("EDIT PROJECT'S TASK @ MAINPAGE -->");
      this.$emit('editTask1', payload)
    },
    deleteTask1(payload) {
      console.log("DELETE PROJECT'S TASK @ MAINPAGE -->");
      this.$emit('deleteTask1', payload)
    }

  }
};
</script>

<style>
  h1 {
    color: black
  }
</style>