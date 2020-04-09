<template>
  <div id="pg-main" v-show="token">
      <h1>HOLA, MUNDO!</h1>

      <button @click="logout()">LOGOUT</button>

      <div id="home">
        <h1>WELCOME TO KANBAN HOMEPAGE</h1>
      </div>

      <div class="dashboard">
        <div class="board-projects">
          <form id="form-add-project" @submit.prevent="addProject()">
            Title:
            <input type="text" required id="add-project-title" v-model="projectTitle" />
            <input type="submit" value="ADD PROJECT" />
          </form>

          <form id="form-invitation" @submit.prevent="inviteMember()">
            Email:
            <input type="email" required id="invitee-email" v-model="invitee" />
            ProjectID:
            <input
              type="text"
              readonly
              id="invitee-projectid"
              v-model="projectId"
            />
            <input type="submit" value="INVITE" />
          </form>

          <form id="form-add-task" @submit.prevent="addNewTask()">
            ProjectID:
            <input type="text" readonly id="add-task-projectid" v-model="projectId" />
            Title:
            <input type="text" required id="add-task-title" v-model="title" />

            <input type="submit" value="ADD NEW TASK" />
          </form>

          <div class="list-projects" v-for="project in projects" :key="project.id">
            <h4>HELLO, IT;S ME</h4>
            <p>MY ID: {{ project.UserId }}</p>
            <p>PROJECT ID: {{ project.ProjectId }}</p>
            <p>PROJECT NAME: {{ project.Project.title }}</p>
            <button @click.prevent="showTasks(project.ProjectId)">SHOW TASKS</button>
            <button @click.prevent="fillAddTaskForm(project.ProjectId)">ADD TASK</button>
            <button @click.prevent="fillInvitation(project.ProjectId)">Invite</button>
            <button @click.prevent="dropProject(project.ProjectId)">DROP</button>
          </div>
          <div class="board-tasks">
            <div id="pg-editTaskForm">
              <form id="form-editTask" @submit.prevent="editTask()">
                ProjectID:
                <input type="text" readonly id="edit-task-project-id" v-model="projectId" />
                <br />
                TaskID:
                <input type="text" readonly id="edit-task-id" v-model="taskId" />
                <br />
                Title:
                <input type="text" required id="edit-task-title" v-model="title" />
                <br />Category:
                <select class="task-category" v-model="category">
                  <option value="backlog">BACKLOG</option>
                  <option value="pending">PENDING</option>
                  <option value="review">REVIEW</option>
                  <option value="done">DONE</option>
                </select>
                <input type="submit" value="UPDATE">
              </form>
            </div>
            <div class="subboard1">
              BACKLOG
              <div v-for="(task, idx) in backlogs" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>

            <div class="subboard2">
              PENDING
              <div v-for="(task, idx) in pendings" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                </p>
                <p>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>

            <div class="subboard3">
              REVIEW
              <div v-for="(task, idx) in reviews" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                </p>
                <p>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>

            <div class="subboard4">
              DONE
              <div v-for="(task, idx) in dones" :key="idx">
                <p>{{ task.title }}</p>
                <p>
                  <button @click.prevent="showEditTaskForm(task.id, task.ProjectId)">UPDATE</button>
                </p>
                <p>
                  <button @click.prevent="deleteTask(task.id, task.ProjectId)">DELETE</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
    props: ['token', 'projects'],
    data() {
        return {
            taskId: 0,
            projectId: 0,
            projectTitle: "",
            title: "",
            invitee: ""
        }
    },
    methods: {

    }

}
</script>

<style>

</style>