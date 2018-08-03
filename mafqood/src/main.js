// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'firebaseui/dist/firebaseui.css'
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify, {
  iconfont: 'fa'
});

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyBs-YqRMusXKW2Mkp9kXqBoGWrQM9RbcEk',
  authDomain: 'mafqood-hackathon.firebaseapp.com',
  databaseURL: 'https://mafqood-hackathon.firebaseio.com',
  projectId: 'mafqood-hackathon',
  storageBucket: 'mafqood-hackathon.appspot.com',
  messagingSenderId: '57586970217'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created: function () {
    firebase.initializeApp(config)

    let vue = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vue.$router.push('/mypeople')
        user.getIdToken().then(function (accessToken) {})
      } else {
        vue.$router.push('/sign-up')
      }
    }, function (error) {
      console.log(error)
    })
  },
  components: {
    App
  },
  template: '<App/>'
})
