<template>
  <div id="inventory-board__items">
    <div
      class="inventory__item"
      v-for="item in items"
      :key="item.id"
    >
      <h1>{{item.name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryBoardContents',
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
