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
  cursor: pointer;
  background-color: grey;
  border: 0;
  padding: 2.5vh;
  font-size: 3vh;
  font-weight: bold;
  color: white;
  width: 100%;
  border-radius: 20px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
