<template>
  <v-container fluid id="roomjoin">
    <div id="roomjoin__list">
      <div>
        <div
          class="roomjoin__person"
          v-for="p in person"
          :key=p.name
        >
          <h2>{{p}}</h2>
          <h3>lv 31</h3>
        </div>
      </div>
    </div>
    <div id="roomjoin__code">
      <h2>Room Code:</h2>
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
      chasingTeam: [],
      hidingTeam: [],
      person: []
    }
  },
  created: function() {
    this.refreshData();
    this.timer = setInterval(this.refreshData, 500);
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
          this.$store.commit('setRoomMember', {
            chasing_team: this.chasingTeam,
            hiding_team: this.hidingTeam
          });
          this.$router.push({ name: 'play' });
        }
      })
    },

    startGameGuest() {
      clearInterval(this.timer);
      this.$store.commit('setRoomMember', {
        chasing_team: this.chasingTeam,
        hiding_team: this.hidingTeam
      });
      this.$router.push({ name: 'play' });
    }
  }
}
</script>

<style lang="scss" scoped>
#roomjoin {
  padding: 3vh;
  overflow: auto;
}

#roomjoin__list, #roomjoin__code {
  border: 2px solid gray;
  border-radius: 20px;
  margin-bottom: 2vh;
}

#roomjoin__list {
  -ms-overflow-style: none;  // IE 10+
  overflow: -moz-scrollbars-none;  // Firefox
  background-color: #D6D6D6;
  height: 55vh;
  overflow: auto;

  &::-webkit-scrollbar { 
    display: none;  // Safari and Chrome
  }

  .roomjoin__person {
    border: 2px solid gray;
    border-radius: 20px;
    background-color: white;
    margin: 0.3rem;
    padding: 0.5rem 3rem;
  }
}

#roomjoin__code {
  text-align: center;
  height: 10vh;
  padding: 2vh;

  h1, h2 {
    margin: 0;
  }
  h2 {
    font-size: 3vh;
  }
  h1 {
    font-size: 5vh;
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
  width: 100%;
  border-radius: 20px;
}
</style>
