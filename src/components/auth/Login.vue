<template>
  <div id="login">
    <v-container>
      <v-card max-width="600px" class="mx-auto mt-5">
        <v-card-title class="pink white--text">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onLogin">
            <v-text-field type="email" v-model="email" label="Email" required></v-text-field>
            <v-text-field type="password" v-model="password" label="Password" required></v-text-field>

            <div class="mt-3">
              <v-btn class="ma-2" outlined color="pink" type="submit">Login</v-btn>
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
    onLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${this.email}`);
            // this.$router.push("/");
            this.$router.go({ path: this.$router.path });
          },
          err => alert(err.message)
        );
    }
  }
};
</script>

<style>
</style>
