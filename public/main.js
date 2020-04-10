let app = new Vue({

    el: '#app',
    data: {
        isLogin: false,
        haveAccount: true
    },
    methods: {
        donthaveacc() {
            this.haveAccount = false
        },

        haveacc() {
            this.haveAccount = true
        }
    }


})