document.addEventListener("DOMContentLoaded", function () {
  const fetchWeatherData = async (city) => {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
      method: 'GET',
      headers: {
        //API key and host from "Weather API" - by API Ninjas
        'X-RapidAPI-Key': 'e7b52baf8amsh9f7ca0109578925p130fe0jsnaa87cbed57e4',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      // Dynamically updating city name
      document.getElementById('cityName').textContent = city;

      // City weather details
      document.getElementById('cloud_pct').innerHTML = result.cloud_pct;
      document.getElementById('temp').innerHTML = result.temp;
      document.getElementById('feels_like').innerHTML = result.feels_like;
      document.getElementById('humidity').innerHTML = result.humidity;
      document.getElementById('min_temp').innerHTML = result.min_temp;
      document.getElementById('max_temp').innerHTML = result.max_temp;
      document.getElementById('wind_speed').innerHTML = result.wind_speed;
      document.getElementById('wind_degrees').innerHTML = result.wind_degrees;
      document.getElementById('sunrise').innerHTML = result.sunrise;
      /* document.getElementById('sunset').innerHTML = result.sunset; */

      // Function call to update weather for common cities
      updateCommonCitiesWeather();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Function to update Common cities table
  const updateCommonCitiesWeather = async () => {
    const commonCities = ["Delhi", "Kolkata", "Chennai", "Mumbai", "Bangalore"];  //Common indian cities

    for (const city of commonCities) {
      const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e7b52baf8amsh9f7ca0109578925p130fe0jsnaa87cbed57e4',
          'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Identify the required row in the table and update its cells
        const commonCityRow = document.getElementById(`common_city_row_${city}`);
        commonCityRow.innerHTML = `
          <td>${city}</td>
          <td>${result.cloud_pct}</td>
          <td>${result.temp}</td>
          <td>${result.feels_like}</td>
          <td>${result.humidity}</td>
          <td>${result.min_temp}</td>
          <td>${result.max_temp}</td>
          <td>${result.wind_speed}</td>
          <td>${result.wind_degrees}</td>
          <td>${result.sunrise}</td>
          <td>${result.sunset}</td>
        `;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const submit = document.getElementById('submit');
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('city');
    fetchWeatherData(cityInput.value);
  });

  // Function call to start the API request for default city (Delhi)
  fetchWeatherData("Delhi");
});
