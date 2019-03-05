<template>
  <v-container fluid>
    <router-link :to="{name: 'room'}">
      <game-button title="Create Room" @action="createRoom()"/>
    </router-link>
    <router-link :to="{name: 'room'}">
      <game-button title="Join Room" @action="joinRoom()"/>
    </router-link>
  </v-container>
</template>

<script>
import GameButton from './../utils/GameButton.vue';

export default {
  name: 'PlayOptionsContents',
  components: {
    GameButton,
  },
  methods: {
    createRoom() {
      
    },
    joinRoom() {
      
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
