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
      @deleteTask3="deleteTask2"
    ></Box>

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

<style lang="scss">
$def-marpad: 2vh;
$def-align: center;
$ctr-lft: 25%;
$fitter: fit-content;
$brad: 15px;
#pg-dashboard {
  justify-content: $def-align;
  align-items: $def-align;
  border-radius: $brad;

  .bg-box {
    display: flex;
    flex-direction: row;
    color: white;
    padding: $def-marpad auto;
    margin: $def-marpad auto;
    border-radius: $brad;
    flex-wrap: wrap
    
  }
  .bg-box:nth-child(1) {
    background-color: #fdbccf;
  }
  .bg-box:nth-child(2) {
    background-color: #d3c0f9;
  }
  .bg-box:nth-child(3) {
    background-color: #d7e7a9;
  }
  .bg-box:nth-child(4) {
    background-color: #b5ddd1;
  }
}
</style>