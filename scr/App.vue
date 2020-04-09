<template>  
<div id="IndexPage">
<front-page></front-page>

</div>

</template>

<script>
import axios from 'axios'
import FrontPage from './views/Front'
import HomePage from './views/Home'

export default {
    name:"G-kanban",
    components:{
        FrontPage,
        HomePage
    },
    data(){
        return{
          message: 'Haloooo'
        }
    }
};

</script>

<style scoped>

</style>