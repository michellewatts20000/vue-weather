<template>
  <v-container fluid>
    <WeatherView />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherView from "@/components/WeatherView.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    WeatherView,
  },
});
</script>
