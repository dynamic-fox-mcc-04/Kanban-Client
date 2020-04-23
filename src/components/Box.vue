<template>
  <!-- START TASKBOARD -->
  <div class="cardbox">

    <!-- TASK CARD START -->
    <Card
      v-for="(task, idx) in sortedTasks"
      :key="idx"
      :unitTask="task"
      @editTask4="editTask3"
      @deleteTask4="deleteTask3">

    </Card>
    <!-- TASK CARD END -->
    
  </div>
  <!-- END TASKBOARD -->
</template>

<script>
import Card from "./Card";
export default {
  name: "Box",
  components: { Card },
  props: ["type", "sortedTasks"],
  data() {
    return {};
  },
  methods: {
    editTask3(payload) {
      console.log("EDIT TASK @ CARD BOX ---->");
      this.$emit('editTask3', payload)
    },
    deleteTask3(payload) {
      console.log("DELETE PROJECT'S TASK FROM CARD BOX ---->");
      this.$emit("deleteTask3", payload);
    }
  }
};
</script>

<style>
  .cardbox {
    padding: 1vh;
    margin: 1vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
</style>