<template>
  <div id="main-board">
    <h5>{{ category }}</h5>
    <div id="board">
      <!-- card -->
      <Card
        v-for="task in filtered"
        :key="task.id"
        :task="task"
        :category="category"
        @fetch="fetch"
        @moveLeft="moveLeft"
        @moveRight="moveRight"
      ></Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./Card";
export default {
  name: "Board",
  props: ["boardNames", "task"],
  components: {
    Card
  },
  data() {
    return {
      category: ""
    };
  },
  methods: {
    fetch: function() {
      this.$emit("fetch");
    },

    moveLeft: function(data) {
      let newCategory;
      if (data.category == "Production") {
        newCategory = "Backlog";
      } else if (data.category == "Development") {
        newCategory = "Production";
      } else if (data.category == "Done") {
        newCategory = "Development";
      } else if (data.category == "Canceled") {
        newCategory = "Done";
      }
      axios({
        method: "PATCH",
        url: `http://localhost:3000/task/${data.id}`,
        data: {
          category: newCategory
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(updatedTask => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
        });
    },

    moveRight: function(data) {
      let newCategory;
      if (data.category == "Backlog") {
        newCategory = "Production";
      } else if (data.category == "Production") {
        newCategory = "Development";
      } else if (data.category == "Development") {
        newCategory = "Done";
      } else if (data.category == "Done") {
        newCategory = "Canceled";
      }
      axios({
        method: "PATCH",
        url: `http://localhost:3000/task/${data.id}`,
        data: {
          category: newCategory
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(updatedTask => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.boardNames == "Backlog") {
      this.category = "Backlog";
    } else if (this.boardNames == "Production") {
      this.category = "Production";
    } else if (this.boardNames == "Development") {
      this.category = "Development";
    } else if (this.boardNames == "Canceled") {
      this.category = "Canceled";
    } else if (this.boardNames == "Done") {
      this.category = "Done";
    }
    this.fetch();
  },
  computed: {
    filtered: function() {
      return this.task.filter(task => task.category === this.category);
    }
  }
};
</script>

<style>
</style>