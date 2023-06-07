<template>
  <v-app class="app-container">
    <v-toolbar color="primary">
      <v-toolbar-title class="mr-5">
        <router-link to="/" class="icon-link">
          <v-icon class="mdi mdi-cloud" style="color: white"></v-icon>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" text exact>Home</v-btn>
        <v-btn to="/about" text>About</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div>
      <router-view />
    </div>
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
