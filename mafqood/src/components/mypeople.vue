<template>
  <v-container fluid grid-list-md>

  <v-layout>

    <v-flex xs12 sm6 v-for="person in userPeople" v-bind:key="person.imageurl" >
      <v-card color="cyan darken-2" class="white--text">
        <v-layout>
          <v-flex xs5>
            <v-card-media  height="125px" contain>
              <v-avatar color="grey lighten-4">
                <img :src="person.imgurl" alt="avatar">
              </v-avatar>
            </v-card-media>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{person.firstname + " " + person.lastname }}</div>
                <div>{{person.gender}}</div>
                <div>{{person.age}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          Report missing
          <v-spacer></v-spacer>

  <v-switch label="Not Missing" v-model="person.missing"></v-switch>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>




  <v-dialog v-model="dialog" persistent scrollable max-width="500px">
    <v-btn absolute dark fab top right
    slot="activator"
    color="red">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field v-model="newPerson.firstname" label="Legal first name" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="newPerson.lastname" label="Legal last name" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select v-model="newPerson.age" :items="['0-5','6-12','12-17','18-29', '30-40', '41-50', '50-60', '60+']" label="Age" required></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select v-model="newPerson.gender" :items="['Male', 'Female']" label="Gender" required></v-select>
            </v-flex>
            <v-flex xs12>
              <div>
                <div class="file-upload-form">
                  Upload an image file:
                  <input type="file" @change="previewImage" accept="image/*">
                </div>
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData">
                </div>
              </div>
            </v-flex>


          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false" v-on:click="addPerson">Add Person</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'mypeople',
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      lastname: '',
      email: '',
      phone: '',
      userPeople: [],
      user: {},
      pagination: {},
      dialog: null,
      newPerson: {},
      imageData: "",
      switch1: false
    }
  },
  created: function (){
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photo = this.user.photoURL;
      this.phone = this.user.phone;
      this.userId = this.user.uid;
    }
    var ref = firebase.database().ref("peopleProfiles/" + this.userId);

    // Attach an asynchronous callback to read the data at our posts reference
    let vue = this;
    ref.on("value", function(snapshot) {
      let people = snapshot.val();
      console.log(Object.values(people))
      vue.userPeople = Object.values(people)
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  },
  methods: {
    previewImage(event) {
      // Reference to the DOM input element
      var input = event.target;

      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
        this.newPerson.imageFile = input.files[0]
      }
    },
    addPerson(){
      this.newPerson.image = this.imageData
      var storageRef = firebase.storage().ref(this.userId + '/people/' + this.newPerson.firstname +
      this.newPerson.lastname + "/image.jpg");

      // Upload file
      let vue = this;
      var task = storageRef.put(this.newPerson.imageFile).then( x => {
        var ref = firebase.database().ref("peopleProfiles/"+vue.userId);
        var storage = firebase.storage();
        var pathReference = storage.ref(vue.userId + '/people/' + vue.newPerson.firstname +
          vue.newPerson.lastname + "/image.jpg");

        var userId = vue.userId
        pathReference.getDownloadURL().then(function(url) {
          ref.push().set({
            firstname: vue.newPerson.firstname,
            lastname: vue.newPerson.lastname,
            age: vue.newPerson.age,
            gender: vue.newPerson.gender,
            imgurl: url,
            lost: false
          });
        });
      });


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.preview{

    max-width: 100%;
    max-height: 200px;

}
</style>
