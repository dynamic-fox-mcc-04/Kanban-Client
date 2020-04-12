<template>
    <main class="d-flex align-items-center justify-content-center">
        <register v-if="!inLogin" @toLogin="home(true)" @register="home(true)">
        </register>
        <login v-if="inLogin" @toRegister="home(false)" @login="login">
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
            inLogin : true
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
            this.inLogin = condition;
        },
        login()
        {
            this.$emit("login");
        }
    }
}
</script>

<style scoped>
body
{
    background-color: #222222 !important;
}
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