import Vue from 'vue'
import App from './App.vue'
import GSignInButton from 'vue-google-signin-button'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2);
Vue.use(GSignInButton)
new Vue({
    render: h => h(App)
}).$mount('#app') 