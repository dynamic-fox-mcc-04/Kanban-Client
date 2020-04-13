<template>
    <div class="add">
        <form id="add" @submit.prevent="add">
            <h3 style="text-align: center">Add a Task</h3>
            <div class="form__group field">
                <input type="text" class="form__field" placeholder="Title" id="title-add" v-model="title" required />
                <label for="title" class="form__label">Title</label>
            </div>
            <div class="form__group field">
                <textarea class="form__field" placeholder="Description" v-model="description"></textarea>
                <label for="description" class="form__label">Description</label>
            </div>
            <div class="form__group field">
                <select name="category" id="category" class="form__field" v-model="category">
                        <option :value="key" v-for="(value, key) in containers" :key="key">{{value}}</option>
                </select>
                <label for="category" class="form__label">Category</label>
            </div>
            <input type="submit" value="Add" class="brk-btn button">
            <a href="" class="brk-btn button" v-on:click.prevent="toHome">Cancel</a>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name : "Add",
    props : ["type", "containers"],
    data()
    {
        return{
            title : "",
            description : "",
            category : ""
        }
    },
    methods :
    {
        toHome()
        {
            this.$emit("toHome");
        },
        add()
        {
            axios(
            {
                method: "POST",
                url: "https://lit-bayou-72535.herokuapp.com/add",
                data:
                {
                    title : this.title,
                    description : this.description,
                    category : this.category
                },
                headers: 
                {
                    token: localStorage.token
                }
            })
            .then(data =>
            {
                this.$emit("toHome")
            })
            .catch(err =>
            {
                console.log(err);
            })
        }
    },
    created()
    {
        this.category = this.type;
    }
}
</script>

<style scoped>
.add
{
    color: black;
}

.add .button
{
    background-color: black;
}

input[type = "text"], textarea, option, select
{
    color: black;
}

</style>