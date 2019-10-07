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
        <v-btn
          text
          dark
          v-for="item in menuItems"
          v-if="item.isLoggedIn"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text dark v-if="!isLoggedIn" @click="logout">
          <v-icon>mdi-logout</v-icon>LogOut
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="drawer" color="grey lighten-4" app>
      <v-list v-for="item in menuItems" :key="item.title">
        <v-list-item v-if="item.isLoggedIn" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-btn flat text v-if="!isLoggedIn" @click="logout" class="ma-6">
        <v-icon left>mdi-logout</v-icon>Logout
      </v-btn>
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
      currentUser: false,
      menuItems: [
        {
          icon: "mdi-cube-unfolded",
          title: "Dashboard",
          link: "/",
          isLoggedIn: true
        },
        {
          icon: "mdi-plus-box-multiple",
          title: "Create Book",
          link: "/add",
          isLoggedIn: true
        },
        {
          icon: "mdi-information-outline",
          title: "About",
          link: "/about",
          isLoggedIn: true
        },
        {
          icon: "mdi-login",
          title: "Login",
          link: "/login",
          isLoggedIn: true
        },
        {
          icon: "mdi-account-plus-outline",
          title: "Register",
          link: "/register",
          isLoggedIn: true
        }
      ]
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
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
</style>
