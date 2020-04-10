<template>
        <div class="card col-3 col padding-none cat" style="width: 20rem;">
          <div class="card-header">{{ category.cat }}</div>
            <div class="card-body column-bod">
              <Card v-for="task in selector" :key="task.id" :task="task"></Card>
            </div>
          <div class="card-footer">
            <form v-if="summonFormAdd" class="form-group" id="add-task">
                <p> <b>Add Task:</b> </p>
                <input type="text" id="title" v-model="title" placeholder="Title"><br>
                <input type="password" id="description" v-model="description" placeholder="Description"><br><br>
                <button v-on:click.prevent="addTask">Add</button>
                <button v-on:click.prevent="hideForm">close</button>
            </form>
            <button v-on:click="summonForm">Add Task</button></div>
        </div>
</template>

<script>
import Card from './Card.vue'
import AddForm from './AddForm.vue'

export default {
  name: 'Column',
  props: {
      category: Object,
      tasks: Array
  },
  components: {
    Card: Card
  },
  data() {
    return {
      title: '',
      description: '',
      summonFormAdd: false
    }
  },
  methods: {
    summonForm: function () {
      this.summonFormAdd = true
    },
    hideForm: function () {
      this.summonFormAdd = false
    }
  },
  computed: {
    selector: function () {
      return this.tasks.filter(el=> el.category === this.category.cat)
    }
  }

}
</script>

<style>

</style>