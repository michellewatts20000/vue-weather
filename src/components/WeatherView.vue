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
            @click:clear="clearWeatherResults"
            @keydown.enter="getWeather"
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
          <v-btn
            large
            rounded="0"
            elevation="0"
            class="mt-3"
            color="primary"
            @click="getWeather"
            :disabled="isFetching"
          >
            <span v-if="isFetching">Loading...</span>
            <!-- Show loading spinner -->
            <span v-else>Get Weather</span></v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="mt-5" v-if="weatherData.length">
            Weather for {{ weatherCity.name }}, {{ weatherCity.country }}
          </h2>
          <v-alert
            type="error"
            v-if="isError"
            closable
            @click:close="handleAlertClose"
            :text="errorMessage"
          ></v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col
          v-for="weather in weatherData"
          :key="weather.dt"
          cols="12"
          md="4"
          sm="12"
        >
          <v-card class="mb-4">
            <v-card-item
              :title="`${getDayOfWeek(weather.dt_txt)}, ${formatDate(
                weather.dt_txt
              )}`"
            >
              <template v-slot:subtitle>
                UV Index:
                <v-chip :color="getUvIndexColor(weatherUV)" dark label>
                  {{ weatherUV }}
                </v-chip>
              </template>
            </v-card-item>
            <v-card-text class="py-0">
              <v-row no-gutters>
                <v-col class="text-h2 mt-2" cols="8">
                  {{ weather.main.temp.toFixed(0) }}&deg;C
                </v-col>

                <v-col cols="4" class="text-right">
                  <v-icon
                    color="secondary"
                    :icon="getWeatherIcon(weather.weather[0].icon)"
                    size="88"
                  ></v-icon>
                </v-col>
              </v-row>
            </v-card-text>

            <div class="d-flex py-3 justify-space-between">
              <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                <v-list-item-subtitle
                  >{{
                    (weather.wind.speed * 3.6).toFixed(2)
                  }}
                  km/h</v-list-item-subtitle
                >
              </v-list-item>

              <v-list-item
                density="compact"
                :prepend-icon="getWeatherIcon(weather.weather[0].icon)"
              >
                <v-list-item-subtitle
                  >{{ weather.main.humidity }}%</v-list-item-subtitle
                >
              </v-list-item>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { ref, watch } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  setup() {
    const inputValue = ref("");
    const autocompleteOptions = ref([]);
    const weatherData = ref([]);
    const weatherCity = ref([]);
    const weatherUV = ref([]);
    const isFetching = ref(false); // Add a loading state
    const isError = ref(false);
    const errorMessage = ref("");

    const fetchAutocompleteOptions = async () => {
      try {
        const response = await axios.get(
          `https://secure.geonames.org/searchJSON?q=${inputValue.value}&maxRows=5&featureCode=PPLA&fclass=P&username=${process.env.VUE_APP_CITY_API_KEY}`
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
      isFetching.value = true;
      autocompleteOptions.value = [];
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
          const filteredData = response.data.list.filter((item) => {
            const time = new Date(item.dt_txt).getUTCHours();
            return time === 23;
          });
          weatherData.value = filteredData;
          weatherCity.value = response.data.city;
          getUvIndex(weatherCity.value.coord.lat, weatherCity.value.coord.lon);
          isFetching.value = false;
        })
        .catch((error) => {
          console.error(error);
          isFetching.value = false;
          isError.value = true;
          errorMessage.value = `${error.response.data.cod}: ${error.response.data.message}`;
        });
    };

    const getUvIndex = function (lat, lon) {
      var key = process.env.VUE_APP_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
      var apiURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        key +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      fetch(apiURL)
        .then(function (response) {
          response.json().then(function (data) {
            weatherUV.value = data.value;
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    const formatDate = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const options = {
        month: "short",
        day: "numeric",
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

    const getUvIndexColor = (uvIndex) => {
      if (uvIndex <= 3) {
        return "orange";
      } else {
        return "red";
      }
    };

    const getDayOfWeek = (dateString) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date(dateString);
      const dayOfWeek = date.getDay();
      return daysOfWeek[dayOfWeek];
    };

    const clearWeatherResults = () => {
      weatherData.value = []; // Clear the weatherData array
      weatherCity.value = null; // Clear the weatherCity object
      weatherUV.value = null; // Clear the weatherUV value
    };

    const handleAlertClose = () => {
      isError.value = false;
      inputValue.value = "";
    };

    return {
      inputValue,
      autocompleteOptions,
      fetchAutocompleteOptions,
      selectOption,
      getWeather,
      weatherData,
      weatherCity,
      weatherUV,
      formatDate,
      getWeatherIcon,
      getUvIndex,
      getUvIndexColor,
      getDayOfWeek,
      clearWeatherResults,
      isFetching,
      isError,
      errorMessage,
      handleAlertClose,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-input__details {
  display: none;
}
</style>
