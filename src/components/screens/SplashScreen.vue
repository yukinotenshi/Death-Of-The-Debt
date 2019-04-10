<template>
  <v-container fluid>
    <img
      id="splash__logo"
      src="./../../assets/img/logo.png"
      alt="logo"
    >
    <img
      id="splash__chara"
      src="./../../assets/img/splash/chara.png"
      alt="logo"
    >
  </v-container>
</template>

<script>
export default {
  name: 'SplashScreen',
  created() {
    setTimeout(() => {
      if(this.$cookie.get('token')) {
        this.$router.push({name: 'menu'});
      } else {
        this.$router.push({name: 'login'});
      }
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('./../../assets/img/splash/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  #splash__logo {
    margin: 10vh;
    margin-bottom: 0;
    width: 70vw;
    height: auto;
  }

  #splash__chara {
    margin: 0;
    width: 75vw;
    height: auto;
  }
}
</style>
