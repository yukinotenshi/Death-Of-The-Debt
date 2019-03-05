<template>
  <v-container fluid>
    <game-button
      v-on:action="gotoCreateRoom"
      title="Create Room"
    />
    <game-button title="Join Room" />
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
  methods: {
    gotoCreateRoom() {
      this.$router.push({ name: 'room' });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
