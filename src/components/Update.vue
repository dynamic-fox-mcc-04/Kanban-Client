<template>
    <div class="add">
        <form id="add" @submit.prevent="update">
            <h3 style="text-align: center">Update a Task</h3>
            <div class="form__group field">
                <input type="text" class="form__field" placeholder="Title" v-model="title" required />
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
            <input type="submit" value="Update" class="brk-btn button">
            <a href="" class="brk-btn button"  v-on:click.prevent="toHome">Cancel</a>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name : "Update",
    props : ["data", "containers"],
    data()
    {
        return{
            id : "",
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
        update()
        {
            axios(
            {
                method: "PUT",
                url: `https://lit-bayou-72535.herokuapp.com/${this.id}/update`,
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
        this.id = this.data.id;
        this.title = this.data.title;
        this.description = this.data.description;
        this.category = this.data.category;
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