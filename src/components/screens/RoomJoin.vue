<template>
  <v-container fluid id="roomjoin">
    <div id="roomjoin__list">
      <div class="roomjoin__list-title">
        <p>Player List: {{ playerCount }} of {{maxPlayer}}</p>
      </div>
      <div
        class="roomjoin__person"
        v-for="p in person"
        :key=p.username
      >
        <div class="roomjoin__name-container">
          <h2>{{p.username}}</h2>
        </div>
        <div class="roomjoin__level-container">
          <h3>Lv. {{p.level}}</h3>
        </div>
      </div>
      <div
        class="roomjoin__person-empty"
        v-for="n in (maxPlayer-playerCount)"
        :key=n
      />
    </div>
    <div id="roomjoin__code">
      <h2>Room Code</h2>
      <h1>{{room_id}}</h1>
    </div>
    <button
      v-if="is_owner"
      @click="startGame"
    >
      Start!
    </button>
  </v-container>
</template>

<script>
export default {
  name: 'RoomJoin',
  props: {
    is_owner: Boolean,
    room_id: String,
  },
  computed : {
    playerCount() {
      return this.person.length;
    }
  },
  data() {
    return {
      timer: '',
      level: 1,
      chasingTeam: [],
      hidingTeam: [],
      person: [],
      character: '',
      maxPlayer: 10,
    }
  },
  created: function() {
    this.refreshData();
    this.timer = setInterval(this.refreshData, 500);
    window.addEventListener('beforeunload', this.leaveRoom);
  },
  methods: {
    refreshData() {
      const url = `${this.$store.state.baseUrl}/room/${this.$store.state.room.room_id}`;
      var fetchData = new Request(url, {
        method: 'GET',
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
        }
      });

      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status != 200) {
          console.log(response.message);
          return;
        }
        this.chasingTeam = response.data.chasing_team;
        this.hidingTeam = response.data.hiding_team;
        if (this.hidingTeam.length != 0) this.startGameGuest();
        else this.person = this.chasingTeam;
      })
    },

    startGame() {
      clearInterval(this.timer);
      const url = `${this.$store.state.baseUrl}/game/start`;
      var fetchData = new Request(url, {
        method: 'POST',
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json"
        }
      });

      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status == 200) {
          this.chasingTeam = response.data.room.chasing_team;
          this.hidingTeam = response.data.room.hiding_team;
          this.character = this.getCharacterInPlayers(response.data.players);
          this.$store.commit('setCharacter', {
            character: this.character,
          });
          this.$store.commit('setRoomMember', {
            chasing_team: this.chasingTeam,
            hiding_team: this.hidingTeam
          });
          this.$router.push({
            name: 'gacha',
            params: {
              chasingTeam: this.chasingTeam,
              hidingTeam: this.hidingTeam,
              character: this.character,
            }
          });
        }
      })
    },

    startGameGuest() {
      clearInterval(this.timer);
      const url = `${this.$store.state.baseUrl}/game/player`;
      var fetchData = new Request(url, {
        method: 'GET',
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
        }
      });

      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status == 200) {
          this.character = response.data.character;
          this.$store.commit('setRoomMember', {
            chasing_team: this.chasingTeam,
            hiding_team: this.hidingTeam
          });
          this.$store.commit('setCharacter', {
            character: this.character,
          });
          this.$router.push({
            name: 'gacha',
            params: {
              chasingTeam: this.chasingTeam,
              hidingTeam: this.hidingTeam,
              character: this.character,
            }
          });          
        }
      })
    },

    getCharacterInPlayers(playerList) {
      for (let i in playerList) {
        if (playerList[i].username === this.$store.state.user.username) {
          return playerList[i].character;
        }
      }

      return '';
    },

    leaveRoom() {
      const url = `${this.$store.state.baseUrl}/room/leave`;
      var fetchData = new Request(url, {
        method: 'POST',
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json",
        }
      });

      fetch(fetchData);
    },
  }
}
</script>

<style lang="scss" scoped>
$yellow: rgb(240, 206, 106);
$darkbrown: rgb(102, 10, 10);

#roomjoin {
  padding: 3vh;
  height: 100vh;
  overflow: auto;

  background: url('./../../assets/img/backgrounds/blue.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  text-shadow: 0 2px 5px rgba(0,0,0,0.47);
}

#roomjoin__list, #roomjoin__code {
  background-color: #6E563C;
  border: 0.3rem solid $yellow;
  border-radius: 20px;
  margin-bottom: 2vh;
}

#roomjoin__list {
  -ms-overflow-style: none;  // IE 10+
  overflow: -moz-scrollbars-none;  // Firefox
  height: 55vh;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  &::-webkit-scrollbar { 
    display: none;  // Safari and Chrome
  }

  .roomjoin__list-title {
    color: white;
    text-align: center;
    flex-basis: 100%;
    background-color: rgba($yellow, 0.33);
    padding: 0.3rem;

    p {
      margin: 0;
    }
  }

  .roomjoin__person, .roomjoin__person-empty {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    flex-basis: calc(50% - 0.3rem);
    margin-top: 0.3rem;
    margin-right: 0.15rem;
    margin-left: 0.15rem;
  }

  .roomjoin__person {
    border: 3px solid rgb(126, 61, 23);
    border-left: 15px solid rgb(126, 61, 23);
    border-radius: 20px;
    background-color: rgb(165, 87, 42);
    height: 100px;
    overflow: hidden;

    .roomjoin__name-container, .roomjoin__level-container {
      background: brown;
      border-top: 1px dashed $darkbrown;
      border-bottom: 1px dashed $darkbrown;
      margin: 0.75rem 0;
      box-shadow: 0 0 0 3px brown, 0 3px 1px 2px #00000022;
    }

    .roomjoin__name-container {
      width: 100%;
    }
    .roomjoin__level-container {
      width: 50%;
      border-radius: 0 10px 10px 0;
      border-right: 1px dashed $darkbrown;
    }
    h2, h3 {
      margin: 0 0.3rem;
      color: white;
    }
  }
  .roomjoin__person-empty {
    border: 2px solid #00000011;
    border-radius: 20px;
    background-color: #00000088;
    height: 100px;
  }
}

#roomjoin__code {
  text-align: center;
  height: 10vh;
  padding: 2vh;

  h1, h2 {
    color: white;
    margin: 0;
  }
  h2 {
    font-size: 3vh;
  }
  h1 {
    font-family: monospace;
    font-size: 5vh;
  }
}

button {
  cursor: pointer;
  background-color: #D2B24F;
  border: 0;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  width: 100%;
  border-radius: 20px;
  -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
  -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
  box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
  transition-duration: 0.2s;
  
  &:active {
    color: black;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
  }
}
</style>
