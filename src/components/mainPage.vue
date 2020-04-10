<template>
<div :status="status">
    <navBar
    id="navbar"
    @logout='auth'
    ></navBar>
    <board  :status="status" @add="add" @deleteTask="deleteTask"></board>
</div>
</template>

<script>
import board from './board'
import navBar from './navBar'

export default {
    components: {
        board,
        navBar
    },
    props: ['status'],
     methods: {
         auth() {
            this.$emit('logout')
         },
         add() {
            this.$emit('add')
         },
         deleteTask() {
             this.$emit('deleteTask')
         }
     }
     
}
</script>

<style>
    #navbar {
        top: 0.2%;
        margin: 0 6px;
        border-radius: 0.5rem;
        background-color: #263238;
    }
</style>