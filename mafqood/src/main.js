// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyBs-YqRMusXKW2Mkp9kXqBoGWrQM9RbcEk',
  authDomain: 'mafqood-hackathon.firebaseapp.com',
  databaseURL: 'https://mafqood-hackathon.firebaseio.com',
  projectId: 'mafqood-hackathon',
  storageBucket: 'mafqood-hackathon.appspot.com',
  messagingSenderId: '57586970217'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
