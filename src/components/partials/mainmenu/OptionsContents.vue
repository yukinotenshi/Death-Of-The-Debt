<template>
  <v-container fluid>
    <div class="options">
      <game-button 
        v-on:action="logOut"
        title="Log Out"
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
    logOut() {
      this.$cookie.set('token', "");
      this.$router.push({name: 'login'});
    }
  }
}
</script>

<style lang="scss" scoped>
.options {
  text-align: center;
  width: 100%;

  p {
    color: brown;
    margin: 0 1rem;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
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
