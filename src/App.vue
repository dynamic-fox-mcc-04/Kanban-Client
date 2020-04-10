<template>
<div>
    <home v-if="!isLogin" @loginStatus="loginSuccess"></home>
    <dashboard v-else @loginStatus="loginSuccess"></dashboard>
</div>
</template>

<script>

import axios from 'axios'
import Home from './views/Home'
import Dashboard from './views/Dashboard'

    export default {
        name : "App",
        components : {
            Home,
            Dashboard
        },
        data () {
            return {
                isLogin : false
            }
        },
        methods : {
            loginSuccess(e) {
                this.isLogin = e
            }
        },
       created(){

           if (localStorage.access_token){
               this.isLogin = true;
           } else {
               this.isLogin = false;
           }
       }

    };

</script>

<style scoped>

</style>