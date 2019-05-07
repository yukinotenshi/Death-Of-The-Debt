<template>
  <button @click="doAction">
    {{this.title}}
  </button>
</template>

<script>
export default {
  name: 'GameButton',
  props: {
    title: String,
  },
  methods: {
    doAction() {
      this.$emit('action');
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  font-family: 'Itim';
  font-weight: bold;
  cursor: pointer;
  background-color: grey;
  border: rgb(61, 61, 61) solid 0.5vh;
  padding: 2.5vh;
  font-size: 3vh;
  color: white;
  width: 100%;
  border-radius: 2vh;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
}
</style>
