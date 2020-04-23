<template>
  <div id="navbar">
    <!-- PROJECTS SELECTBAR -->
    <div>
      Avail Projects:
      <select id="avail-projects" v-model="projectId" v-on:change="enterProject2">
        <option
          v-for="(project, idx) in projects2"
          :key="idx"
          :value="project.ProjectId"
        >{{ project.Project.title }}</option>
      </select>
      <div>
        <b-button variant="danger" @click.prevent="dropProject2()">DROP</b-button>
        <b-button variant="success" @click.prevent="showTasks2()">GET TASKS</b-button>
      </div>
    </div>

    <!-- END PROJECT SELECTBAR -->

    <!-- START FORM ADD PROJECT -->
    <div>
      <!-- <form id="form-add-project" @submit.prevent="addProject2()"> -->
      <form id="form-add-project">
        Title:
        <input type="text" required id="add-project-title" v-model="projectTitle" />
        <!-- <input type="submit" value="ADD PROJECT" /> -->
      </form>
      <div>
        <b-button
          variant="primary"
          form="form-add-project"
          @click.prevent="addProject2()"
        >ADD PROJECT</b-button>
      </div>
    </div>
    <!-- END FORM ADD PROJECT -->

    <!-- START FORM INVITE -->
    <div>
      <!-- <form id="form-invitation" @submit.prevent="inviteMember2()"> -->
      <form id="form-invitation">
        Email:
        <input type="email" required id="invitee-email" v-model="invitee" />
        <!-- <input type="submit" value="INVITE" /> -->
        <!-- <button form="form-invitation" @click.prevent="fireMember2()">FIRE</button> -->
      </form>
      <!-- <br> -->
      <div>
        <b-button variant="primary" form="form-invitation" @click.prevent="inviteMember2()">HIRE</b-button>
        <b-button variant="danger" form="form-invitation" @click.prevent="fireMember2()">FIRE</b-button>
      </div>
    </div>
    <!-- END FORM INVITE -->

    <!-- START FORM ADD TASK -->
    <div>
      <!-- <form id="form-add-task" @submit.prevent="addNewTask2()"> -->
      <form id="form-add-task">
        Title:
        <input type="text" required id="add-task-title" v-model="title" />
        <!-- <input type="submit" value="ADD NEW TASK" /> -->
      </form>
      <div>
        <b-button form="form-add-task" variant="secondary" @click.prevent="addNewTask2()">ADD TASK</b-button>
      </div>
    </div>
    <!-- END FORM ADD TASK -->

    <!-- LOGOUT BUTTON -->
    <div>
      <b-button variant="dark" @click="logout2()">LOGOUT</b-button>
    </div>
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
    enterProject2() {
      console.log("ENTER PROJECT @ NAVBAR ->");
      this.$emit("enterProject2", Number(this.projectId));
    },

    logout2() {
      console.log("LOGGING OUT FROM NAVBAR ->");
      this.$emit("logout2", "NEXT ->");
    },

    addProject2() {
      console.log("ADD PROJECT FROM NAVBAR ->");
      // const projectId = +this.projectId
      const projectTitle = this.projectTitle;
      this.$emit("addProject2", projectTitle);
    },

    inviteMember2() {
      console.log("INVITE MEMBER FROM NAVBAR ->");
      console.log("member is");
      console.log(this.invitee);
      console.log(this.projectId);
      const projectId = +this.projectId;
      const invitee = this.invitee;
      this.$emit("inviteMember2", {
        invitee: invitee,
        projectId: projectId
      });
    },

    fireMember2() {
      console.log("FIRE MEMBER FROM NAVBAR ->");
      const projectId = +this.projectId;
      const member = this.invitee;
      this.$emit("fireMember2", {
        member: member,
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  align-content: space-evenly;
  background-color: darkkhaki;
  font-weight: bold;
  padding: 3vh;
  border-radius: 15px;
}

#navbar div {
  align-items: center;
  /* margin: 5px; */
  padding: 5px;
}
</style>