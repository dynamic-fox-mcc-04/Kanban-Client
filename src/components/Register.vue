<template>
  <div>
    <div class="row" v-if="!isRegister && !isLogin">
      <div class="col-md-4 offset-md-4">
        <form @submit.prevent="$.emit('register')">
          <h3>Please Register</h3>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="user.email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else outside
              organization.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="user.password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          <button @click="$('backToLogin')" class="btn btn-info">Back</button>
        </form>
      </div>
    </div>
  </div>
</template
>

<script>
export default {
  name: "Register",
  props: ["isLogin", "isRegister", "register", "user", "backToLogin"],
  data() {
    return {
     
    };
  }
};
</script>

<style></style>
