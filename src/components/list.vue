<template>
<div style="margin-bottom:3%;">
  <div class="card-content">
      <h4>{{task.title}}</h4>
  </div>
  <button @click="$emit('hapus',task.id)">Delete</button>
  <button v-if="categoryId > 1" @click="moveToTheLeft(task.id)">before</button>
  <button v-if="categoryId<4" @click="moveToTheRight(task.id)">next</button>
</div>
</template>

<script>
export default {
    name:"List",
    props:['task','category','categoryId'],
    methods:{
        moveToTheLeft(id){
            let taskId= id
            let data={
                id:id,
                category:this.category
            }
            this.$emit('moveToTheLeft', data)
        },
        moveToTheRight(id){
            let taskId= id
            let data={
                id:id,
                category:this.category
            }
            // console.log(data)
            this.$emit('moveToTheRight', data)
        }
    }
}
</script>

<style>

</style>