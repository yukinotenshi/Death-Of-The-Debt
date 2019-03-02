<template>
  <v-container fluid id="loginscreen">
    <div id="loginscreen__container">
      <h3>Username</h3>
      <input type="text" v-model="username">
      <h3>Password</h3>
      <input type="password" v-model="password">
      <router-link :to="{name: 'menu'}">
        <button>
          Login
        </button>
      </router-link>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'LoginScreen',
  data() {
    return {
      username: "",
      password: "",
    }
  }
}
</script>

<style lang="scss" scoped>

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

  input[type=text],
  input[type=password] {
    font-size: 1.25rem;
    border: 2px solid gray;
    border-radius: 20px;
    background-color: white;
    padding: 0.5rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;    
    box-sizing: border-box;
  }
}

button {
  cursor: pointer;
  background-color: grey;
  border: 0;
  margin-top: 1rem;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  width: 100%;
  border-radius: 20px;
}

</style>