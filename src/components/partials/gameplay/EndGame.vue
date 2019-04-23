<template>
  <v-container fluid id="endgame">
    <h1 class="title">{{ title }}</h1>
  </v-container>
</template>

<script>
export default {
  name: 'EndGame',
  props: {
    status: Boolean,
    winnerTeam: String,
    winners: Array,
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.title = this.status ? 'Victory!' : 'You Lose'

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
  }
}
</style>

