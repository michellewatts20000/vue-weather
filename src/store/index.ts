import { createStore, Store } from "vuex";
import { Commit } from "vuex";

interface RootState {
  inputValue: string;
  autocompleteOptions: any[];
  weatherData: any[];
  weatherCity: any[];
}

const store: Store<RootState> = createStore({
  state: {
    inputValue: "",
    autocompleteOptions: [],
    weatherData: [],
    weatherCity: [],
  },
  mutations: {
    setInputValue(state: RootState, value: string) {
      state.inputValue = value;
    },
    setAutocompleteOptions(state: RootState, options: any[]) {
      state.autocompleteOptions = options;
    },
    setWeatherData(state: RootState, data: any[]) {
      state.weatherData = data;
    },
    setWeatherCity(state: RootState, city: any) {
      state.weatherCity = city;
    },
  },
  actions: {
    fetchAutocompleteOptions({ commit }: { commit: Commit }) {
      // Your existing implementation
      // Replace `inputValue` with `state.inputValue`
    },
    selectOption(
      { commit, state }: { commit: Commit; state: RootState },
      option: any
    ) {
      // Your existing implementation
      // Replace `inputValue` and `autocompleteOptions` with `state.inputValue` and `state.autocompleteOptions`
    },
    getWeather({ commit, state }: { commit: Commit; state: RootState }) {
      // Your existing implementation
      // Replace `inputValue`, `weatherData`, and `weatherCity` with `state.inputValue`, `state.weatherData`, and `state.weatherCity`
    },
  },
  getters: {
    formattedDate: (state: RootState) => (dateTimeString: string) => {
      // Your existing implementation
      // Replace `formatDate` with `state.formatDate`
    },
    weatherIcon: (state: RootState) => (iconCode: string) => {
      // Your existing implementation
      // Replace `getWeatherIcon` with `state.getWeatherIcon`
    },
  },
});

export default store;
