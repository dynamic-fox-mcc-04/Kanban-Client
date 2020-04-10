<template>
  <div id="main-page">
    <Sidebar
      :task="task"
      :taskNumber="taskNumber"
      :closedTask="closedTask"
      :userName="userName"
      :userEmail="userEmail"
      @fetch="fetchTask"
    ></Sidebar>
    <div id="content">
      <Board
        v-for="(board, index) in boards"
        :key="index"
        :boardNames="board"
        :task="task"
        @fetch="fetchTask"
      ></Board>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Board from './Board'
import Sidebar from './Sidebar'
export default {
  name: "MainPage",
  components: {
    Board,
    Sidebar
  },
  data() {
    return {
      boards: ['Backlog', 'Production', 'Development', 'Done', 'Canceled'],
      task: [],
      userName: "",
      userEmail: "",
      taskNumber: '',
      closedTask: ""
    }
  },
  methods: {
    fetchTask: function() {
      axios({
        method: 'GET',
        url: 'https://radiant-hollows-48189.herokuapp.com/task',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.task = data;
          this.taskNumber = data.length
          this.closedCount()
        })
        .catch(err => {
          console.log(err);
        });
    },
    closedCount: function() {
      let canceledTask = this.task.filter(task => task.category === "Canceled");
      return (this.closedTask = canceledTask.length);
    },
    getName: function() {
      return this.userName = localStorage.getItem('name')
    },
    getEmail: function() {
      return this.userEmail = localStorage.getItem('email')
    }
  },
  created() {
    this.getName(),
    this.getEmail()
  }
};
</script>

<style>
</style>