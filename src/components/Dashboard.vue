<template>
  <div id="pg-dashboard">
    <!-- CARD BOXES START -->
    <Box
      class="bg-box col-sm"
      v-for="(category, idx) in categories2"
      :key="idx"
      :type="category"
      :sortedTasks="tasks2[category]"
      @editTask3="editTask2"
      @deleteTask3="deleteTask2">
    </Box>

    <!-- CARD BOXES END -->
  </div>
</template>
<script>
import Box from "./Box";
export default {
  name: "Dashboard",
  components: {
    Box
  },
  props: ["tasks2", "categories2"],
  data() {
    return {};
  },
  methods: {
    editTask2(payload) {
      console.log("EDIT TASK @ DASHBOARD --->");
      this.$emit("editTask2", payload);
    },
    deleteTask2(payload) {
      console.log("DELETE PROJECT'S TASK @ DASHBOARD --->");
      this.$emit("deleteTask2", payload);
    }
  }
};
</script>

<style>
.bg-box {
  color: white;
}
.bg-box:nth-child(1) {
  background-color: red;
}
.bg-box:nth-child(2) {
  background-color: green;
}
.bg-box:nth-child(3) {
  background-color: orange;
}
.bg-box:nth-child(4) {
  background-color: blue;
}
</style>