<template>
    <!-- login -->
    <div id="acces-form" class="">
        <div class="d-flex flex-column align-items-center">
            <h1>Login</h1>
            <login-form @isLogin = "$emit('isLoginStatus')" ></login-form>
        </div>
    </div>
    <!-- login end --> 
</template>

<script>
import login from '../components/login'
import register from '../components/register'
export default {
    name: "AuthForm",
    components:{
        "login-form": login
    },
    methods:{
        
    }
}
</script>

<style>

</style>