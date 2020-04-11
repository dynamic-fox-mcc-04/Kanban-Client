import Vue from 'vue';
import App from './App.vue';
import VueSimpleAlert from "vue-simple-alert";
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.config.productionTip = false
Vue.use(VueSimpleAlert);

new Vue({
    GoogleSignInButton,
    render: h => h(App)
}).$mount('#app');

