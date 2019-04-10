<template>
  <div>
    <img :src="source" alt="">
  </div>
</template>

<script>
export default {
  name: 'GameCurrItem',
  props: {
    name: String,
  },
  data() {
    return {
      source: '@assets/img/items/',
    };
  },
  created() {
    // alert(this.source);
    this.source += `${this.name}.png`;
    this.source = require(this.source);
    // alert(this.source);
  },
}
</script>

<style lang="scss" scoped>

</style>
