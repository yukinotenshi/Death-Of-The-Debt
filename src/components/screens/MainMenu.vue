<template>
  <v-container fluid id="menu">
    <closable-board
      v-if="playOptions"
      v-on:closeBoard="togglePlayOptions"
      title="Choose"
    />
    <div id="menu__logo">
      Logo
    </div>
    <div id="menu__buttons">
      <div class="menu__btn">
        <button
          @click="togglePlayOptions"
        >
          Play
        </button>
      </div>
      <router-link
        class="menu__btn"
        :to="{name: 'settings'}"
      >
        <button>
          Options
        </button>
      </router-link>
    </div>
  </v-container>
</template>

<script>
import ClosableBoard from './../partials/utils/ClosableBoard';

export default {
  name: 'MainMenu',
  components: {
    ClosableBoard,
  },
  data() {
    return {
      playOptions: false,
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

#menu__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .menu__btn {
    margin: 1rem;
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
