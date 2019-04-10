<template>
  <v-container fluid class="closableboard">
    <div class="closableboard__placeholder">
      <div class="closableboard__board">
        <div class="closableboard__board__header">
          <div />
          <div><h1>{{title}}</h1></div>
          <div>
            <button
              @click="closeBoard"
            >
              X
            </button>
          </div>
        </div>
        <div class="closableboard__board__items">
          <slot/>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ClosableBoard',
  props: {
    title: String,
  },
  methods: {
    closeBoard() {
      this.$emit('closeBoard');
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #FFD659;
$brown: #E3AF5B;
$darkbrown: #6E563C;

.closableboard {
  position: absolute;
  z-index: 120;
  background-color: rgba(95, 95, 95, 0.8);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .closableboard__placeholder {
    padding: 1.2rem;
    min-height: 60vh;
    height: auto;
    width: calc(85vw - 2.4rem);

    background-color: $brown;
    border-radius: 20px;
    border: 0.3rem solid $yellow;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);

    .closableboard__board {
      h1 {
        text-align: center;
        color: white;
        text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
      }

      .closableboard__board__header {
        display: flex;
        flex-direction: row;

        h1 {
          font-family: 'Fredoka One';
          // letter-spacing: 0.1rem;
          font-weight: normal;
        }

        >div {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        >div:first-child, >div:last-child {
          flex-basis: 20%;
          max-width: 20%;
        }

        >div:nth-child(2) {
          flex-basis: 60%;
          max-width: 60%;
        }

        button {
          cursor: pointer;
          background: $yellow;
          border: 0.2rem solid $darkbrown;
          border-radius: 50px;
          margin-left: 1vh;
          font-size: 3.5vh;
          font-weight: bold;
          color: $darkbrown;

          -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
          -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
          box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
        }
      }

      .closableboard__board__items {
        padding: 2vh;
        display: flex;

        >div {
          width: 100%;
        }
        
        .inventory__item {
          padding: 0.5rem;
          flex-basis: 33%;
          max-width: 33%;

          h1 {
            font-size: 1rem;
          }
        }
      }
    }

  }
}
</style>
