import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.config.productionTip = false

new Vue({
    GoogleSignInButton,
    render: h => h(App)
}).$mount('#app');

// const gauthOption = {
//   clientId: '1043279586008-aibiiffrpqe0h9vm1d7gmo9grvte499k.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

// const Bearer = require('@bearer/node-agent')
// await Bearer.init({
//   secretKey: "sk_production_Kg7o63YbzoXji7jE-M07rFBwJBiLFQ2A",
//   ignored: ["api-domain-to-ignore.com"],
//   stripSensitiveData: true,
//   stripSensitiveKeys: /^authorization$|^client.?id$|^access.?token$|^client.?secret$/i
// })