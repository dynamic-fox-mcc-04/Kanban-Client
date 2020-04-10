<template>
    <main class="d-flex align-items-center justify-content-center">
        <register v-show="!toLogin" @toLogin="home(true)">
        </register>
        <login v-show="toLogin" @toRegister="home(false)">
        </login>
    </main>
</template>

<script>
import Register from "../components/Register";
import Login from "../components/login";

export default {
    name : "Home",
    data()
    {
        return{
            toLogin : true
        }
    },
    components :
    {
        Register,
        Login
    },
    methods :
    {
        home(condition)
        {
            this.toLogin = condition;
        }
    }
}
</script>

<style>
    main
    {
        height: 100% !important;
        background-color: #222222 !important;
        color: white !important;
        margin-top: 0;
        padding: 0 20%;
        padding-top: 40px;
    }
    .button
    {
        margin: 20px 0 !important;
    }
    h3
    {
        font-family: 'Roboto Slab', serif;
    }
</style>