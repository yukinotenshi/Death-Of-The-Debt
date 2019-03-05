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
    this.timer = setInterval(this.refreshData, 1000);
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
        if (this.hidingTeam.length != 0) this.startGame();
        else this.person = this.chasingTeam;
      })
    },
    startGame() {
      clearInterval(this.timer);
      this.$router.push({name: 'play'});
    }
  }
}
</script>

<style lang="scss" scoped>
#roomjoin {
  padding: 2rem;
}

#roomjoin__list, #roomjoin__code {
  border: 2px solid gray;
  border-radius: 20px;
  margin-bottom: 1rem;
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
  padding: 2rem;

  h1, h2 {
    margin: 0;
  }
  h1 {
    font-size: 3rem;
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
