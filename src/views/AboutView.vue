<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="8" class="my-10">
        <h1 class="mb-5">About the weather dashboard</h1>
        <p>
          The "Weather Dashboard" app is a modern web application that allows
          users to search for cities and retrieve weather information. Built
          using Vue.js and Vuetify, the app provides a user-friendly interface
          for searching cities and displaying relevant weather forecasts.
        </p>

        <h2 class="mt-4 mb-2">Key Features:</h2>

        <ul>
          <li>
            <strong>Autocomplete Search:</strong> The app includes an input
            field with autocomplete functionality, which suggests city names as
            the user types. It uses the GeoNames API to fetch relevant city data
            based on the user's input.
          </li>
          <li>
            <strong>Weather Forecast:</strong> Once the user selects a city from
            the autocomplete options, the app retrieves weather information from
            the OpenWeatherMap API. It displays the current weather conditions
            and a five-day forecast for the selected city.
          </li>
          <li>
            <strong>Stylish UI:</strong> The app features a modern and visually
            appealing user interface. It utilizes Vuetify's material design
            components and icons to create an elegant and responsive layout.
          </li>
          <li>
            <strong>Clearable Input:</strong> The input field is equipped with a
            clearable button, allowing users to easily remove their input and
            start a new search.
          </li>
          <li>
            <strong>Weather Icons:</strong> The app dynamically displays weather
            icons based on the weather conditions returned by the OpenWeatherMap
            API. The icons provide visual representation of the weather,
            enhancing the user experience.
          </li>
          <li>
            <strong>Major Cities:</strong> The app is optimized to search for
            major cities worldwide. It retrieves data for cities with a
            population of 15,000 or more, ensuring that the autocomplete
            suggestions include well-known cities such as Sydney, Tokyo, London,
            New York, Melbourne, and Perth.
          </li>
        </ul>

        <p>
          With the "City Weather Search" app, users can quickly find weather
          information for their desired cities, making it convenient to plan
          their activities and stay informed about the current and upcoming
          weather conditions.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
