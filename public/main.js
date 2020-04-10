const siteurl = 'https://dynamic-fox-kanban.herokuapp.com'
    // const siteurl = 'http://localhost:3000'

let app = new Vue({


    el: '#app',
    data: {
        isLogin: false,
        haveAccount: true,
        addnew: false,
        userlogin: {
            email: '',
            password: ''
        },
        userReg: {
            email: '',
            password: '',
            verifypassword: ''
        },
        kanbandata: [],
        newkanbandata: {
            title: '',
            description: ''
        },

        msg: ''
    },
    methods: {
        cancelbutton() {
            this.addnew = false
        },
        addnewpage() {
            this.addnew = true
        },
        donthaveacc() {
            this.msg = ''
            this.haveAccount = false
        },

        haveacc() {
            this.msg = ''
            this.haveAccount = true
        },
        login() {
            let email = this.userlogin.email
            let password = this.userlogin.password
            console.log(email + password)
            axios({
                    method: 'POST',
                    url: siteurl + '/user/login',

                    data: {
                        email,
                        password
                    }
                })
                .then((result) => {
                    // console.log(result.data);
                    const access_token = result.data.access_token
                        // console.log('sukses');
                    localStorage.setItem('access_token', access_token)
                    this.getKanban()
                    this.isLogin = true
                        // this.getKanban()
                })
                .catch((err) => {
                    console.log(err);
                    this.msg = 'Wrong email/password'
                })
            this.userlogin.email = ''
            this.userlogin.password = ''
        },
        register() {
            let email = this.userReg.email
            let password = this.userReg.password
            let verifypassword = this.userReg.verifypassword
            if (password == verifypassword) {
                axios({
                        method: 'POST',
                        url: siteurl + '/user/register',

                        data: {
                            email,
                            password,
                            verifypassword
                        }
                    })
                    .then((result) => {
                        const access_token = result.data.access_token
                        localStorage.setItem('access_token', access_token)
                        this.getKanban()
                        this.isLogin = true
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                this.userReg.email = ''
                this.userReg.password = ''
                this.userReg.verifypassword = ''
                this.msg = 'Password Missmatch'
            }
        },

        logout() {
            localStorage.removeItem('access_token')
            this.isLogin = false
            this.haveAccount = true
        },
        getKanban() {
            axios({
                    method: 'GET',
                    url: siteurl + '/kanban',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then((result) => {
                    console.log(result);
                    let data = result.data.result
                    this.kanbandata = data

                })
                .catch()
        },
        addKanban() {
            let title = this.newkanbandata.title
            let description = this.newkanbandata.description

            axios({
                    method: 'POST',
                    url: siteurl + '/kanban',
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data: {
                        title,
                        description
                    }
                })
                .then((result) => {
                    console.log("sukses")
                    this.newkanbandata.title = ''
                    this.newkanbandata.description = ''
                    this.addnew = false
                    this.getKanban()
                })
        },
        updateTagForward(id, newtag) {
            switch (newtag) {
                case 'new entry':
                    tag = 'todo'
                    break
                case 'todo':
                    tag = 'on progress'
                    break
                case 'on progress':
                    tag = 'finished'
                    break
                default:
                    break
            }
            axios({
                    method: 'PUT',
                    url: siteurl + '/kanban/' + id,
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data: {
                        tag
                    }
                })
                .then((result) => {
                    this.getKanban()
                })
        },
        updateTagBackward(id, newtag) {
            switch (newtag) {
                case 'todo':
                    tag = 'new entry'
                    break
                case 'on progress':
                    tag = 'todo'
                    break
                case 'finished':
                    tag = 'on progress'
                    break
                default:
                    break
            }
            axios({
                    method: 'PUT',
                    url: siteurl + '/kanban/' + id,
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data: {
                        tag
                    }
                })
                .then((result) => {
                    this.getKanban()
                })
        },

        deleteKanban(id) {
            axios({
                    method: 'DELETE',
                    url: siteurl + '/kanban/' + id,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then((result) => {
                    console.log("sukses")
                    this.getKanban()
                })
                .catch()
        }
    },
    created() {
        console.log('created')
        if (localStorage.access_token) {
            this.isLogin = true
            this.getKanban()
        }
    }

})