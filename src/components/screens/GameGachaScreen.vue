<template>
  <v-container id="gacha">
    <!-- <h1 v-if="isLoading">Gacha-ing your character...</h1> -->
    <div v-if="isLoading">
      <h1>Gacha-ing your character...</h1>
    </div>
    <div v-if="!isLoading" id="result">
      <div id="chara__placeholder">
        <img src="../../assets/img/misc/light.png" alt="" id="light">
        <img :src="chara" alt="" id="chara">
      </div>
      <h1>You are on {{status}} team!</h1>
      <h2>{{character}}</h2>
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
    character: String
  },
  data() {
    return {
      isLoading: true,
      second: 3,
      status: '',
      username: '',
      team: [],
      chara: './../../assets/img/chara/pose/',
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
      
      for (let i in this.hidingTeam) {
        let p = this.hidingTeam[i];
        if(p === this.username) {
          this.status = 'hiding';
          if (this.character === 'Drunk')
            this.chara = 'https://files.catbox.moe/n6xy6k.png';
          else if (this.character === 'Trickster')
            this.chara = 'https://files.catbox.moe/8qh7gj.png';
          this.team = this.hidingTeam;
          break;
        }
      }

      if(this.status === '') {
        for (let i in this.chasingTeam) {
          let p = this.chasingTeam[i];
          if(p === this.username) {
            this.status = 'chasing';
            if (this.character === 'Police') 
              this.chara = 'https://files.catbox.moe/3lgzyf.png';
            else if (this.character === 'Debt Collector')
              this.chara = 'https://files.catbox.moe/bn5spu.png';
            this.team = this.chasingTeam;
            break;
          }
        }
      }

      // this.chara += (`${this.status}1.png`);
      // this.chara = require(this.chara);
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
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url('./../../assets/img/backgrounds/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#result {
  h1, h2 {
    color: white;
  }
  h1 {
    font-size: 4vh;
  }
}

#chara__placeholder {
  display: flex;
  height: 100vw;
  justify-content: center;
  align-items: center;

  #chara {
    position: absolute;
    z-index: 999;
    height: 40vh;
    width: auto;
  }

  #light {
    width: 200vw;
    animation: rotation 2s infinite linear;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
