<template>
  <v-container fluid class="loading">
    <div class="loading__placeholder">
      <img src="./../../../assets/img/icons/loading-spinner.svg">
      <div><p>{{subtitle}}</p></div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    subtitle: String,
  }
}
</script>

<style lang="scss" scoped>
$yellow: rgb(255, 214, 89);
$brown: #E3AF5B;
$darkbrown: #6E563C;

.loading {
  position: fixed;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .loading__placeholder {
    padding: 1.2rem;
    min-height: auto;
    height: auto;
    width: auto;

    background-color: $brown;
    border-radius: 20px;
    border: 0.3rem solid $yellow;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);

    p {
      margin: 0;
      color: $darkbrown;
      font-weight: bold;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
    }
  }
}
</style>
