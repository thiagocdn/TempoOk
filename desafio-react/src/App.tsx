import React, { useEffect, useState } from 'react';
import {
  Container,
  PickerContainer,
  MapWrapper,
  GraphContainer,
} from './styles';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Chart from 'chart.js';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import data from './api.json';
import mapMarker from './map-marker.svg';

interface CitiesInterface {
  city: string,
  state: string;
}

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -60]
});


function App() {
  const [city, setCity] = useState(-1);
  const [cities, setCities] = useState([{} as CitiesInterface]);

  useEffect(() => {
    if(city === -1) {
      return;
    }

    new Chart('myChart', {
      type: 'line',
      data: {
        labels: [ ...data.stations[city].time.map(date => {
          const hour = new Date(date);
          return hour.getHours();
        })] ,
        datasets: [
          {
            data: [ ... data.stations[city].data.air_temperature]
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      },
    });

  }, [city])

  useEffect(() => {
    const defCities = data.stations.map(station => {
      return {
        city: station.station.city,
        state: station.station.state,
      }
    });
    setCities(defCities);
  }, [])

  function handleSetCity (event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if(value === "") return;
    if(value.indexOf(" - ") === -1){
      setCity(-1)
      return;
    };
    const check = value.split(' - ')

    const checkCity = cities.findIndex(city => city.city === check[0]);
    const checkState = cities.findIndex(state => state.state === check[1]);
    
    if((checkCity || checkState) === -1) {
      setCity(-1)
      return;
    }
    console.log(city);
    setCity(data.stations.findIndex(station => station.station.city === check[0]));
  }

  return (
    <Container>

      <PickerContainer>
        <select onChange={handleSetCity}>
          <option value="Selecione uma cidade">Selecione uma cidade</option>
          {cities.map(data => {
            return <option key={`${data.city} - ${data.state}`} value={`${data.city} - ${data.state}`}>{`${data.city} - ${data.state}`}</option>
          })}
        </select>
      </PickerContainer>

      <MapWrapper>
        <MapContainer
          center={[-21.829731, -44.7994807]}
          zoom={6}
          style={{
            width: '100%',
            height: '100%'
          }}
          zoomControl={false}
        >
          <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          { city !== -1 && (
            <Marker
              icon={mapIcon}
              position={
                [data.stations[city].station.latitude,
                data.stations[city].station.longitude]
              }
            />
          )}
        </MapContainer>
      </MapWrapper>

      <GraphContainer>
        {city !== -1 && (
          <canvas id="myChart" width="700" height="350"></canvas>
        )}
      </GraphContainer>

    </Container>
  );
}

export default App;
