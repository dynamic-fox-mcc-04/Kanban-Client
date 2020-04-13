<template>
    <div>
        <navbar @logout="logout" @toHome="toHome">
        </navbar>
        <container :containers="containers" class="d-flex justify-content-around" v-if="inHome" @add="add" :tasks="tasks" @getTasks="showTasks" @remove="toHome" @update="toUpdate">
        </container>
        <add v-if="inAdd" class="d-flex align-items-center justify-content-center" :type="category" :containers="containers" @toHome="toHome">
        </add>
        <update v-if="inUpdate" :data="updateData" @toHome="toHome" :containers="containers">
        </update>
    </div>
</template>

<script>
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import Update from "../components/Update"
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
            category : "",
            updateData : "",
            inUpdate : false,
            inAdd : false
        }
    },
    components :
    {
        Container, Navbar, Add, Update
    },
    methods :
    {
        logout()
        {
            this.$emit("logout");
        },
        toUpdate(data)
        {
            this.updateData = data;
            this.inHome = false,
            this.inUpdate = true
        },
        add(category)
        {
            this.category = category;
            this.inHome = false;
            this.inAdd = true;
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
                this.tasks = data.data;
            })
            .catch(err =>
            {
                console.log(err);
            })
        },
        toHome()
        {
            this.inAdd = false;
            this.inUpdate = false;
            this.inHome = true;
            this.showTasks();
        }
    },
    created()
    {
        this.showTasks();
    }
}
</script>