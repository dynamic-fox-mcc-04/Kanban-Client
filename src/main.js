import Vue from 'vue';
import App from './App.vue';
// import GAuth from 'vue-google-oauth2'

new Vue({
    render: h => h(App)
}).$mount('#app');

// const gauthOption = {
//   clientId: '1043279586008-aibiiffrpqe0h9vm1d7gmo9grvte499k.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)