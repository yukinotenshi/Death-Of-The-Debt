<template>
  <v-container fluid class="page" id="gameplay">
    <div id="map"></div>
  </v-container>
</template>

<script>
import gmapsInit from './../../assets/js/gmaps';
import mapStyle from './../../assets/js/mapStyle';

export default {
  name: 'Gameplay',
  async mounted() {
    try {
      const center = {lat: -6.89060785, lng: 107.61032348};
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.querySelector('#map'), {zoom: 18, center});
      const styledMapType = new google.maps.StyledMapType(mapStyle);

      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    } catch (error) {
      console.error(error);
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/css/style.scss';

#map {
  height: 100vh;
  width: 100vw;
}
</style>
