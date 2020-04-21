<template>
    <div class="card hoverable" style="width: 95%; margin-bottom: 15%;">
      <div class="card-body hoverable">
        <form v-if="showEdit" class="form-group" id="add-task">
            <p> <b>Edit Task:</b> </p>
            <input type="text" id="title-edit" v-model="title" placeholder="Title"><br>
            <input type="text" id="description-edit" v-model="description" placeholder="Description"><br>
            <select id="category-edit" v-model="category" style="border-color: white; color: white;">
                <option value="Backlog">Backlog</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Development">Development</option>
                <option value="Finished">Finished</option>
            </select>
            <br>
            <button v-on:click.prevent="editTask">Edit</button>
            <button v-on:click.prevent="hideForm">close</button>
        </form>
        <div v-else class="item-display">
        <h4>{{ task.title }}</h4>
            <p class="card-text">{{ task.description }}</p>
            <p class="card-text">{{ task.category }}</p>
            <div v-if="canEdit" id="editable">
                <a class="card-link" v-on:click.prevent="editCard" href="#">Edit</a>
                <a class="card-link" v-on:click.prevent="destroy" href="#">Delete</a>
            </div>
            <div v-else id="info-edit">
                Owner: <br> {{ task.User.email }}
            </div>
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
  data () {
    return {
      title: '',
      description: '',
      category: '',
      showEdit: false
    }
  },
  methods: {
    editCard: function () {
      this.title = this.task.title
      this.description = this.task.description
      this.category = this.task.category
      this.showEdit = true
    },
    editTask: function () {
      this.$emit('modify', {
        id: this.task.id,
        title: this.title,
        description: this.description,
        category: this.category
      })
    },
    hideForm: function () {
      this.showEdit = false
    },
    destroy: function () {
      this.$emit('destroy', this.task.id)
    }
  },
  computed: {
    canEdit: function () {
      if(this.task.User.email === localStorage.getItem('email')) {
        return true
      }
      else {
        return false
      }
    }
  }
}
</script>

<style>

</style>