<template>
    <div>
        <home v-show="true">
        </home>
        <!-- <kanban v-show="false">
        </kanban> -->
    </div>
</template>

<script>
import axios from 'axios';
import Home from "./views/Home";
import Kanban from "./views/Kanban";

export default {
    name : "App",
    data()
    {
        return {
            login : true
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
            console.log(localStorage.token)
            if(localStorage.token)
                return this.login = true;
            console.log(this.login)
            return this.login = false;
        },
        showTasks()
        {

        }
    }
}
</script>