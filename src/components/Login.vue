<template>
    <div class="login">
        <form id="login" @submit.prevent="login">
            <h3 style="text-align: center">KanbanKu.co.id</h3><br>
            <div class="form__group field">
                <input type="email" class="form__field" placeholder="Email" id="email-login" v-model="email" required />
                <label for="email" class="form__label">Email</label>
            </div>
            <div class="form__group field">
                <input type="password" class="form__field" placeholder="Password" id="password-login" v-model="password" required />
                <label for="password" class="form__label">Password</label>
            </div>
            <input type="submit" value="Login" class="brk-btn button"><br>
        </form>
        <!-- Login with Google?<div class="g-signin2" data-onsuccess="onSignIn" @click.prevent="google"></div><br> -->
        Don't have an account?
        <a href="" class="underlined-a" style="text-decoration: none;" v-on:click.prevent="toRegister">Register</a>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : "Login",
    props : ["toLogin"],
    data()
    {
        return{
            email : "",
            password : ""
        }
    },
    methods: 
    {
        login()
        {
            axios(
            {
                method: "POST",
                url: "https://lit-bayou-72535.herokuapp.com/login",
                data: 
                {
                    email: this.email,
                    password: this.password
                }
            })
            .then(data =>
            {
                localStorage.token = data.data.token;
                this.clearForm();
                this.$emit("login");
            })
        },
        clearForm()
        {
            this.email = "";
            this.password = "";
        },
        toRegister()
        {
            this.$emit("toRegister");
        }
    }
}
</script>