import Vue from 'vue';
import App from './App.vue'
import VueToast from 'vue-toast-notification';
// Import any of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';
 
Vue.use(VueToast, {
  // One of options
  position: 'top'
})
new Vue({
    render: h => h(App),
  }).$mount('#app');