<template>
  <v-container fluid id="loginscreen">
    <div id="loginscreen__container">
      <h1>Login</h1>
      <h3>Username</h3>
      <input type="text" v-model="username">
      <h3>Password</h3>
      <input type="password" v-model="password">
      <button @click="login">
        Login
      </button>
      <button @click="register">
        Create Account
      </button>
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
  },
  methods: {
    login() {
      let fetchData = {
        method: 'POST',
        body: JSON.stringify(
          {
            username: this.username,
            password: this.password,
          }
        ),
        headers: {
          "Content-Type": "application/json",
        }
      };

      fetch(`${this.$store.state.baseUrl}/user/login`, fetchData)
      .then(response => response.json())
      .then(response => {
        if(response.status === 200) {
          this.$cookie.set('token', response.data.access_token);
          this.$store.commit('setUser', response.data);
          this.$router.push({name: 'menu'});
        }
      })
    },
    register() {
      this.$router.push({ name: 'register' });
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