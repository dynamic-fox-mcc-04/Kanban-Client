<template>
  <div>
  <b-modal id="LoginModal" hide-footer>
    <template v-slot:modal-title>
      Login
    </template>
    <div class="d-block text-center">
        <b-form @submit.prevent="Login">
        <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
        >
            <b-form-input
            id="input-1"
            v-model="Email"
            type="email"
            required
            placeholder="Enter Email"
            ></b-form-input>
        </b-form-group>
        
        <b-form-group
            id="input-group-1"
            label="Password:"
            label-for="input-1"
            description="Please Put Password Here."
        >
            <b-form-input
            id="input-1"
            v-model="Password"
            type="password"
            required
            placeholder="Enter Password"
            ></b-form-input>
        </b-form-group>
        <b-button variant="danger" @click="$bvModal.hide('LoginModal')">Cancel</b-button>
        <b-button variant="success" type="submit">Login</b-button>
        </b-form>
        <p>or</p>
        <button v-google-signin-button class="google-signin-button"> Continue with Google</button>
    </div>
  </b-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            Email: '',
            Password: '',
        }
    },
    methods: {
        Cancel() {

        },
        Login() {
            this.$emit('Login', {
                Email: this.Email,
                Password: this.Password
            })
            this.Email = '',
            this.Password = ''
        },
        OnGoogleAuthSuccess (idToken) {
            axios({
                url: 'http://localhost:3000/user/googlelogin',
                method: 'POST',
                headers: {
                    access_token: idToken
                }
            })
                .then(result => {
                    this.$emit('GoogleLogin', result.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    },
    components: {
    }

}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>