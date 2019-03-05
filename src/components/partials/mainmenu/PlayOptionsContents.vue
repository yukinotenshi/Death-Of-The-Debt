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
// import router from
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
      this.$router.push({ name: 'room' });
    },
    joinRoom() {
      this.roomCode = "ahuahuahuahhauahuahuahuahuahauhauha";
    }
  }
}
</script>

<style lang="scss" scoped>
.createroom {
  text-align: center;
  width: 100%;

  .gap {
    margin-top: 1rem;
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
    padding: 0.5rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;    
    box-sizing: border-box;
  }  
}

</style>
