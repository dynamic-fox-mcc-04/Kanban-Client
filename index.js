let app = new Vue ({
  el: "#app",
  data: {
    isSignup: true,
    isLogin: true,
  },
  methods: {
    toSignup() {
      this.isSignup = false
    },
    toSignin() {
      this.isSignup = true
    }
  }
})