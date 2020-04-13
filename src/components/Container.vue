<template>
    <div>
        <div v-for="(value, key) in containers" :key="key">
            <div class="container" v-bind:id="key">
                <div class="container-header d-flex justify-content-between align-items-center">
                    <div class="container-icon">
                    </div>
                    <h4 class="title">{{value}}</h4>
                    <a href="" v-bind:id="addKey(key)" v-on:click.prevent="add(key)">
                    </a>
                </div>
                <div class="container-main">
                        <div v-for="(task, index) in tasks" :key="index">
                            <div class="card" v-if="task.Task.category == key">
                                <div class="card-header d-flex justify-content-between">
                                    <h6 class="card-title" v-on:click.prevent="update(task.Task.id)">{{task.Task.title}}</h6>
                                    <a href="" class="remove-task" v-on:click.prevent="remove(task.Task.id)"></a>
                                </div>
                                <div class="card-main">
                                    <p class="card-description">
                                        {{task.Task.description}}
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props : ["containers", "tasks"],
    methods:
    {
        addKey(key)
        {
            return `add-${key}`;
        },
        add(category)
        {
            this.$emit("add", category);
        },
        remove(id)
        {
            axios(
            {
                method: "DELETE",
                url: `https://lit-bayou-72535.herokuapp.com/${id}/delete`,
                headers: 
                {
                    token: localStorage.token
                }
            })
            .then(() =>
            {
                this.$emit("remove");
            })
            .catch(err =>
            {
                console.log(err);
            })
        },
        update(id)
        {
            let index = this.tasks.findIndex(task => task.Task.id == id)
            this.$emit("update", this.tasks[index].Task);
        }
    }
}
</script>