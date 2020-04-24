import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

// const gauthOption = {
//   clientId: '818227313308-aq29a62g2ajfm84ovvm6ba7dgb40mcmo.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)
new Vue({    
    render: h => h(App)
}).$mount('#App');