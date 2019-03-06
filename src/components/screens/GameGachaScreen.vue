<template>
  <v-container id="gacha">
    <h1 v-if="isLoading">Gacha-ing your character...</h1>
    <div v-if="!isLoading">
      <h1>You are on {{status}} team!</h1>
      <div>
        <h1>Your team members:</h1>
        <h2
          v-for="t in team"
          :key="t"
        >
          {{t}}
        </h2>
      </div>
      <h1>Game will start in {{second}}...</h1>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'GameGachaScreen',
  props: {
    chasingTeam: Array,
    hidingTeam: Array,
  },
  data() {
    return {
      isLoading: true,
      second: 3,
      status: '',
      username: '',
      team: [],
    }
  },
  mounted() {
    setTimeout(this.toggleLoading, 2000);
  },
  methods: {
    toggleLoading() {
      this.isLoading = false;
      this.setStatus();
    },
    setStatus() {
      this.username = this.$store.state.user.username;
      console.log(this.hidingTeam, this.chasingTeam);
      console.log(this.chasingTeam[0]);
      for (let i in this.hidingTeam) {
        let p = this.hidingTeam[i];
        if(p === this.username) {
          this.status = 'hiding';
          this.team = this.hidingTeam;
          break;
        }
      }

      if(this.status === '') {
        for (let i in this.chasingTeam) {
          let p = this.chasingTeam[i];
          if(p === this.username) {
            this.status = 'chasing';
            this.team = this.chasingTeam;
            break;
          }
        }
      }
      this.startTimer();
    },
    startTimer() {
      setInterval(() => {
        this.second--;
        if(this.second === 0) {
          this.$router.push('play');
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
#gacha {
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
