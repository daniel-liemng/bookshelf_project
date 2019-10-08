<template>
  <div>
    <v-app-bar color="pink" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-flex d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" class="text-uppercase">
          <v-icon x-large left>mdi-book-open-page-variant</v-icon>BookShelf
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn text dark v-if="!isLoggedIn" to="/">
          <v-icon left>mdi-cube-unfolded</v-icon>Dashboard
        </v-btn>
        <v-btn text dark v-if="!isLoggedIn" to="/add">
          <v-icon left>mdi-plus-box-multiple</v-icon>Create a Book
        </v-btn>
        <v-btn text dark v-if="!isLoggedIn" to="/about">
          <v-icon left>mdi-information-outline</v-icon>About
        </v-btn>
        <v-btn text dark v-if="!isLoggedIn" to="/login">
          <v-icon left>mdi-login</v-icon>Sign In
        </v-btn>
        <v-btn text dark v-if="!isLoggedIn" to="/register">
          <v-icon left>mdi-account-plus-outline</v-icon>Register
        </v-btn>
        <v-btn text dark v-if="!isLoggedIn" @click="logout">
          <v-icon left>mdi-logout</v-icon>Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="drawer" color="grey lighten-4" app>
      <v-list>
        <v-list-item v-if="!isLoggedIn" to="/">
          <v-list-item-icon>
            <v-icon>mdi-cube-unfolded</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn" to="/add">
          <v-list-item-icon>
            <v-icon>mdi-plus-box-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Create a Book</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn" to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn" to="/login">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn" to="/register">
          <v-list-item-icon>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      drawer: false,
      // auth
      isLoggedIn: false,
      currentUser: false
      // menuItems: [
      //   {
      //     icon: "mdi-cube-unfolded",
      //     title: "Dashboard",
      //     link: "/",
      //     isLoggedIn: true
      //   },
      //   {
      //     icon: "mdi-plus-box-multiple",
      //     title: "Create Book",
      //     link: "/add",
      //     isLoggedIn: true
      //   },
      //   {
      //     icon: "mdi-information-outline",
      //     title: "About",
      //     link: "/about",
      //     isLoggedIn: true
      //   },
      //   {
      //     icon: "mdi-login",
      //     title: "Login",
      //     link: "/login",
      //     isLoggedIn: true
      //   },
      //   {
      //     icon: "mdi-account-plus-outline",
      //     title: "Register",
      //     link: "/register",
      //     isLoggedIn: true
      //   }
      // ]
    };
  },
  create() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.$router.push("/login");
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style>
</style>
