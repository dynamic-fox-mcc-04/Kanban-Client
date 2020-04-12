<template>
    <div>
        <navbar @logout="logout">
        </navbar>
        <container :containers="containers" class="d-flex justify-content-around" v-if="inHome" @add="add" :tasks="tasks" @getTasks="showTasks">
        </container>
        <add v-if="!inHome" class="d-flex align-items-center justify-content-center" :type="category" :containers="containers" @toHome="toHome">
        </add>
    </div>
</template>

<script>
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import axios from "axios";

export default {
    data()
    {
        return{
            containers : 
            {
                todo : "Todo", 
                in_progress : "In Progress", 
                done : "Done", 
                backlog : "Backlog"
            },
            inHome : true,
            tasks : [],
            category : ""
        }
    },
    components :
    {
        Container, Navbar, Add
    },
    methods :
    {
        logout()
        {
            this.$emit("logout");
        },
        add(category)
        {
            // console.log(this.tasks)
            this.category = category;
            this.inHome = false;
            console.log(this.category)
        },
        showTasks()
        {
            axios(
            {
                method: "GET",
                url: "https://lit-bayou-72535.herokuapp.com/task",
                headers: 
                {
                    token: localStorage.token
                }
            })
            .then(data =>
            {
                // console.log(data.data);
                this.tasks = data.data;
                // console.log(this.tasks);
                // return data;
            })
            .catch(err =>
            {
                console.log(err);
            })
        },
        toHome()
        {
            this.inHome = true;
            this.showTasks();
        }
    },
    created()
    {
        this.showTasks();
        console.log("created",this.tasks)
    }
}
</script>