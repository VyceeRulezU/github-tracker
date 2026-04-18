const WEATHER_BASE_URL = 'https://wttr.in';

export const weatherService = {
  /**
   * Returns the URL for a city's weather data in JSON format.
   * @param {string} city 
   * @returns {string}
   */
  getWeatherUrl: (city) => `${WEATHER_BASE_URL}/${city}?format=j1`,
};
