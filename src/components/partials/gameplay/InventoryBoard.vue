<template>
  <v-container fluid id="gameplay__inventory">
    <div id="inventory-placeholder">
      <div id="inventory-board">
        <div id="inventory-board__header">
          <div />
          <div><h1>Inventory</h1></div>
          <div>
            <button
              @click="closeInventory"
            >
              X
            </button>
          </div>
        </div>
        <div id="inventory-board__items">
          <div
            class="inventory__item"
            v-for="item in items"
            :key="item.id"
          >
            <h1>{{item.name}}</h1>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'InventoryBoard',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Bomb',
        },
        {
          id: 2,
          name: 'Sword',
        },
        {
          id: 3,
          name: 'Fire Shield',
        },
      ],
    };
  },
  methods: {
    closeInventory() {
      this.$emit('closeInventory');
    }
  }
}
</script>

<style lang="scss" scoped>
#gameplay__inventory {
  position: absolute;
  z-index: 120;
  background-color: rgba(95, 95, 95, 0.8);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  #inventory-placeholder {
    padding: 1.2rem;
    background-color: white;
    height: calc(60vh - 2.4rem);
    width: calc(85vw - 2.4rem);
    border-radius: 20px;

    #inventory-board {
      h1 {
        text-align: center;
      }

      #inventory-board__header {
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

      #inventory-board__items {
        padding: 0.75rem;
        display: flex;
        
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
