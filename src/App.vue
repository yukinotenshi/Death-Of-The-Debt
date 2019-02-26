<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view />
  </div>
</template>

<script>
import VueRouter from 'vue-router';
import Gameplay from './components/screens/Gameplay.vue';
import RoomJoin from './components/screens/RoomJoin.vue';

const routes = [
  {path: '/', component: Gameplay},
  {path: '/room', component: RoomJoin},
]

const router =  new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default {
  name: 'app',
  router,
  components: {
    Gameplay
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

html, body {
  height: 99% !important;
  overflow: hidden !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
