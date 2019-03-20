<template>
  <v-container fluid id="menu">
    <closable-board
      v-if="playOptions"
      v-on:closeBoard="togglePlayOptions"
      title="Choose"
    >
      <component :is="childComponent" />
    </closable-board>
    <div id="menu__chara">
      <img
        id="splash__chara"
        src="./../../assets/img/splash/chara.png"
        alt="logo"
      >
    </div>
    <div id="menu__buttons">
      <div
        class="menu__btn"
        @click="togglePlayOptions"
      >
        <game-button title="Play"/>
      </div>
      <div class="menu__btn">
        <game-button title="Options"/>
      </div>
    </div>
    <div id="menu__logo">
      <img
        src="./../../assets/img/logo.png"
        alt="logo"
      >
    </div>
  </v-container>
</template>

<script>
import ClosableBoard from './../partials/utils/ClosableBoard';
import GameButton from './../partials/utils/GameButton';
import PlayOptionsContents from './../partials/mainmenu/PlayOptionsContents';

export default {
  name: 'MainMenu',
  components: {
    ClosableBoard,
    GameButton,
    PlayOptionsContents,
  },
  data() {
    return {
      playOptions: false,
      childComponent: PlayOptionsContents,
    }
  },
  methods: {
    togglePlayOptions() {
      this.playOptions = !this.playOptions;
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #D2B24F;

#menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background: url('./../../assets/img/backgrounds/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#menu__chara, #menu__logo, #menu__buttons {
  position: absolute;
}

#menu__chara {
  img {
    width: 80vw;
    margin-bottom: 35vh;
  }
}

#menu__logo {
  img {
    width: 60vw;
    height: auto;
  }
  bottom: 48vh;
}

#menu__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #6E563C;
  margin-top: 13vh;
  padding: 8vh 8vh 5vh 8vh;
  border-radius: 5vh;
  border: 0.3rem solid $yellow;

  .menu__btn {
    button {
      text-decoration: none;
      background-color: $yellow;
      width: 20vh;
      color: white;
      transition-duration: 0.2s;
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
}
</style>
