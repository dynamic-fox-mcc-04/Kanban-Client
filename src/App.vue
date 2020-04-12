<template>
    <div>
        <home v-if="!login" @login="isLogin">
        </home>
        <kanban v-if="login" @logout="isLogin">
        </kanban>
    </div>
</template>

<script>
// import axios from 'axios';
import Home from "./views/Home";
import Kanban from "./views/Kanban";

export default {
    name : "App",
    data()
    {
        return {
            login : false,
            // task : []
        }
    },
    components:
    {
        Home, Kanban
    },
    methods :
    {
        isLogin()
        {
            if(localStorage.token)
                this.login = true;
            else
                this.login = false;
        },
        logout()
        {
            // localStorage.clear();
            this.login = false;
        }
    },
    created()
    {
       this.isLogin();
    }
}
</script>