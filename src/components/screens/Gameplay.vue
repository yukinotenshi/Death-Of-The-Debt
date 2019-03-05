<template>
  <v-container fluid class="page" id="gameplay">
    <InventoryBoard
      v-if="isInventoryOpen"
      v-on:closeInventory="closeInventory"
    />
    <div id="gamescreen">
      <div id="gamescreen__top">
        <div>
          <h2>Remaining Time</h2>
          <game-timer />
        </div>
        <div>
          <h2>Current Item</h2>
        </div>
      </div>
      <div
        id="gamescreen__catch"
        v-if="catchMode === true"
      >
        <h1>Target detected!</h1>
        <button id="catch">
          Catch!
        </button>
      </div>
      <div id="gamescreen__bottom">
        <div>

        </div>
        <div>
          <button
            id="switch-button"
            @click="switchMode"
          >
            {{this.buttonName}}
          </button>
        </div>
        <div>
          <button
            id="inventory-button"
            @click="openInventory"
          >
            Inv
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
import InventoryBoard from './../partials/gameplay/InventoryBoard';
import GameTimer from './../partials/gameplay/GameTimer';

export default {
  name: 'Gameplay',
  components: {
    InventoryBoard,
    GameTimer,
  },
  created() {
    try {
      const center = {lat: -6.89060785, lng: 107.61032348};
      const google = await gmapsInit();
      this.map = new google.maps.Map(document.querySelector('#map'), {zoom: 18, center, disableDefaultUI: true});
      const styledMapType = new google.maps.StyledMapType(mapStyle);

      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');
    } catch (error) {
      console.error(error);
    };

    this.timeMapRefresh = setInterval(this.updateMapCenter, 100);
    this.timeRequest = setInterval(this.requestData, 500);
  },
  data() {
    return {
      isInventoryOpen: false,
      catchMode: false,
      buttonName: 'Catch Mode',
      map: null,
      timeMapRefresh: null,
      timeRequest: null,
      lat: 0,
      lon: 0,
      intensity: 0.0
    }
  },
  methods: {
    switchMode() {
      this.catchMode = !this.catchMode;
      if (!this.catchMode) {
        this.buttonName = 'Catch Mode';
      } else {
        this.buttonName = 'Observe Mode';
      }
    },
    openInventory() {
      this.isInventoryOpen = true;
    },
    closeInventory() {
      this.isInventoryOpen = false;
    },
    updateMapCenter() {
      var geoSuccess = function (position) {
        var initialPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        this.map.setCenter(initialPos);
        google.maps.event.trigger(this.map, 'resize');
        this.lat = initialPos.lat;
        this.lon = initialPos.lon;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    },
    requestData() {
      const urlLocation = `${this.$store.state.baseUrl}/game/location`;
      var postDataLocation = new Request(urlLocation, {
        method: 'POST',
        body: JSON.stringify({
          "lat": this.lat,
          "lng": this.lon
        }),
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json",
        }
      });
      var fetchDataIntensity = new Request(urlLocation, {
        method: 'GET',
        headers: { "Authorization": `${this.$store.state.user.token}` }
      });

      fetch(postDataLocation);
      fetch(fetchDataIntensity)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          this.intensity = response.data.intensity;
        }
      })
    }
  }
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
    
    >div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    >div:first-child, >div:last-child {
      flex-basis: 20%;
      max-width: 20%
    }

    >div:nth-child(2) {
      flex-basis: 60%;
      max-width: 60%;
    }

    #switch-button {
      cursor: pointer;
      background-color: grey;
      border: 0;
      padding: 2rem;
      font-size: 5vw;
      font-weight: bold;
      color: white;
      border-radius: 10px;
    }

    #inventory-button {
      cursor: pointer;
      background-color: grey;
      border: 0;
      padding: 2rem;
      font-size: 5vw;
      font-weight: bold;
      color: white;
      border-radius: 100px;
    }
  }

  #gamescreen__catch {
    width: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    position: fixed;
    bottom: 10rem;

    button {
      width: 100%;
      background-color: rgb(39, 39, 39);
      font-size: 4rem;
      border: 0;
      padding: 2rem;
      font-weight: bold;
      color: white;
      border-radius: 10px;
    }
    h1 {
      color: red;
      margin-bottom: 1rem;
    }
  }
}

#map {
  height: 100%;
  width: 100%;
}
</style>
