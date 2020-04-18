<template>
  <Register
    :isLogin="isLogin"
    :isRegister="isRegister"
    :register="register"
    :user="user"
    @backToLogin="backToLogin"
  />
</template>

<script>
import Register from "../components/Register";
export default {
  name: "Access",
  components: {
    Register
  },
  data() {
    return {
      isLogin: false,
      isRegister: true,
      user: {
        email: "",
        password: "",
        currentProject: "",
        task: ""
      },
    };
  }
};
</script>

<style></style>
