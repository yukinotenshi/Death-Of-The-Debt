<template>
  <v-container fluid id="endgame">
    <!-- <h1 class="title">{{ title }}</h1> -->
    <div class="header">
      <img src="./../../../assets/img/texts/victory.png" v-if="status">
      <img src="./../../../assets/img/texts/lose.png" v-if="!status">
    </div>
    <h2>{{ winnerTeam }} team wins!</h2>
    <div id="endgame__summary">
      <div class="item">
        <h1 class="title">Exp Gained</h1>
        <h1 class="data">{{ summary.exp_gain }}</h1>
      </div>
    </div>
    <router-link to="/menu">
      <game-button
        title="Back to Menu"
        class="back"
      />
    </router-link>
  </v-container>
</template>

<script>
import GameButton from '@/components/partials/utils/GameButton.vue'

export default {
  name: 'EndGame',
  components: {
    GameButton
  },
  props: {
    status: Boolean,
    winnerTeam: String,
    winners: Array,
    summary: Object
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    
  }
}
</script>

<style lang="scss" scoped>
#endgame {
  height: 100vh;
  width: 100vw;
  background-color: #DB903F;
  z-index: 999999;
  position: absolute;
  text-align: center;

  background: url('./../../../assets/img/backgrounds/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  >.header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    margin-bottom: 5vh;

    img {
      margin: 0;
      width: 80vw;
    }
  }

  >a>.back {
    width: 80%;
  }
}
</style>

