<template>
  <v-container id="gacha">
    <div v-if="isLoading" id="loading">
      <img src="../../assets/img/logo.png" alt="">
      <div id="time">
        <h2>Run! Hide from<br>your enemies!</h2>
        <h1>{{ maxLoadingSecond - Math.trunc(loadingSecond) }}</h1>
      </div>
      <h1 id="title">Gacha-ing your character...</h1>
      <div class="loading-bar">
        <div
          v-bind:style="{ width: (((loadingSecond/maxLoadingSecond) * 100)+'%') }"
        />
      </div>
    </div>
    <div v-if="!isLoading" id="result">
      <div id="chara__placeholder">
        <img src="../../assets/img/misc/light.png" alt="" id="light">
        <img :src="chara" alt="" id="chara">
      </div>
      <h1 id="provocative-text">
        {{ provocativeText }}
      </h1>
      <div id="panel__placeholder" v-if="enablePanel">
        <div id="panel__container">
          <div id="character-name">
            <h2>{{character}}</h2>
            <h4>~{{status}} Team~</h4>
          </div>
          <div>
            <h3>Your team members:</h3>
            <div
              v-for="t in team"
              class="name-list"
              :key="t.username"
            >
              {{t.username}}
            </div>
          </div>
          <h1>Game will start in {{second}}...</h1>
        </div>
      </div>
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
      enablePanel: false,
      maxLoadingSecond: 60,
      incLoadingSecond: 0.01,
      loadingSecond: 0,
      second: 5,
      status: '',
      username: '',
      team: [],
      chara: '',
      provocativeText: ''
    }
  },
  mounted() {
    setInterval(() => {
      this.loadingSecond += this.incLoadingSecond;
    }, 10);
    setTimeout(this.toggleLoading, this.maxLoadingSecond*1000);
  },
  methods: {
    toggleLoading() {
      this.isLoading = false;
      this.setStatus();
    },
    setStatus() {
      this.username = this.$store.state.user.username;

      for (let i in this.hidingTeam) {
        let p = this.hidingTeam[i].username;
        if(p === this.username) {
          this.status = 'Hiding';
          this.provocativeText = 'Hide from the chasing team!';
          if (this.character === 'Drunk')
            this.chara = require("./../../assets/img/chara/pose/hiding2.png");
          else if (this.character === 'Trickster')
            this.chara = require("./../../assets/img/chara/pose/hiding1.png");
          this.team = this.hidingTeam;
          break;
        }
      }

      if(this.status === '') {
        for (let i in this.chasingTeam) {
          let p = this.chasingTeam[i].username;
          if(p === this.username) {
            this.status = 'Chasing';
            this.provocativeText = 'Go chase all hiding team members!';
            if (this.character === 'Police') 
              this.chara = require("./../../assets/img/chara/pose/chasing1.png");
            else if (this.character === 'Debt Collector')
              this.chara = require("./../../assets/img/chara/pose/chasing2.png");
            this.team = this.chasingTeam;
            break;
          }
        }
      }

      setTimeout(() => {
        this.startTimer();
        this.enablePanel = true;
      }, 2000);
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
$one: 3px;
$yellow: #FFD659;
$darkyellow: #D2B24F;
$brown: #E3AF5B;
$darkbrown: rgb(102, 10, 10);
$lightbrown: rgb(220, 50, 50);

#gacha {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url('./../../assets/img/backgrounds/blue.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#loading {
  img {
    width: 80vw;
    margin-bottom: 5vh;
  }

  #time {
    h2 {
      font-size: 4vh;
      line-height: 4vh;
      margin: 2vh 0;
      color: $yellow;
      text-shadow:
        2px 2px 0 $darkbrown,
        2px -2px 0 $darkbrown,
        -2px 2px 0 $darkbrown,
        -2px -2px 0 $darkbrown,
        2px 0px 0 $darkbrown,
        2px 2px 0 $darkbrown,
        -2px 0px 0 $darkbrown,
        0px -2px 0 $darkbrown,
        2px 2px 5px rgba(0,0,0,0.47);
    }
    h1 {
      margin: 2vh 0;
      color: $yellow;
      font-size: 15vh;
      text-shadow:
        3px 3px 0 $darkbrown,
        3px -3px 0 $darkbrown,
        -3px 3px 0 $darkbrown,
        -3px -3px 0 $darkbrown,
        3px 0px 0 $darkbrown,
        3px 3px 0 $darkbrown,
        -3px 0px 0 $darkbrown,
        0px -3px 0 $darkbrown,
        2px 2px 5px rgba(0,0,0,0.47);
    }
  }

  #title {
    color: white;
    font-size: 2.5vh;
    padding: 0.3rem 0;
    background-color: #FD4B74;
    border-radius: 10px;
    width: 70vw;
    margin: 0;
    margin-left: calc(30vw / 2);
    margin-right: calc(30vw / 2);
  }

  .loading-bar {
    width: 80vw;
    margin: 0 10vw;
    height: 2rem;
    background-color: rgb(105, 77, 0);
    border-radius: 50px;
    display: flex;
    align-items: center;

    >div {
      // width: 80%;
      height: 1.5rem;
      background-color: rgb(104, 173, 236);
      border-radius: 50px;
      margin: 0.25rem;
    }
  }
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

#provocative-text {
  z-index: 1000;
  position: absolute;
  width: 100vw;
  left: 0;
  opacity: 0;
  top: 50vh;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
  animation: texthype 5s 1 linear;
}

#panel__placeholder {
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  left: 0;
  bottom: 0;
  z-index: 1001;
  animation: panelswoop 0.5s 1 cubic-bezier(0, 0.94, 0.57, 1);

  #panel__container {
    height: auto;
    width: calc(85vw - 2.4rem);
    overflow: hidden;
    background-color: rgb(165, 87, 42);
    border-radius: 20px 20px 0 0;
    border: 0.3rem solid rgb(126, 61, 23);
    border-bottom: 0;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);

    #character-name {
      background: brown;
      border-top: 1px dashed $darkbrown;
      border-bottom: 1px dashed $darkbrown;
      margin: 0.75rem 0;
      box-shadow: 0 0 0 3px brown, 0 3px 1px 2px #00000022;

      h2, h4 {
        margin: 0;
      }

      h4 {
        background: $lightbrown;
        color: $darkbrown;
      }
    }

    .name-list {
      background: $lightbrown;
      border-top: 1px dashed $darkbrown;
      border-bottom: 1px dashed $darkbrown;
      margin: 0.75rem 0;
      box-shadow: 0 0 0 3px $lightbrown, 0 3px 1px 2px #00000022;
      color: $darkbrown;
    }

    h1, h3 {
      color: white;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    }

    h3 {
      margin-bottom: 0;
    }
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

@keyframes texthype {
  0% {
    transform: scale(5, 5);
    opacity: 1;
  }
  5% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(0.8, 0.8);
    opacity: 0;
  }
}

@keyframes panelswoop {
  from {
    transform: translate(0, 100vw);
  }
  to {
    transform: translate(0, 0);
  }
}
</style>
