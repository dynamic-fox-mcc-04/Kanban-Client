<template>
    <div class="card" style="width: 95%;">
      <div class="card-body">
        <form v-if="showEdit" class="form-group" id="add-task">
            <p> <b>Edit Task:</b> </p>
            <input type="text" id="title" v-model="task.title" placeholder="Title"><br>
            <input type="password" id="description" v-model="description" placeholder="Description"><br><br>
            <button v-on:click.prevent="addTask">Add</button>
            <button v-on:click.prevent="hideForm">close</button>
        </form>
        <div v-else class="item-display">
        <h4>{{ task.title }}</h4>
            <p class="card-text">{{ task.description }}</p>
            <p class="card-text">{{ task.category }}</p>
            <a class="card-link" v-on:click.prevent="editCard" href="#">Edit</a>
            <a class="card-link" href="#">Delete</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    task: Object
  },
  body () {
    return {
      showEdit: false
    }
  },
  methods: {
    editCard: function () {
      this.showEdit = true
    }
  }
}
</script>

<style>

</style>