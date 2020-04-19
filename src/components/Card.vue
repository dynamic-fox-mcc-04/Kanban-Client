<template>
  <div class="box">
    <div class="media-content">
      <div class="content">
        <div class="delete-div" v-show="!isTitle">
          <span>{{filterTask.title}}</span>
          <button @click="editForm()">
            <i class="fas fa-edit fa-lg edit"></i>
          </button>
          <button @click="deleteTask(filterTask.id)" class="delete" aria-label="delete"></button>
        </div>
        <div class="delete-div" v-show="isTitle">
          <form @submit.prevent="editTitle()">
            <input type="text" class="input-edit" v-model="editedTitle">
            <button type="submit" role="submit">
              <i class="fas fa-edit fa-lg edit"></i>
            </button>
          </form>
          <button @click="editForm()" class="delete" aria-label="delete"></button>
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
  data: function() {
    return { 
      isTitle : false,
      editedTitle: this.filterTask.title
    }
  },
  props: ["filterTask", "category"],
  methods: {
    getTasks() {
      this.$emit("getTasks");
    },
    deleteTask(taskId) {
      axios({
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
    editForm() {
      this.isTitle = !this.isTitle;
    },
    editTitle() {
      let id = this.filterTask.id;
      console.log(id);
      axios({
        url: `https://kanbanhacktiv8.herokuapp.com/task/update/${id}`,
        method: "put",
        data: {
          title: this.editedTitle
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        console.log(this.editedTitle.title)
        this.$toasted.info(`You have successfully edit a task`);
        this.editForm()
        this.getTasks();
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