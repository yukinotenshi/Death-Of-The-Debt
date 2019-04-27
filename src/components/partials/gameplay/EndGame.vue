<template>
  <v-container fluid id="endgame">
    <!-- <h1 class="title">{{ title }}</h1> -->
    <img src="./../../../assets/img/texts/victory.png" alt="" class="title">
    <h2>{{ winnerTeam }} team wins!</h2>
    <div id="endgame__summary">
      <div class="item">
        <h1 class="title">Exp Gained</h1>
        <h1 class="data">{{ summary.exp_gain }}</h1>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'EndGame',
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
    let src = './../../../assets/img/texts/victory.png'
    this.status = require(src)
    // this.title = this.status ? 'Victory!' : 'You Lose'
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

  .title {
    margin: 0;
    width: 80vw;
    
  }
}
</style>

