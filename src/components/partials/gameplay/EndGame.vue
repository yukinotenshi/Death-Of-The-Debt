<template>
  <v-container fluid id="endgame">
    <div class="header">
      <img src="./../../../assets/img/texts/victory.png" v-if="status">
      <img src="./../../../assets/img/texts/lose.png" v-if="!status">
    </div>
    <div class="panel">
      <h2>{{ winnerTeam }} team wins!</h2>
      <h3>Level {{ summary.level }}</h3>
      <div id="endgame__summary">
        <div class="item">
          <h1 class="title">Exp</h1>
          <div class="data">
            <h1>{{ summary.exp_gain }}</h1>
            <i
              class="fa fa-arrow-up"
              aria-hidden="true"
              v-if="summary.exp_gain !== 0"
            />
          </div>
        </div>
        <div class="item">
          <h1 class="title">Level</h1>
          <div class="data">
            <h1>{{ summary.level_gain }}</h1>
            <i
              class="fa fa-arrow-up"
              aria-hidden="true"
              v-if="summary.level_gain !== 0"
            />
          </div>
        </div>
      </div>
      <router-link to="/menu">
        <game-button
          title="Back to Menu"
          class="back"
        />
      </router-link>
    </div>
  </v-container>
</template>

<script>
import GameButton from '@/components/partials/utils/GameButton.vue'

export default {
  name: 'EndGame',
  components: {
    GameButton
  },
  props: {
    status: Boolean,
    winnerTeam: String,
    winners: Array,
    summary: Object
  }
}
</script>

<style lang="scss" scoped>
$brown: rgb(51, 30, 2);

#endgame {
  height: 100vh;
  width: 100vw;
  background-color: rgb(255, 196, 132);
  z-index: 999999;
  position: absolute;
  text-align: center;

  background: url('./../../../assets/img/backgrounds/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  >.header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    margin-bottom: 5vh;

    img {
      margin: 0;
      width: 80vw;
    }
  }

  >.panel {
    background-color: rgb(102, 62, 10);
    border: 1vh solid #FFD659;
    margin: 0 10vw;
    padding: 2vh 0;
    border-radius: 2vh;
    color: white;

    >h2 {
      font-size: 4vh;
      margin: 0;
      border: none;
      border-bottom: 3px dashed #fff;
      padding-bottom: 2vh;
      margin-top: 1.5vh;
      margin-bottom: 4vh;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
    }

    >h3 {
      margin-bottom: 3vh;
      font-size: 4vh;
      text-shadow: 1px 1px 0 $brown,
        1px -1px 0 $brown,
        -1px 1px 0 $brown,
        -1px -1px 0 $brown,
        1px 0px 0 $brown,
        1px 1px 0 $brown,
        -1px 0px 0 $brown,
        0px -1px 0 $brown,
        2px 2px 5px rgba(0,0,0,0.47);
    }

    #endgame__summary {
      .item {
        margin: 2vh 0;
        display: flex;
        flex-direction: row;

        .title {
          font-size: 4vh;
          flex-basis: 35%;
          text-align: left;
          padding-left: 8vw;
          padding-right: 2vw;
          margin: 0;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
        }
        .data {
          flex-basis: 65%;
          background-color: grey;
          margin-right: 3vw;
          border-radius: 5px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          h1 {
            font-size: 4vh;
            margin: 0;
            margin-right: 5vw;
          }
          i {
            font-size: 4vh;
            color: rgb(30, 255, 30);
            text-shadow: 1px 1px 0 #fff,
              1px -1px 0 #fff,
              -1px 1px 0 #fff,
              -1px -1px 0 #fff,
              1px 0px 0 #fff,
              1px 1px 0 #fff,
              -1px 0px 0 #fff,
              0px -1px 0 #fff,
              2px 2px 5px rgba(0,0,0,0.47);
          }
        }
      }
    }

    >a>.back {
      margin-top: 5vh;
      width: 80%;
      background-color: #12B3EF;
    }
  }
}
</style>

