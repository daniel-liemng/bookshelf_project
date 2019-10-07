<template>
  <div id="register">
    <v-container>
      <v-card max-width="600px" class="mx-auto mt-5">
        <v-card-title class="pink white--text">Register</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onRegister">
            <v-text-field type="email" v-model="email" label="Email" required></v-text-field>
            <v-text-field type="password" v-model="password" label="Password" required></v-text-field>

            <div class="mt-3">
              <v-btn class="ma-2" outlined color="pink" type="submit">Register</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account created for ${this.email}`);
            this.$router.push("/");
          },
          err => alert(err.message)
        );
      e.preventDefault();
    }
  }
};
</script>

<style>
</style>
