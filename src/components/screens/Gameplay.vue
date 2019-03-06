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
    <div id="overlay" />
    <div id="map" />
  </v-container>
</template>

<script>
import gmapsInit from './../../assets/js/gmaps';
import mapStyle from './../../assets/js/mapStyle';
import InventoryBoard from './../partials/gameplay/InventoryBoard';
import GameTimer from './../partials/gameplay/GameTimer';
import init from './../../assets/js/gmaps';

export default {
  name: 'Gameplay',
  components: {
    InventoryBoard,
    GameTimer,
  },
  async mounted() {
    try {
      const center = {lat: -6.89060785, lng: 107.61032348};
      const google = await gmapsInit();
      this.map = new google.maps.Map(document.querySelector('#map'), {zoom: 22, center, disableDefaultUI: true});
      const styledMapType = new google.maps.StyledMapType(mapStyle);

      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');
    } catch (error) {
      console.error(error);
    };

    this.gatherData();
    this.timeMapRefresh = setInterval(this.updateMapCenter, 500);
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
      lng: 0,
      marker: null,
      markerEnemy: null,
      team: "",
      timeVibration: "",
      intensity: 0
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
      navigator.geolocation.getCurrentPosition(this.geoSuccess);
    },
    geoSuccess(position) {
      var initialPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map.setCenter(initialPos);
      google.maps.event.trigger(this.map, 'resize');

      if(this.marker) {
        if(Math.abs(this.lat - initialPos.lat) > Number.EPSILON ||
          Math.abs(this.lng - initialPos.lng) > Number.EPSILON) {
          this.marker.setMap(null);
          this.lat = initialPos.lat;
          this.lng = initialPos.lng;

          this.marker = new google.maps.Marker({
            position: {
              lat: initialPos.lat,
              lng: initialPos.lng,
            },
            map: this.map,
          });
        }
      } else {
        this.marker = new google.maps.Marker({
          position: {
            lat: initialPos.lat,
            lng: initialPos.lng,
          },
          map: this.map,
        });
      }
    },
    requestData() {
      let urlLocation = `${this.$store.state.baseUrl}/game/location`;
      var postDataLocation = new Request(urlLocation, {
        method: 'POST',
        body: JSON.stringify({
          "lat": this.lat,
          "lng": this.lng
        }),
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json",
        }
      });
      urlLocation = `${this.$store.state.baseUrl}/game/intensity`;
      var fetchDataIntensity = new Request(urlLocation, {
        method: 'GET',
        headers: { "Authorization": `${this.$store.state.user.token}` }
      });

      fetch(postDataLocation);
      fetch(fetchDataIntensity)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          if (team === "chasing")
            this.intensityHandlerChasing(response.data.intensity);
          else
            this.intensityHandlerHiding(response.data.intensity);
        }
      })
    },
    intensityHandlerChasing(object) {
      if (this.markerEnemy) {
        this.markerEnemy.setMap(null);
      }
      switch(intensity) {
        case 0:
          document.getElementById("overlay").style.backgroundColor = "#00FF0055";
          break;
        case 0.2:
          document.getElementById("overlay").style.backgroundColor = "#FFFF0055";
          break;
        case 0.5:
          document.getElementById("overlay").style.backgroundColor = "#FF880055";
          break;
        case 0.8:
          document.getElementById("overlay").style.backgroundColor = "#CC000055";
          break;
        case 1:
          document.getElementById("overlay").style.backgroundColor = "#FF000077";
          this.markerEnemy = new google.maps.Marker({
            position: {
              lat: object.data.player.lat,
              lng: object.data.player.lng,
            },
            map: this.map,
          });
      }
    },
    intensityHandlerHiding(intensity) {
      if (this.intensity === intensity) return;
      if (this.timeVibration) this.cancelVibration();
      this.intensity = intensity;
      switch(intensity) {
        case 0:
          this.startVibration(20000);
          break;
        case 0.2:
          this.startVibration(5000);
          break;
        case 0.5:
          this.startVibration(2000);
          break;
        case 0.8:
          this.startVibration(1000);
          break;
        case 1:
          this.startVibration(500);
          break;
      }
    },
    gatherData() {
      var chasingTeam = this.$store.state.room.chasing_team;
      var name = this.$store.state.user.username;
      if (playerInChasingTeam(name, chasingTeam)) this.team = "chasing";
      else this.team = "hiding"
    },
    playerInChasingTeam(name, arr) {
      for (i in arr) {
        if (name === arr[i].name) {
          return true;
        }
      }
      return false;
    },
    startVibration(vibrationDelay) {
      this.timeVibration = setInterval(vibrate, vibrationDelay+250);
    },
    cancelVibration() {
      clearInterval(this.timeVibration);
      navigator.vibrator(0);
    },
    vibrate() {
      navigator.vibrate(250);
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

#overlay {
  position: absolute;
  top: calc(50vh - 18vh);
  left: calc(50vw - 18vh);
  z-index: 98;
  width: 36vh;
  height: 36vh;
  background: rgba(255, 0, 0, 0.288);
  border-radius: 100vh;
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
      padding: 4vh;
      font-size: 3vh;
      font-weight: bold;
      color: white;
      border-radius: 10px;
    }

    #inventory-button {
      cursor: pointer;
      background-color: grey;
      border: 0;
      padding: 4vh;
      font-size: 2.5vh;
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
