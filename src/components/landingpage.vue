<template>
  <div id="landing">
      <h1>Welcome to Kanban Board</h1>
      <h2>To start using this,there is a few steps that you must do:</h2>
      <ul>
          <li>Click User on top right,then chooser Login / Register</li>
          <li>After Register / Login, Click Projects or make a new projects</li>
          <li>Use it Normally(you can invite people,as long as their email is registered) like a normal kanban~</li>
      </ul>
      <h2>P.S if you want to leave the project just type your email(case sensitive) as per in members section then press delete friend</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#landing{
    width: 100vw;
    height: 100vh;
    padding-left:2vw ;
    padding-top: 2vw;
    text-overflow: unset;
    color: orangered;
    position: absolute;
    background-image: url('../images/vector.jpg');
    background-size: contain;
}
#landing p {
    size: 29;
    width: 100vw;
}
</style>