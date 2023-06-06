<template>
  <v-main>
    <v-container>
      <v-row class="mt-4" justify="center">
        <v-col cols="12" md="8" sm="8">
          <v-text-field
            v-model="inputValue"
            label="Search for a city"
            outlined
            :items="autocompleteOptions"
            item-text="name"
            @input="fetchAutocompleteOptions"
            clearable
          ></v-text-field>
          <v-list v-if="autocompleteOptions.length" class="mb-5">
            <v-list-item
              v-for="option in autocompleteOptions"
              :key="option.geonameId"
              @click="selectOption(option)"
            >
              <v-list-item-title>{{ option.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-btn large class="mt-3" color="primary" @click="getWeather"
            >Get Weather</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <h2 class="mx-auto" v-if="weatherData.length">
          {{ weatherCity.name }}, {{ weatherCity.country }}
        </h2>
      </v-row>
      <v-row class="mt-4">
        <v-col
          v-for="weather in weatherData"
          :key="weather.dt"
          cols="12"
          md="4"
          sm="12"
        >
          <v-card class="mb-4" dark>
            <v-card-actions>
              <v-icon color="primary">{{
                getWeatherIcon(weather.weather[0].icon)
              }}</v-icon>
            </v-card-actions>
            <v-card-title class="headline">
              {{ formatDate(weather.dt_txt) }}
            </v-card-title>
            <v-card-text>
              <p>Temperature: {{ weather.main.temp }}°C</p>
              <p>Weather: {{ weather.weather[0].description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const inputValue = ref("");
    const autocompleteOptions = ref([]);
    const weatherData = ref([]);
    const weatherCity = ref([]);

    const fetchAutocompleteOptions = async () => {
      try {
        const response = await axios.get(
          `https://api.geonames.org/searchJSON?q=${inputValue.value}&maxRows=5&featureCode=PPLA&fclass=P&username=${process.env.VUE_APP_CITY_API_KEY}`
        );
        autocompleteOptions.value = response.data.geonames;
      } catch (error) {
        console.error(error);
      }
    };

    const selectOption = (option) => {
      inputValue.value = option.name;
      autocompleteOptions.value = [];
    };

    const getWeather = () => {
      const city = inputValue.value;
      const key = process.env.VUE_APP_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        key +
        "&units=metric";

      // Make the API call to OpenWeatherMap
      axios
        .get(apiUrl)
        .then((response) => {
          weatherData.value = response.data.list;
          weatherCity.value = response.data.city;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const formatDate = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return dateTime.toLocaleDateString("en-US", options);
    };

    const getWeatherIcon = (iconCode) => {
      // Mapping of icon codes to Vuetify icons
      const iconMap = {
        "01d": "mdi-weather-sunny",
        "01n": "mdi-weather-night",
        "02d": "mdi-weather-partly-cloudy",
        "02n": "mdi-weather-partly-cloudy",
        "04n": "mdi-weather-partly-cloudy",
        "03d": "mdi-weather-cloudy",
        "03n": "mdi-weather-cloudy",
        "04d": "mdi-weather-cloudy",
        "10d": "mdi-weather-pouring",
        "10n": "mdi-weather-pouring",
      };
      return iconMap[iconCode] || "mdi-weather";
    };

    return {
      inputValue,
      autocompleteOptions,
      fetchAutocompleteOptions,
      selectOption,
      getWeather,
      weatherData,
      weatherCity,
      formatDate,
      getWeatherIcon,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-input__details {
  display: none;
}
</style>
