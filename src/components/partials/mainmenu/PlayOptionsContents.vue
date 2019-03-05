<template>
  <v-container fluid>
    <div class="createroom">
      <game-button
        v-on:action="gotoCreateRoom"
        title="Create Room"
      />
      <div class="gap">
        <h3>Room Code</h3>
        <input type="text" v-model="roomCode">
      </div>
      <game-button 
        v-on:action="joinRoom"
        title="Join Room"
      />
    </div>
  </v-container>
</template>

<script>
import GameButton from './../utils/GameButton.vue';

export default {
  name: 'PlayOptionsContents',
  components: {
    GameButton,
  },
  data() {
    return {
      roomCode : ''
    }
  },
  methods: {
    gotoCreateRoom() {
      const url = `${this.$store.state.baseUrl}/room/create`;
      fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(response => {
        if(response.room_id !== '') {
          this.$store.commit('setRoom', {
            room_id: response.room_id,
            is_owner: true,
          });
          this.$router.push({
            name: 'room',
            params: {
              is_owner: true,
              room_id: this.$store.state.room.room_id,
            },
          });
        }
      })
    },
    joinRoom() {
      const url = `${this.$store.state.baseUrl}/room/join`;
      var fetchData = new Request(url, {
        method: 'POST',
        body: JSON.stringify({
          "room_id": this.roomCode
        }),
        headers: {
          "Authorization": `${this.$store.state.user.token}`,
          "Content-Type": "application/json"
        }
      });

      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status == 200) {
          this.$store.commit('setRoom', {
            room_id: this.roomCode,
            is_owner: false,
          });
          this.$router.push({
            name: 'room',
            params: {
              is_owner: false,
              room_id: this.roomCode,
            },
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.createroom {
  text-align: center;
  width: 100%;

  .gap {
    width: 100%;
    margin-top: 1vh;
    display: inline-block;

    h3 {
      display: inline;
      margin: 0 1rem;
    }
  }

  input[type=text] {
    font-size: 1.25rem;
    border: 2px solid gray;
    border-radius: 20px;
    background-color: white;
    padding: 0.5vh;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;    
    box-sizing: border-box;
  }  
}

</style>
