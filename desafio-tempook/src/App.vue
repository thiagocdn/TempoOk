<template>
  <div id='app'>
    <select style='margin: 10px' @change='handleSetCity'>
      <option value='Selecione uma cidade'>Selecione uma cidade</option>
      <option v-for='city in cities' v-bind:key='city.city'>{{city.city}} - {{city.state}}</option>
    </select>

    <Map :latitude='latitude' :longitude='longitude' :key='latitude'/>

    <Chart :graphData='graphData' :key='longitude'/>

  </div>
</template>


<script>
import api from './api.json';
import Map from './components/Map';
import Chart from './components/Chart';

const cities = api.stations.map(station => {
  return {
    city: station.station.city,
    state: station.station.state,
  }
});

export default {
  name: 'App',
  components: {
    Map,
    Chart,
  },
  city: -1,
  methods: {
    handleSetCity: function(event) {
      const value = event.target.value;
      if(value === '') return;
      if(value.indexOf(' - ') === -1){
        this.city = -1;
      }
      const check = value.split(' - ')

      const checkCity = cities.findIndex(city => city.city === check[0]);
      const checkState = cities.findIndex(state => state.state === check[1]);
      
      if((checkCity || checkState) === -1) {
        this.city = -1;
      }
      
      this.city = (api.stations.findIndex(station => station.station.city === check[0]));
      this.latitude = this.city !== -1 ? api.stations[this.city].station.latitude : 0;
      this.longitude = this.city !== -1 ? api.stations[this.city].station.longitude : 0;
      this.graphData = this.city !== -1
        ?  {
          y: [... api.stations[this.city].data.air_temperature],
          x: [... api.stations[this.city].time.map(date => {
            const hour = new Date(date);
            return hour.getHours();
          })],
        } : {
          x: [],
          y: [],
        };
    },
  },
  data() {
    const cities = api.stations.map(station => {
      return {
        city: station.station.city,
        state: station.station.state,
      }
    });
    const latitude = 1;
    const longitude = 0;
    const graphData = [];
    return {
      cities,
      latitude,
      longitude,
      graphData,
    }
  }
}
</script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
