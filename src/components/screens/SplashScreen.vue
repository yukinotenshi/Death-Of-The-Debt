<template>
  <v-container fluid>
    <h1>Hello!</h1>
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

</style>
