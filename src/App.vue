<template>
  <v-app class="app-container">
    <v-toolbar color="primary">
      <v-toolbar-title class="mr-5">
        <span class="font-weight-bold">Weather App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" text exact>Home</v-btn>
        <v-btn to="/about" text>About</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
@import "./scss/app.scss";
.app-container {
  background-color: #f5f5f5;
  background-image: $background-image;
  background-size: cover;
  background-repeat: $background-repeat;
}
</style>
