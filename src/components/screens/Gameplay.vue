<template>
  <v-container fluid class="page" id="gameplay">
    <div id="gamescreen">
      <div id="gamescreen__top">
        <div>
          <h2>Remaining Time</h2>
          <h1>09:13</h1>
        </div>
        <div>
          <h2>Current Item</h2>
        </div>
      </div>
      <div id="gamescreen__bottom">
        <div>
          <button>
            Catch Mode
          </button>
        </div>
      </div>
    </div>
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

#gameplay {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

#gamescreen {
  position: absolute;
  z-index: 99;
  padding: 2rem;
  height: calc(100% - 4rem);
  width: calc(100% - 4rem);

  h1, h2 {
    margin: 0;
  }

  #gamescreen__top {
    display: flex;
    flex-direction: row;
    
    >div:first-child {
      flex: 1 0 0;
      h1 {
        font-size: 4rem;
      }
    }

    >div:last-child {
      flex: 1 0 0;
      text-align: right;
    }
  }

  #gamescreen__bottom {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 2rem;
    width: calc(100% - 4rem);
  }
}

button {
  cursor: pointer;
  background-color: grey;
  border: 0;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  border-radius: 10px;
}

#map {
  height: 100%;
  width: 100%;
}
</style>
