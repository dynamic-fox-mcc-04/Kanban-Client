import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
 

const gauthOption = {
    clientId: '818227313308-aq29a62g2ajfm84ovvm6ba7dgb40mcmo.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
  }
  Vue.use(GAuth, gauthOption)