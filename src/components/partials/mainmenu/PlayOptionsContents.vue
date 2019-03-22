<template>
  <v-container fluid>
    <transition name="fade">
    <loading-overlay
      v-if="isJoiningRoom"
      subtitle="Joining Room..."
    />
    <loading-overlay
      v-if="isCreatingRoom"
      subtitle="Creating room..."
    />
    </transition>
    <div class="createroom">
      <p>{{errorText}}</p>
      <game-button
        v-on:action="gotoCreateRoom"
        title="Create Room"
      />
      <hr/>
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
import LoadingOverlay from './../utils/LoadingOverlay';

export default {
  name: 'PlayOptionsContents',
  components: {
    GameButton,
    LoadingOverlay,
  },
  data() {
    return {
      roomCode : '',
      errorText: '',
      isJoiningRoom : false,
      isCreatingRoom : false
    }
  },
  methods: {
    gotoCreateRoom() {
      const url = `${this.$store.state.baseUrl}/room/create`;
      this.isCreatingRoom = true;
      
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
        } else {
          this.isCreatingRoom = false;
        }
      })
      .catch(error => {
        this.isCreatingRoom = false;
        this.errorText = 'Cannot fetch data from the server. Please check your internet connection.';
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
      this.isJoiningRoom = true;

      fetch(fetchData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
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
        } else if (response.status === 400) {
          this.isJoiningRoom = false;
          this.errorText = 'Room doesn\'t exist.';
        } else if (response.status === 500) {
          this.isJoiningRoom = false;
          this.errorText = 'This user already joined to this room.';
        } else {
          this.isJoiningRoom = false;
          this.errorText = 'Cannot join room. Please try again.';
        }
      })
      .catch(error => {
        this.isJoiningRoom = false;
        this.errorText = 'Cannot fetch data from the server. Please check your internet connection.';
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
      color: white;
      display: inline;
      margin: 0 1rem;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
    }
  }

  p {
    color: brown;
    margin: 0 1rem;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
  }

  hr {
    height: 1px;
    border: 0;
    border-top: 1px solid #6E563C;
  }

  input[type=text] {
    font-size: 1.25rem;
    border: 2px solid #6E563C;
    border-radius: 20px;
    background-color: white;
    width: 100%;
    margin-top: 1vh;
    padding: 1.5vh 3vh;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;    
    box-sizing: border-box;
    font-family: monospace;
    text-align: center;
  }

  button {
    background-color: #6E563C;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);

    &:active {
      color: black;
      -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
      -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
      box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
    }
  }
}

</style>
