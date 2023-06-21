
# React Weather App
This is a React website that allows users to search for weather information of different cities. It uses the OpenWeatherMap API to retrieve weather data and the Geonames API for city autocomplete functionality.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:
`npm install`

## Usage
To run the React website, use the following command:
`npm start`
The website will be accessible at http://localhost:3000.

## Features
Search for a city and get its weather forecast.
Autocomplete functionality for city names.
Display weather information for the selected city, including temperature, UV index, wind speed, and humidity.
Show weather icons based on the current weather conditions.
Error handling for API requests and displaying error messages.

## Dependencies
The following dependencies are used in this project:

Vue.js: A JavaScript framework for building user interfaces.
Axios: A library for making HTTP requests.
Vuetify: A material design component framework for Vue.js.
Chart.js: A JavaScript charting library.

## Configuration
To use the OpenWeatherMap and Geonames APIs, you need to provide the API keys in the appropriate places in the code: replace process.env.VUE_APP_WEATHER_API_KEY in the code with your OpenWeatherMap API key. You can obtain an API key by signing up on the OpenWeatherMap website.
Geonames API Key: Replace process.env.VUE_APP_CITY_API_KEY in the code with your Geonames API key. You can get an API key by creating an account on the Geonames website.
Make sure to store your API keys securely and avoid committing them to version control.

## License
This project is licensed under the MIT License.