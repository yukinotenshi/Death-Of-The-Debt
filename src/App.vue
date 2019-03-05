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
import MainMenu from './components/screens/MainMenu.vue';
import RegisterScreen from './components/screens/RegisterScreen.vue';

const routes = [
  {
    path: '*',
    name: 'login',
    component: LoginScreen
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterScreen
  },
  {
    path: '/menu',
    name: 'menu',
    component: MainMenu
  },
  {
    path: '/room',
    name: 'room',
    component: RoomJoin
  },
  {
    path: '/play',
    name: 'play',
    component: Gameplay
  }
]

const router =  new VueRouter({
  routes,
  mode: 'abstract',
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

export default {
  name: 'app',
  router,
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
  height: 100% !important;
  overflow: hidden !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
