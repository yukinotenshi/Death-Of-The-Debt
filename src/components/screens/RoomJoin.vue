<template>
  <v-container fluid id="roomjoin">
    <div id="roomjoin__list">
      <div
        class="roomjoin__person"
        v-for="p in person"
        :key=p
      >
        <h2>{{p}}</h2>
        <h3>lv 31</h3>
      </div>
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
  data() {
    return {
      timer: '',
      level: 1,
      chasingTeam: [],
      hidingTeam: [],
      person: [],
      character: '',
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

#roomjoin {
  padding: 3vh;
  height: 100vh;
  overflow: auto;

  background: url('./../../assets/img/backgrounds/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

  .roomjoin__person {
    border: 2px solid gray;
    border-radius: 20px;
    background-color: white;
    margin: 0.3rem 0;
    padding: 0.3rem;
    flex-basis: 45%;
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
