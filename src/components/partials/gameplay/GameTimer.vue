<template>
  <div id="timer">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
export default {
  name: 'GameTimer',
  data() {
    return {
      timer: '',
      minute: 10,
      second: 0,
      text: '',
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.timerCount();
    }, 1000);
  },
  methods: {
    timerCount() {
      this.setText();
      if(this.minute >= 0) {
        if(this.second-1 === -1) {
          if(this.minute-1 >= 0) {
            this.minute--;
            this.second = 59;
          }
        } else {
          this.second--;
        }
      }
    },
    setText() {
      let min = (this.minute < 10 ? `0${this.minute}` : `${this.minute}`);
      let sec = (this.second < 10 ? `0${this.second}` : `${this.second}`);
      this.text = `${min}:${sec}`;
    }
  }
}
</script>

<style lang="scss" scoped>
#timer {
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  
  h1 {
    margin: 0;
  }
}
</style>
