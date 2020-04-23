import Vue from 'vue';
import App from './App.vue';
// import axios from 'axios'
import Toasted from "vue-toasted"
import GSignInButton from 'vue-google-signin-button'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// const cors = require('cors')
// import socketio from 'socket.io';
// import io from 'socket.io-client'
// const BASEURL = 'http://localhost:3001'
// import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:4113');
// const BASESOCKET = io(BASEURL)

// Vue.use(VueSocketIO, BASESOCKET)

// Vue.use(cors())

Vue.use(Toasted, {
  duration: 2500,
  position: "bottom-right",
})
Vue.use(GSignInButton)
new Vue({
  render: h => h(App),
}).$mount('#app');