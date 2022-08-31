<template>
  <div class="app-wrapper">
    <main>
      <div class="search-box">
        <input type="text" class="search-box__search-bar" placeholder="Search..." v-model="searchQuery"
          @keyup.enter="fetchWeatherData">
      </div>
      <div class="weather-wrap" v-if="typeof weatherData.name != 'undefined'">
        <div class="location-group">
          <div class="location-group__location">{{ weatherData.name }}, {{ weatherData.sys.country }}</div>
          <div class="location-group__date"> {{ dateBuilder() }} </div>
        </div>
        <div class="weather-group">
          <div class="weather-group__weather">{{ weatherData.weather[0].main }}</div>
          <div class="weather-group__temp"> {{ Math.round(weatherData.main.temp) }}°C</div>
          <div class="weather-group__temp-feels"> Feels like {{ Math.round(weatherData.main.feels_like) }}°C </div>
          <img v-bind:src="'http://openweathermap.org/img/wn/' + iconId + '@2x.png'" />
        </div>
        <div class="weather-details-group">
          <h2>Today</h2>
          <div class="div-solid"></div>
          <div class="weather-details-wrapper">
            <div class="weather-details-group__description"> {{ weatherData.weather[0].description }}<p>Clouds</p>
            </div>
            <div class="div-solid-right"></div>
            <div class="weather-details-group__humidity"> {{ weatherData.main.humidity }}%<p>Humidity</p>
            </div>
            <div class="div-solid-right"></div>
            <div class="weather-details-group__temp-min"> {{ Math.round(weatherData.main.temp_min) }}°C<p>Min Temp</p>
            </div>
            <div class="div-solid-right"></div>
            <div class="weather-details-group__temp-max"> {{ Math.round(weatherData.main.temp_max) }}°C<p>Max Temp</p>
            </div>
            <div class="div-solid-right"></div>
            <div class="weather-details-group__wind-speed"> {{ weatherData.wind.speed }}km/h<p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      api_key: '8c33274f87d09688f9d5cedc427029a9',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      searchQuery: '',
      weatherData: {},
      iconId: ''
    }
  },
  created() {
    const location = localStorage.getItem("location") || "";
    console.log(location);
    //this.searchQuery = location;
    const data = JSON.parse(localStorage.getItem("weatherData") || []);
    this.weatherData = data;
    this.iconId = this.weatherData.weather[0].icon;
    console.log(this.iconId);
  },
  methods: {
    fetchWeatherData() {
      localStorage.setItem('location', this.searchQuery)
      this.dateBuilder();
      console.log(this.searchQuery);
      fetch(`${this.url_base}weather?q=${this.searchQuery}&units=metric&APPID=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResult);
    },
    setResult(datas) {
      console.log(datas);
      this.weatherData = datas;
      localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
      this.iconId = this.weatherData.weather[0].icon;
    },
    dateBuilder() {
      let date = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[date.getDay()];
      let currentDate = date.getDate();
      let month = months[date.getMonth()];
      let year = date.getFullYear();

      return `${day} ${currentDate} ${month} ${year}`;
    }
  }
}
</script>

<style lang="scss">
$light: #EEE;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;

}

.app-wrapper {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('./assets/warm-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

main {
  width: 40%;
  min-height: 100vh;
  padding: 60px 0 25px 0;
}

.search-box {
  width: 100%;
  margin-bottom: 50px;

  &__search-bar {
    display: block;
    min-width: 100%;
    padding: 15px;
    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;

    &:focus {
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 16px 0px 16px 0px;
    }
  }
}

.location-group {
  text-align: center;

  &__location {
    color: $light;
    font-size: 32px;
    font-weight: 500;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  &__date {
    color: $light;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
  }
}

.weather-group {
  margin-top: 90px;
  text-align: center;

  &__temp {
    font-size: 6rem;
    color: $light;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  &__temp-feels {
    color: $light;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    font-size: 16px;
    font-weight: 500;
  }

  &__weather {
    color: $light;
    font-size: 32px;
    font-weight: 500;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }
}

.div-solid {
  margin-top: 15px;
  border-bottom: 1px solid $light;
}

.weather-details-group {
  margin-top: 50px;
  text-align: center;

  & h2 {
    color: $light;
  }

  &__description {}

  &__wind-speed {
    border-right: 0px solid $light  !important;
  }
}

.weather-details-wrapper {
  margin: 0 auto;
  width: 90%;
  padding: 25px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 20px;
  overflow: hidden;
  color: $light;

  & p {
    font-size: 18px;
  }

}

.div-solid-right {
  height: 30px;
  border-right: 1px solid $light;

}
</style>
