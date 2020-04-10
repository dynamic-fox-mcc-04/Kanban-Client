<template>
    <div class="card" style="width: 95%;">
      <div class="card-body">
        <h4>{{ task.title }}</h4>
        <p class="card-text">{{ task.description }}</p>
        <a class="card-link" href="#">Edit</a>
        <a class="card-link" href="#">Delete</a>
        <a class="card-link" href="#"><</a>
        <a class="card-link" href="#">></a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    task: Object
  }
}
</script>

<style>

</style>