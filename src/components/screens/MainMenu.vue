<template>
  <v-container fluid id="menu">
    <div id="menu__logo">
      Logo
    </div>
    <div id="menu__buttons">
      <router-link
        class="menu__btn"
        :to="{name: 'room'}"
      >
        <button>
          Play
        </button>
      </router-link>
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
export default {
  name: 'MainMenu',
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
