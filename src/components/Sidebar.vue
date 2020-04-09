<template>
  <div id="sidebar">
    <div id="user-data">
      <img src="../image/avatar.svg" alt="">
      <div id="user-doc">
        <h5>{{ userName }}</h5>
        <p>{{ userEmail }}</p>
      </div>
    </div>
    <div id="task-data">
      <h6>YOUR TASKS</h6>
      <div class="counter">
        <div class="open-task">
          <h3>{{ taskNumber }}</h3>
          <p>Open</p>
        </div>
        <div class="closed-task">
          <h3>{{ closedTask }}</h3>
          <p>Canceled</p>
        </div>
      </div>
    </div>
    <div id="data-option">
      <p>Create and manage your task</p>
      <!-- Modal Button -->
      <a class="secondary-btn" id="add-btn" data-toggle="modal" data-target="#staticBackdrop">
        <i class="fas fa-plus" style="margin-right: 10px;"></i>Create
      </a>
      <!-- Modal -->
      <div
        class="modal fade create-task"
        id="staticBackdrop"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style="background-color: #171a25; border-radius: 10px;">
            <div class="modal-body" style="padding: 10px;">
              <form @submit.prevent="create">
                <div class="modal-header" style="margin-bottom: 10px; padding-left: 0;">
                  <h5 class="modal-title" id="staticBackdropLabel">Add List</h5>
                </div>
                <div class="form-group">
                  <label for="titleForm">Title</label>
                  <input
                    v-model="NewTitle"
                    type="text"
                    class="form-control"
                    id="titleForm"
                    style="background-color: #171a25;"
                  />
                </div>
                <div class="modal-footer" style="padding-right: 0px;">
                  <button type="button" class="secondary-btn" data-dismiss="modal">Close</button>
                  <button @click="create" type="button" class="btn primary-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Sidebar",
  props: ["task", "taskNumber", "closedTask", "userName", "userEmail"],
  data() {
    return {
      NewTitle: ""
    };
  },
  methods: {
    create: function() {
      axios({
        method: "POST",
        url: "http://localhost:3000/task",
        data: {
          title: this.NewTitle
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(task => {
          this.$emit("fetch");
          this.NewTitle = "";
          $(".create-task").modal("hide");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>