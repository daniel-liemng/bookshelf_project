<template>
  <v-app>
    <Navbar />
    <v-content>
      <div class="container">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    //
  })
};
</script>

<style>
</style>
