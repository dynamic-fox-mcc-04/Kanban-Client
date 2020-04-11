<template>
  <div class="container-card">
      <h3>{{category}}</h3>
      <list
      v-for="taskdata in task"
      :key="taskdata.id"
      :category="category"
      :categoryId="categoryId"
      :task="taskdata"
      @hapus="hapus"
      @moveToTheLeft="moveToTheLeft"
      @moveToTheRight="moveToTheRight">
      </list>
    </div>
</template>

<script>
import List from './list'
export default {
    name: "Card",
    components: {
        List
    },
    methods: {
        hapus(id) {
            this.$emit('hapus',id)
        },
        moveToTheLeft(data){
            this.$emit('moveToTheLeft',data)
        },
        moveToTheRight(data){
            // console.log(data)
            this.$emit('moveToTheRight',data)
        }
    },
    props: ['task','category','categoryId']
}
</script>

<style>

</style>