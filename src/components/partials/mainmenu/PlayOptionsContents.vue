<template>
  <v-container fluid>
    <game-button title="Hehehe" />
    <game-button title="Hehehe" />
  </v-container>
</template>

<script>
import GameButton from './../utils/GameButton.vue';

export default {
  name: 'PlayOptionsContents',
  components: {
    GameButton,
  },
}
</script>

<style lang="scss" scoped>

</style>
