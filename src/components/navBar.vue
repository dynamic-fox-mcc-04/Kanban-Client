<template>
  <!-- navbar-->
    <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#" style="cursor:pointer;" v-on:click="$emit('openBoard')">
            <img src width="30" height="30" class="d-inline-block align-top" alt />
            Trello Kw
        </a>
        <a style="cursor: pointer;" v-on:click="$emit('logout')">
          <b>Log Out</b>
        </a>
    </nav>
  <!-- end navbar -->
</template>

<script>
export default {
 name:"navBar"
};
</script>

<style>
</style>