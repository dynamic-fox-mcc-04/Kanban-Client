<template>
    <div>
        <form @submit.prevent="login()">
            <div class="form-group">
                <label for="login-email">Email address</label>
                <input v-model="payload.email" type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email"  />
            </div>
            <div class="form-group">
                <label for="login-password">Password</label>
                <input v-model="payload.password" type="password" class="form-control" id="login-password" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
    </div>
</template>

<script>
let baseUrl = "http://localhost:3000";
export default {
    name: "LoginForm",
    data(){
        return{
            payload: {
                email: "",
                password: ""
            },
            clientId: '144495692225-262qd2tmh1dk8gka6moik34lb112mn3s.apps.googleusercontent.com'
        }
    },
    methods:{
        login() {
            axios({
                method: "POST",
                url: baseUrl + "/user/login",
                data: {
                    email: this.payload.email,
                    password: this.payload.password
                }
            })
                .then(result => {
                    localStorage.setItem("access_token", result.data.access_token);
                    this.$emit('isLogin')
                })
                .catch(err => {
                    console.log(err);
                });
        },
        OnGoogleAuthSuccess (idToken) {
            alert(idToken)
            // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
            alert(error)
            console.log(error)
        }
    }
};
</script>

<style>
</style>