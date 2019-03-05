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
    background-color: white;
    height: calc(60vh - 2.4rem);
    width: calc(85vw - 2.4rem);
    border-radius: 20px;

    .closableboard__board {
      h1 {
        text-align: center;
      }

      .closableboard__board__header {
        display: flex;
        flex-direction: row;

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
          background: white;
          border: 2px solid black;
          border-radius: 50px;
          font-size: 1.5rem;
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
