<template>
  <div class="cards">
    <div>
      <!-- CARD -->
      <b-card style="max-width: 20rem;" class="mb-2">
        <b-card-text>
          <h5>
            <b>{{ unitTask.title }}</b>
          </h5>
          <p>{{ unitTask.category }}</p>
          <p>Project ID: {{ unitTask.ProjectId }}</p>
        </b-card-text>

        <div>
          <button type="button" class="btn btn-danger" @click="deleteTask4">Delete</button>
          <b-button class="warning" @click.prevent="showModal()">EDIT</b-button>

          <!-- MODAL EDIT -->
          <b-modal :id="unitTask.id.toString()" title="EDIT TASK">
            <form id="form-editTask">
              ProjectID:<br>
              <input type="text" readonly id="edit-task-project-id" v-model="projectId" />
              <br /><br />TaskID:<br>
              <input type="text" readonly id="edit-task-id" v-model="taskId" />
              <br /><br />Title:<br>
              <input type="text" required id="edit-task-title" v-model="taskTitle" />
              <br /><br />Category:<br>
              <select class="task-category" v-model="taskCat">
                <option
                  v-for="(type, idx) in categories"
                  :key="idx"
                  :value="type"
                >{{ type.toUpperCase() }}</option>
              </select><br /><br />
              <input type="submit" value="UPDATE" />
            </form>

            <!-- DONT' WANNA USE BOOTSTRAP-VUE TEMPLATE. HORRIBLE! -->
            <template v-slot:modal-footer>
              <div class="w-100">
              </div>
            </template>
              <!-- DONT' WANNA USE BOOTSTRAP-VUE TEMPLATE. HORRIBLE! -->

          </b-modal>
          <!-- END MODAL -->
        </div>
      </b-card>
      <!-- END CARD -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  components: {},
  props: ["unitTask"],
  data() {
    return {
      taskId: this.unitTask.id,
      projectId: this.unitTask.ProjectId,
      taskTitle: this.unitTask.title,
      taskCat: this.unitTask.category,
      categories: ["backlog", "pending", "review", "done"]
    };
  },
  methods: {
    showModal() {
      let n = this.unitTask.id.toString();
      this.$bvModal.show(n);
    },
    editTask4() {
      console.log("EDIT TASK @ CARD ----->");
      console.log(this.taskId, this.taskTitle, this.taskCat, this.projectId);
      this.$emit("editTask4", {
        taskId: this.taskId,
        title: this.taskTitle,
        category: this.taskCat,
        projectId: this.projectId
      });
    },
    deleteTask4() {
      this.taskId = this.unitTask.id;
      this.projectId = this.unitTask.ProjectId;
      console.log("DELETE PROJECT'S TASK FROM CARD BOX ----->");
      console.log(this.taskId, this.projectId);
      this.$emit("deleteTask4", {
        taskId: this.taskId,
        projectId: this.projectId
      });
    }
  }
};
</script>
  
<style>
.cards {
  color: black;
  padding: 1vh;
  margin: 1vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}
#form-editTask {
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  /* margin-left: 25%; */
}
</style>