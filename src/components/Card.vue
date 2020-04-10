<template>
  <div class="box">
    <div class="media-content">
      <div class="content">
        <div class="delete-div">
          <span>{{filterTask.title}}</span>
          <button @click="deleteTask(filterTask.id)" class="delete" aria-label="delete"></button>
        </div>
      </div>
    </div>
    <div class="footer-todo">
      <span>
      </span>
      <span @click="moveLeft(filterTask)">
        <i class="far fa-caret-square-left fa-lg tombol"></i>
      </span>
      <span @click="moveRight(filterTask)">
        <i class="far fa-caret-square-right fa-lg tombol"></i>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Card",
  props: ["filterTask", "category"],
  methods: {
    getTasks() {
      this.$emit("getTasks");
    },
    deleteTask(taskId) {
      axios({
        // url: `http://localhost:3000/task/delete/${taskId}`,
        url: `https://kanbanhacktiv8.herokuapp.com/task/delete/${taskId}`,
        method: "delete",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.$toasted.info(`You have successfully delete a task`);
      });
    },
    moveRight(filterTask) {
      let taskId = filterTask.id;

      let category = "";
      if (filterTask.category == "PRELOG") {
        category = "TODO";
      } else if (filterTask.category == "TODO") {
        category = "ON PROGRESS";
      } else if (filterTask.category == "ON PROGRESS") {
        category = "COMPLETED";
      } else {
        category = "COMPLETED";
      }
      axios({
        // url: `http://localhost:3000/task/update/${taskId}`,
        url: `https://kanbanhacktiv8.herokuapp.com/task/update/${taskId}`,
        method: "put",
        data: {
          category
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.$toasted.info(`You have successfully move task to ${category}`);
      });
    },
    moveLeft(filterTask) {
      let taskId = filterTask.id;
      let category = "";
      if (filterTask.category == "COMPLETED") {
        category = "ON PROGRESS";
      } else if (filterTask.category == "ON PROGRESS") {
        category = "TODO";
      } else if (filterTask.category == "TODO") {
        category = "PRELOG";
      } else {
        category = "PRELOG";
      }

      axios({
        // url: `https"//localhost:3000/task/update/${taskId}`,
        url: `https://kanbanhacktiv8.herokuapp.com/task/update/${taskId}`,
        method: "put",
        data: {
          category
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.$toasted.info(`You have successfully move task to ${category}`);
      });
    }
  }
};
</script>

<style>
</style>