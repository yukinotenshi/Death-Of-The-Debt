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
          <h1>09:13</h1>
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

export default {
  name: 'Gameplay',
  components: {
    InventoryBoard,
  },
  async mounted() {
    try {
      const center = {lat: -6.89060785, lng: 107.61032348};
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.querySelector('#map'), {zoom: 18, center, disableDefaultUI: true});
      const styledMapType = new google.maps.StyledMapType(mapStyle);

      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      isInventoryOpen: false,
      catchMode: false,
      buttonName: 'Catch Mode',
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
