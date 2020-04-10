<template>
  <div>
  <b-modal id="RegisterModal" hide-footer>
    <template v-slot:modal-title>
      Register
    </template>
    <div class="d-block text-center">
        <b-form @submit.prevent="Register">
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
        <b-button variant="danger" @click="$bvModal.hide('RegisterModal')">Cancel</b-button>
        <b-button variant="success" type="submit">Register</b-button>
        </b-form>
    </div>
  </b-modal>
</div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            Email: '',
            Password: ''
        }
    },
    methods: {
        Cancel() {

        },
        Register() {
            this.$emit('Register', {
                Email: this.Email,
                Password: this.Password
            })
            this.Email = '',
            this.Password = ''
        }
    }

}
</script>

<style>

</style>