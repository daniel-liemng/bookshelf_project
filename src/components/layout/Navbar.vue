<template>
  <div>
    <v-app-bar color="pink" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-flex d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/home" tag="span" style="cursor: pointer" class="text-uppercase">
          <v-icon x-large left>mdi-book-open-page-variant</v-icon>BookShelf
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="d-none d-md-flex" v-for="item in menuItems" :key="item.title">
        <v-btn text dark :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="drawer" color="grey lighten-4" app>
      <v-list v-for="item in menuItems" :key="item.title">
        <v-list-item :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: "mdi-cube-unfolded", title: "Dashboard", link: "/" },
        { icon: "mdi-plus-box-multiple", title: "Create Book", link: "/add" },
        { icon: "mdi-information-outline", title: "About", link: "/about" }
      ]
    };
  }
};
</script>

<style>
</style>
