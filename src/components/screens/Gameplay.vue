<template>
  <v-container fluid class="page" id="gameplay">
    <end-game
      v-if="isEndGame"
      :status="winnerData.amIWin"
      :winnerTeam="winnerData.team"
      :summary="winnerData.summary"
    />
    <div id="death" v-if="!alive">
      <h1>You're dead</h1>
      <p>But the game is<br>still ongoing...</p>
    </div>
    <transition name="fade">
      <div id="beer-spill" v-if="beerSpilt">
        <img id="beer" :src="beerSrc" alt=""/>
      </div>
    </transition>
    <div id="gamescreen">
      <div id="gamescreen__top">
        <div>
          <img src="./../../assets/img/panels/time.png" alt="">
          <game-timer
            v-on:timeup="finishGame"
            v-on:elapsed="setElapsed"
          />
        </div>
        <div />
      </div>
      <div
        id="gamescreen__catch"
        v-if="catchMode === true"
      >
        <h1>Target detected!</h1>
        <button
          id="catch"
          @click="catchHandler"
        >
          Catch!
        </button>
      </div>
      <div id="gamescreen__bottom">
        <div id="name-container">
          <h1 id="profile__lv">Lv.{{profile.level}}</h1>
          <h1 id="profile__lv">{{character}}</h1>
          <h1 id="profile__uname">{{profile.username}}</h1>
        </div>
        <div
          id="inventory-button"
          @click="castSkill"
          :style="{ backgroundImage : 'url(' + skillSrc + ')'}"
          v-if="character !== 'Trickster'"
        >
          <div id="cooldown" v-if="!skillEnable">
            {{cooldownSeconds}}
          </div>
        </div>
      </div>
    </div>
    <div id="overlay" v-if="team === 'chasing'" />
    <div id="map" />
  </v-container>
</template>

<script>
import gmapsInit from './../../assets/js/gmaps';
import mapStyle from './../../assets/js/mapStyle';
import GameTimer from './../partials/gameplay/GameTimer';
import EndGame from './../partials/gameplay/EndGame';

export default {
  name: 'Gameplay',
  components: {
    GameTimer,
    EndGame
  },
  async mounted() {
    try {
      const center = {lat: -6.89060785, lng: 107.61032348};
      this.google = await gmapsInit();
      this.map = new this.google.maps.Map(document.querySelector('#map'), {zoom: 22, center, disableDefaultUI: true});
      const styledMapType = new this.google.maps.StyledMapType(mapStyle);

      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');
    } catch (error) {
      throw(error);
    }

    this.gatherData();
    this.setProfile();
    this.timeMapRefresh = setInterval(this.updateMapCenter, 500);
    this.timeRequest = setInterval(this.requestData, 500);
    this.timePlayerData = setInterval(this.getCurrentPlayerData, 500);
    this.timeEndGame = setInterval(this.getEndGame, 500);
    this.siren = new Audio(require('./../../assets/audio/siren.wav'));
    this.setSkillIcon(this.character);
    this.skillSrc = this.skillColor;
  },
  data() {
    return {
      google: null,
      profile: {
        level: '',
        username: '',
      },
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
      intensity: 0,
      alive: true,
      teamId: '',
      character: '',
      activeSkillId: '',
      skill: {
        active: false,
        type: ''
      },
      elapsedTime: 0,
      isEndGame: false,
      winnerData: {
        teamId: '',
        team: '',
        amIWin: false,
        summary: {}
      },
      currentSkillId: null,
      siren: null,
      markerIntel: [],
      beerSpilt: false,
      beerSrc: "",
      skillSrc: "",
      skillColor: "",
      skillBw: "",
      skillEnable: true,
      cooldownTimer: null,
      cooldownSeconds: 0,
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
    setProfile() {
      let user = this.$store.state.user;
      this.profile = {
        level: 10,
        username: user.username,
      };
    },
    openInventory() {
      this.isInventoryOpen = true;
    },
    closeInventory() {
      this.isInventoryOpen = false;
    },
    updateMapCenter() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, console.log, {maximumAge:10000, timeout:10000, enableHighAccuracy:true});
    },
    setSkillIcon(character) {
      if(character === 'Police') {
        this.skillColor = require("./../../assets/img/icons/siren.png");
        this.skillBw = require("./../../assets/img/icons/siren_bw.png");
      }
      else if (character === 'Debt Collector') {
        this.skillColor = require("./../../assets/img/icons/radar.png");
        this.skillBw = require("./../../assets/img/icons/radar_bw.png");
      }
      else if (character === 'Drunk') {
        this.skillColor = require("./../../assets/img/icons/beer.png");
        this.skillBw = require("./../../assets/img/icons/beer_bw.png");
      }
      else if (character === 'Trickster') {
        this.skillColor = require("./../../assets/img/icons/inventory.png");
        this.skillBw = require("./../../assets/img/icons/inventory.png");
      }
    },
    getIcon(character) {
      if(character === 'Police') return require("./../../assets/img/chara/head/chasing1small.png");
      else if (character === 'Trickster') return require("./../../assets/img/chara/head/hiding1small.png");
      else if (character === 'Debt Collector') return require("./../../assets/img/chara/head/chasing2small.png");
      else if (character === 'Drunk') return require("./../../assets/img/chara/head/hiding2small.png");
      return null;
    },
    geoSuccess(position) {
      var initialPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map.setCenter(initialPos);
      this.google.maps.event.trigger(this.map, 'resize');

      if(this.marker) {
        if(Math.abs(this.lat - initialPos.lat) > Number.EPSILON ||
          Math.abs(this.lng - initialPos.lng) > Number.EPSILON) {
          this.marker.setMap(null);
          this.lat = initialPos.lat;
          this.lng = initialPos.lng;

          let icon = this.getIcon(this.character);

          this.marker = new this.google.maps.Marker({
            position: {
              lat: initialPos.lat,
              lng: initialPos.lng,
            },
            icon: icon,
            map: this.map,
          });
        }
      } else {
        this.marker = new this.google.maps.Marker({
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
      urlLocation = `${this.$store.state.baseUrl}/game/${this.$store.state.room.room_id}`;
      var fetchDataStatus = new Request(urlLocation, {
        method: 'GET',
        headers: { "Authorization": `${this.$store.state.user.token}` }
      });
      fetch(postDataLocation);
      fetch(fetchDataIntensity)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          if (this.team === "chasing")
            this.intensityHandlerChasing(response);
          else
            this.intensityHandlerHiding(response);
        }
      })
      fetch(fetchDataStatus)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          let activeSkill = response.data.active_skill;
          if (activeSkill.hasOwnProperty('skill_id') && activeSkill.skill_id !== this.currentSkillId) {
            this.currentSkillId = activeSkill.skill_id;
            this.skillHandler(activeSkill);
          }
        }
      })
    },
    intensityHandlerChasing(object) {
      if (this.markerEnemy) {
        this.markerEnemy.setMap(null);
      }
      switch(object.data.intensity) {
        case 0:
          document.getElementById("overlay").style.backgroundColor = "#00FF0055";
          this.catchMode = false;
          break;
        case 0.2:
          document.getElementById("overlay").style.backgroundColor = "#FFFF0055";
          this.catchMode = false;
          break;
        case 0.5:
          document.getElementById("overlay").style.backgroundColor = "#FF880055";
          this.catchMode = false;
          break;
        case 0.8:
          document.getElementById("overlay").style.backgroundColor = "#CC000055";
          this.catchMode = false;
          break;
        case 1:
          document.getElementById("overlay").style.backgroundColor = "#FF000077";
          this.catchMode = true;
          this.markerEnemy = new this.google.maps.Marker({
            position: {
              lat: object.data.player.lat,
              lng: object.data.player.lng,
            },
            map: this.map,
          });
      }
    },
    intensityHandlerHiding(object) {
      if (this.intensity === object.data.intensity) return;
      if (this.timeVibration) this.cancelVibration();
      this.intensity = object.data.intensity;
      switch(object.data.intensity) {
        case 0:
          this.startVibration(20000);
          break;
        case 0.2:
          this.startVibration(2500);
          break;
        case 0.5:
          this.startVibration(1000);
          break;
        case 0.8:
          this.startVibration(500);
          break;
        case 1:
          this.startVibration(200);
          break;
      }
    },
    gatherData() {
      var chasingTeam = this.$store.state.room.chasing_team;
      var name = this.$store.state.user.username;
      if (this.isNameInArr(name, chasingTeam)) this.team = "chasing";
      else this.team = "hiding"
      this.character = this.$store.state.room.character;
    },
    isNameInArr(name, arr) {
      for (let i in arr) {
        if (name === arr[i].username) {
          return true;
        }
      }
      return false;
    },
    startVibration(vibrationDelay) {
      this.timeVibration = setInterval(this.vibrate, vibrationDelay+250);
    },
    cancelVibration() {
      clearInterval(this.timeVibration);
      window.navigator.vibrate(0);
    },
    vibrate() {
      window.navigator.vibrate(250);
    },
    catchHandler() {
      const url = `${this.$store.state.baseUrl}/game/catch`;
      // const self = this;
      let fetchData = new Request(url, {
        method: 'POST',
        headers: { "Authorization": `${this.$store.state.user.token}` }
      });
      fetch(fetchData)
      // .then(response => {
      //   this.finishGame();
      // })
    },
    getCurrentPlayerData() {
      const url = `${this.$store.state.baseUrl}/game/player`;
      let fetchData = new Request(url, {
        method: 'GET',
        headers: { "Authorization": `${this.$store.state.user.token}` }
      });
      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          this.alive = response.data.alive;
          this.teamId = response.data.team_id;
        }
      })
    },
    getEndGame() {
      const url = `${this.$store.state.baseUrl}/game/end`;
      let fetchData = new Request(url, {
        method: 'GET',
        headers: { "Authorization": `${this.$store.state.user.token}` }
      });
      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          this.winnerData.teamId = response.data.winner;
          console.log(response.data);
        }
      })
    },
    castSkill() {
      if (this.skillEnable) {
        const url = `${this.$store.state.baseUrl}/skill/cast`;
        let fetchData = new Request(url, {
          method: 'POST',
          headers: { "Authorization": `${this.$store.state.user.token}` }
        });
        fetch(fetchData)
        .then(response => response.json())
        .then(response => {
          if (this.character === "Debt Collector") {
            let playerList = response.active_skill.target;
            let duration = response.active_skill.value;
            this.callIntel(playerList, duration);
            // console.log(response)
          }
        });
        this.skillEnable = false;
        this.skillSrc = this.skillBw;

        this.cooldownSeconds = 60;
        this.cooldownTimer = setInterval(() => {
          this.tickDown();
        }, 1000);
      }
    },
    setElapsed(time) {
      this.elapsedTime = time;
    },
    finishGame() {
      const url = `${this.$store.state.baseUrl}/game/summary`;
      const time = this.elapsedTime;
      let fetchData = new Request(url, {
        method: 'POST',
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json"  
        },
        body: JSON.stringify({ time })
      });
      console.log('FINISHED');
      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.winnerData.summary = response.data;
        if (this.winnerData.teamId === this.teamId) {
          this.winnerData.amIWin = true;
          this.winnerData.team = this.team;
        } else {
          if (this.team == 'chasing') this.winnerData.team = 'hiding';
          else this.winnerData.team = 'chasing';
        }
        this.isEndGame = true;
        clearInterval(this.timeMapRefresh);
        clearInterval(this.timeRequest);
        clearInterval(this.timePlayerData);
        clearInterval(this.timeEndGame);
      })
    },
    skillHandler(activeSkill) {
      let name = this.$store.state.user.username;
      if (this.isNameInArr(name, activeSkill.target)) {
        let skillName = activeSkill.name;
        let value = activeSkill.value;
        if (skillName === "Sirine")
          this.playSiren(value);
        if (skillName === "Beer Throwing")
          this.spillBeer(value);
      }
    },
    playSiren(duration) {
      this.siren.play();

      setTimeout(() => {
        this.siren.pause();
        this.siren.currentTime = 0;
      }, duration*1000);
    },
    spillBeer(duration) {
      this.beerSpilt = true;
      this.beerSrc = require("./../../assets/img/items/beer.gif") + '?' + Math.random();

      setTimeout(() => {
        this.beerSpilt = false;
      }, duration*1000);
    },
    callIntel(playerList, duration) {
      this.map.setZoom(18);
      for (let i in playerList) {
        this.markerIntel[i] = new this.google.maps.Marker({
          position: {
            lat: playerList[i].lat,
            lng: playerList[i].lng,
          },
          map: this.map,
          icon: this.getIcon(playerList[i].character),
        });
      }

      setTimeout(() => {
        let item = null;
        while (this.markerIntel.length !== 0) {
          item = this.markerIntel.pop();
          item.setMap(null);
        }
        this.map.setZoom(22);
      }, duration*1000);
    },
    tickDown() {
      this.cooldownSeconds--;
      if (this.cooldownSeconds === 0) {
        this.skillEnable = true;
        this.skillSrc = this.skillColor;
        clearInterval(this.cooldownTimer);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/css/style.scss';

#death {
  background: rgba(105, 0, 0, 0.507);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 999;
  color: white;
  text-align: center;

  h1 {
    margin-top: 40vh;
    margin-bottom: 2vh;
    font-size: 6vh;
  }
  p {
    font-size: 3.5vh;
    line-height: 3.2vh;
  }
}

#beer-spill {
  background: rgba(orange, 0.507);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1000;

  img {
    width: 100%;
    height: 100%;
  }
}

#gameplay {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

#game__skill {
  position: absolute;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  // background-color: red;

  h2, h1 {
    text-align: center;
    margin: 0;
    padding: 0;
  }
}

#overlay {
  position: absolute;
  top: calc(50vh - 18vh);
  left: calc(50vw - 18vh);
  z-index: 98;
  width: 36vh;
  height: 36vh;
  background: rgba(255, 0, 0, 0);
  border-radius: 100vh;
}

#gamescreen {
  position: absolute;
  padding: 1rem;
  z-index: 99;
  height: calc(100%-1rem);
  width: calc(100%-1rem);

  h1, h2 {
    margin: 0;
  }

  #gamescreen__top {
    display: flex;
    flex-direction: row;
    
    >div:first-child {
      flex: 1 0 0;
      img {
        width: 50vw;
        height: auto;
        position: absolute;
        z-index: -1;
      }
      #timer {
        z-index: 9999;
        padding-top: 7.5vw;
        padding-left: 23vw;
        font-size: 4vw;
      }
    }

    >div:last-child {
      flex: 1 0 0;
      text-align: right;

      img {
        margin-top: 4vw;
        margin-left: 5vw;
        width: 15vw;
        height: auto;
      }
    }
  }

  #gamescreen__bottom {
    display: flex;
    position: fixed;
    bottom: 2rem;
    width: 100%;

    #name-container {
      position: relative;
      left: 0;
      #profile__lv, #profile__uname {
        color: rgb(112, 60, 0);
        // outline: solid 1px rgb(173, 173, 173);
      }
      #profile__lv {
        font-size: 5vw;
      }  
      #profile__uname {
        font-size: 6.5vw;
      }
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
      cursor: normal;
      border-style: none;
      position: absolute;
      right: 2rem;
      font-size: 2.5vh;
      font-weight: bold;
      color: white;
      width: 17vw;
      height: 17vw;
      margin-left: 4vw;
      background-size: cover;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    #cooldown {
      color: white;
      font-size: 2rem;
      text-align: center;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
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
