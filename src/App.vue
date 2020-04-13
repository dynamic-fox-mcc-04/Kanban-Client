<template>
    <div>
        <home v-if="!login" @login="isLogin">
        </home>
        <kanban v-if="login" @logout="isLogin">
        </kanban>
    </div>
</template>

<script>
import Home from "./views/Home";
import Kanban from "./views/Kanban";

export default {
    name : "App",
    data()
    {
        return {
            login : false,
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
            this.login = false;
        }
    },
    created()
    {
       this.isLogin();
    }
}
</script>