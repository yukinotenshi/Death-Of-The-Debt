<template>
  <v-container fluid id="roomjoin">
    <div id="roomjoin__list">
      <div>
        <div
          class="roomjoin__person"
          v-for="p in person"
          :key=p.name
        >
          <h2>{{p}}</h2>
          <h3>lv 31</h3>
        </div>
      </div>
    </div>
    <div id="roomjoin__code">
      <h2>Room Code:</h2>
      <h1>B73RNX</h1>
    </div>
    <router-link to="/play">
      <button>
        Start!
      </button>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: 'RoomJoin',
  data() {
    return {
      person: [
        'Dichi Andyno', 'Gabu Bentara', 'Fahmi Ahmad', "Yuu", "Kar", "Bizzzzz"
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#roomjoin {
  padding: 2rem;
}

#roomjoin__list, #roomjoin__code {
  border: 2px solid gray;
  border-radius: 20px;
  margin-bottom: 1rem;
}

#roomjoin__list {
  -ms-overflow-style: none;  // IE 10+
  overflow: -moz-scrollbars-none;  // Firefox
  background-color: #D6D6D6;
  height: 55vh;
  overflow: auto;

  &::-webkit-scrollbar { 
    display: none;  // Safari and Chrome
  }

  .roomjoin__person {
    border: 2px solid gray;
    border-radius: 20px;
    background-color: white;
    margin: 0.3rem;
    padding: 0.5rem 3rem;
  }
}

#roomjoin__code {
  text-align: center;
  padding: 2rem;

  h1, h2 {
    margin: 0;
  }
  h1 {
    font-size: 3rem;
  }
}

button {
  cursor: pointer;
  background-color: grey;
  border: 0;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  width: 100%;
  border-radius: 20px;
}
</style>