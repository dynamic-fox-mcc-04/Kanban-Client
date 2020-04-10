<template>
  <div class="card">
    <div class="card-body">
      <h6>
        <b>{{ task.title }}</b>
      </h6>
    </div>
    <div id="card-bar">
      <div>
        <i @click="moveLeft(task.id)" class="far fa-arrow-alt-circle-left fa-lg"></i>
      </div>
      <div>
        <i @click="deleteTask(task.id)" class="far fa-trash-alt fa-lg"></i>
      </div>
      <div>
        <i @click="moveRight(task.id)" class="far fa-arrow-alt-circle-right fa-lg"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Card",
  props: ['task', 'category'],
  methods: {
    deleteTask: function(id) {
      axios({
        method: "DELETE",
        url: `https://radiant-hollows-48189.herokuapp.com/task/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(_ => {
          this.$emit('fetch')
        })
        .catch((err) => {
          console.log(err);
        })
    },

    moveLeft: function(id) {
      let taskId = id
      let data = {
        id: taskId,
        category: this.category
      }
      this.$emit('moveLeft', data)
    },

    moveRight: function(id) {
      let taskId = id
      let data = {
        id: taskId,
        category: this.category
      }
      this.$emit('moveRight', data)
    }
  }
};
</script>

<style>
</style>