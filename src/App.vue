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
import LoginScreen from './components/screens/LoginScreen.vue';

const routes = [
  {
    path: '*',
    name: 'login',
    component: LoginScreen
  },
  {
    path: '/play',
    name: 'room',
    component: RoomJoin
  },
  {
    path: '*',
    name: 'play',
    component: Gameplay
  }
]

const router =  new VueRouter({
  routes,
  mode: 'abstract',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default {
  name: 'app',
  router,
  components: {
    Gameplay
  },
  mounted() {
    this.$router.replace('/') // added this
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
