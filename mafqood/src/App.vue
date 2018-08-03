<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>
          <img src="
  https://firebasestorage.googleapis.com/v0/b/mafqood-hackathon.appspot.com/o/FUoneJSK4AeVZlTldUoBDgL0uer1%2Fpeople%2Fdsadasasdasd%2Fimage.jpg?alt=media&token=a46134a2-52f0-42e8-a138-ec032e06ce25
" alt=""
  style=" max-width: 55px; max-height: 50px; "
>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>My Group</v-btn>
        <v-btn flat>Report Found Person</v-btn>
        <v-btn flat>My Items</v-btn>
   </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
  <v-btn @click="logOut">Log out</v-btn>
</v-footer>
  </v-app>

</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
