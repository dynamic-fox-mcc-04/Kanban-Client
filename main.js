var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      isLogin:false,
      user: {
        username:'',
        password:''
      }

    },
    methods: {
      login() {
        let payload = {
          username: this.user.username,
          password: this.user.password
        }
        
        // hit api
        // set token
  
        localStorage.setItem('token', 'jshfjashfjhsdf')
        this.user.username = ''
        this.user.password = ''
        this.isLogin = true
      }
    }
  })