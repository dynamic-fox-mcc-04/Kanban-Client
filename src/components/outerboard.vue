<template>
<div>
  <div id="Board">
      <div id="BoardName">
          <p>{{Category}}</p>
      </div>
  </div>
  <div id="TaskBoard">
        <task v-for="Task in TaskCat" :key="Task.id" :Task="Task" class="task" v-on:Update="Update" v-on:Delete="Delete">
  </div>
</div>
</template>

<script>
import task from './card'
import draggable from 'vuedraggable'

export default {
    props: ['Category', 'Tasks'],
    data() {
        return {
            
        }
    },
    methods: {
        Update(value) {
            this.$emit('Update', value)
        },
        Delete(value) {
            this.$emit('Delete', value)
        }
    },
    components: {
        task,
        draggable
    },
    computed: {
        TaskCat: function () {
            return this.Tasks.filter(el => el.Category == this.Category)
        }
    }

}
</script>

<style>
#Board{
    margin: 0%;
    width: 22vw;
    height: 100vh;
    background-image: url('../images/wood.jpg') ;
    background-size: contain;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-content: space-around;
}
#Boards {
    margin-top: 0%;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
#BoardName{
    padding: 10%;
    margin-top: -48vh;
    background-color: royalblue;
    color: yellowgreen;
    width: 20vw;
    height: 15vh;
    padding-bottom: 10vh;
}
#TaskBoard {
    background-color: thistle;
    width: 20vw;
    height: 70vh;
    margin-top: -80vh;
    margin-left: 1vw;
    margin-bottom: 20px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}
p {
    width: 30vw;
    font-size: 43;
    font-style: oblique;
    flex-wrap: wrap;
    /* margin-left: 10px; */
    /* margin-right: 50%; */
    width: 30px;
    overflow-wrap: normal;
}
.task {
    margin-bottom: 45px;
    margin-top: 20px;
}
</style>