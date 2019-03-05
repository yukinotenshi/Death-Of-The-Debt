<template>
  <v-container fluid id="menu">
    <closable-board
      v-if="playOptions"
      v-on:closeBoard="togglePlayOptions"
      title="Choose"
    >
      <component :is="childComponent" />
    </closable-board>
    <div id="menu__logo">
      <img
        src="./../../assets/img/logo.png"
        alt="logo"
      >
    </div>
    <div id="menu__buttons">
      <div class="menu__btn">
        <game-button
          v-on:action="togglePlayOptions"
          title="Play"
        />
      </div>
      <router-link
        class="menu__btn"
        :to="{name: 'settings'}"
      >
        <game-button title="Options" />
      </router-link>
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
#menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#menu__logo {
  img {
    width: 70vw;
    height: auto;
    margin-bottom: 5vh;
  }
}

#menu__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .menu__btn {
    // margin: 1rem;
    text-decoration: none;

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
  }
}
</style>
