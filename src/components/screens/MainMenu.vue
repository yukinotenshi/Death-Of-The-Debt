<template>
  <v-container fluid id="mainmenu">
    <div id="mainmenu__container">
      <div id="logo__container">
        <img src="./../../assets/title.png" id="logo">
      </div>
      <router-link :to="{name: 'room'}">
        <button>
          Create Room
        </button>
      </router-link>
      <div id="joinroom">
        <input type="text" v-model="code">
        <router-link :to="{name: 'room'}">
          <button>
            Join Room
          </button>
        </router-link>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MainMenu'
}
</script>

<style lang="scss" scoped>

#logo__container {
  text-align: center;
}

#logo {
  max-width: 75%;
}

#joinroom {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin: 1rem 0;

  input[type=text] {
    margin-right: 1rem;
  }

  button {
    min-width: 10rem;
  }
}

#loginscreen__container {
  border-radius: 20px;
  padding: 0.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h3 {
    margin: 0;
  }
}

input[type=text] {
  font-size: 1.25rem;
  border: 2px solid gray;
  border-radius: 20px;
  background-color: white;
  padding: 1rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;    
  box-sizing: border-box;
}

button {
  cursor: pointer;
  background-color: grey;
  border: 0;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  width: 100%;
  border-radius: 20px;
}

</style>