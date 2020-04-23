<template>
  <div id="navbar">
    
    <!-- PROJECTS SELECTBAR -->
    <div>
      Avail Projects:
      <select id="avail-projects" v-model="projectId">
        <option v-for="(project, idx) in projects2" :key="idx">{{ project.ProjectId }}</option>
      </select>
      <div>
        <b-button variant="danger" @click="dropProject2()">DROP</b-button>
        <b-button variant="success" @click="showTasks2()">GET TASKS</b-button>
      </div>
    </div>

    <!-- END PROJECT SELECTBAR -->

    <!-- START FORM ADD PROJECT -->
    <form id="form-add-project" @submit.prevent="addProject2()">
      Title:
      <input type="text" required id="add-project-title" v-model="projectTitle" />
      <input type="submit" value="ADD PROJECT" />
    </form>
    <!-- END FORM ADD PROJECT -->

    <!-- START FORM INVITE -->
    <form id="form-invitation" @submit.prevent="inviteMember2()">
      Email:
      <input type="email" required id="invitee-email" v-model="invitee" />
      <input type="submit" value="INVITE" />
    </form>
    <!-- END FORM INVITE -->

    <!-- START FORM ADD TASK -->
    <form id="form-add-task" @submit.prevent="addNewTask2()">
      Title:
      <input type="text" required id="add-task-title" v-model="title" />

      <input type="submit" value="ADD NEW TASK" />
    </form>
    <!-- END FORM ADD TASK -->

    <!-- LOGOUT BUTTON -->
    <b-button variant="dark" @click="logout2()">LOGOUT</b-button>
    <!-- END LOGOUT -->

  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["projects2"],
  data() {
    return {
      projectId: 0,
      invitee: "",
      title: "",
      projectTitle: "",
      projects3: []
    };
  },
  methods: {

    // enterProject2() {
    //   console.log("ENTER PROJECT @ NAVBAR");
    //   this.$emit("enterProject2", Number(this.projectId))
    // },

    logout2() {
      console.log("LOGGING OUT FROM NAVBAR ->");
      this.$emit("logout2", "NEXT ->");
    },

    addProject2() {
      console.log("ADD PROJECT FRO NAVBAR ->");
      // const projectId = +this.projectId
      const projectTitle = this.projectTitle;
      this.$emit("addProject2", projectTitle);
    },

    inviteMember2() {
      console.log("INVITE MEMBER FROM NAVBAR ->");
      const projectId = +this.projectId;
      const invitee = this.invitee;
      this.$emit("inviteMember2", {
        invitee: invitee,
        projectId: projectId
      });
    },

    addNewTask2() {
      console.log("ADD NEW TASK @ NAVBAR ->");
      const projectId = +this.projectId;
      const title = this.title;
      this.$emit("addNewTask2", {
        title: title,
        projectId: projectId
      });
    },

    dropProject2() {
      console.log("DROP PROJECT @ NAVBAR ->");
      const projectId = +this.projectId;
      this.$emit("dropProject2", projectId);
    },

    showTasks2() {
        const projectId = +this.projectId;
        console.log("SHOW PROJECT'S TASKS @ NAVBAR ->");
        this.$emit("showTasks2", projectId);
    }
  }
};
</script>

<style>
#navbar {
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  background-color: darkkhaki;
  font-weight: bold;
  /* margin: 1vh; */
  padding: 1vh;
}
</style>