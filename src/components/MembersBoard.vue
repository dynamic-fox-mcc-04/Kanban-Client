<template>
  <div id="pg-members-board">
      <h4>PROJECT MEMBERS</h4>
      <!-- SHOW PROJECT MEMBERS' EMAIL -->
      <div id="memberslist">
          <p v-for="(member, idx) in members2" :key="idx">
             {{member.email}} 
          </p>
      </div>
      <!-- SHOW PROJECT MEMBERS EMAIL END -->
  </div>
</template>
<script>
export default {
  name: "MembersBoard",
  components: {
  },
  props: ["members2"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
 #pg-members-board {
    color: blanchedalmond;
    text-align: center;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
 }
 #memberslist {
    /* display: inline-block; */
    /* float: left; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    margin: 5px;
    padding: 5px;
 }
</style>