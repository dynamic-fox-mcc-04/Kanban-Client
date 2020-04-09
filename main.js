import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App.vue'
import Toasted from 'vue-toasted';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button'
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.config.productionTip = false

Vue.use(GSignInButton)


const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '50px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000,
  type: 'success',
  theme: 'bubble'
  
})
Vue.use(BootstrapVue)

new Vue({
  GoogleSignInButton,
  ...App
}).$mount('#app')