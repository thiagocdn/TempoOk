<template>
  <div style='height: 300px; width: 500px'>
    <l-map
      v-if='showMap'
      :zoom='zoom'
      :center='center'
    >
      <l-tile-layer
        :url='url'
        :attribution='attribution'
      />
      <l-marker :lat-lng='markerPosition' :icon='mapIcon'  v-if='latitude !== 0'/>
    </l-map>
  </div>
</template>

<script>
import Leaflet, { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import mapMarker from './map-marker.svg';


const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -60]
});

export default {
  name: 'Map',
  props: ['latitude', 'longitude'],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      mapIcon,
      zoom: 6,
      markerPosition: latLng(this.latitude, this.longitude),
      center: latLng(-21.829731, -44.7994807),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        showMap: true
    };
  },
};
</script>
