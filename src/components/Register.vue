<template>
    <div class="register">
        <form id="register" @submit.prevent="register">
            <h3 style="text-align: center">Register</h3>
            <div class="form__group field">
                <input type="email" class="form__field" placeholder="Email" id="email-register" v-model="email" required />
                <label for="email" class="form__label">Email</label>
            </div>
            <div class="form__group field">
                <input type="password" class="form__field" placeholder="Password" id="password-register" v-model="password" required />
                <label for="password" class="form__label">Password</label>
            </div>
            <input type="submit" value="Register" class="brk-btn button">
        </form>
        Already have an account?
        <a href="" class="underlined-a" style="text-decoration: none;" v-on:click.prevent="toLogin">Login</a>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : "Register",
    data()
    {
        return{
            email: "",
            password: ""
        }
    },
    methods: 
    {
        register()
        {
            axios(
            {
                method: "POST",
                url: "https://lit-bayou-72535.herokuapp.com/register",
                data: 
                {
                    email: this.email,
                    password: this.password
                }
            })
            .then(data =>
            {
                console.log(data.data.message);
                this.clearForm();
                this.$emit("register");
            })
        },
        clearForm()
        {
            this.email = "";
            this.password = "";
        },
        toLogin()
        {
            this.$emit("toLogin");
        }
    }
}
</script>