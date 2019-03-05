<template>
  <v-container fluid id="registerscreen">
    <div id="loginscreen__container">
      <h3>Username</h3>
      <input type="text" v-model="username">
      <h3>Password</h3>
      <input type="password" v-model="password">
      <h3>Re-type Password</h3>
      <input type="password" v-model="passwordConfirm">
      <p>
        {{ errorText }}
      </p>
      <button v-on:click="check()">
        Register
      </button>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterScreen',
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      errorText: ""
    }
  },
  methods: {
    check() {
      if (this.username.length < 4) {
        this.errorText = "Username length must be at least 4 characters long";
      } else if (this.password.length < 8) {
        this.errorText = "Password length must be at least 8 characters long";
      } else if (this.password != this.passwordConfirm) {
        this.errorText = "Password do not match";
      } else {
        this.errorText = "";

        const url = `${this.$store.state.baseUrl}/user/register`;
        var fetchData = new Request(url, {
          method: 'POST',
          body: JSON.stringify({
            "username": this.username,
            "password": this.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        fetch(fetchData)
        .then(response => response.json())
        .then(response => {
          if (response.status === 500) this.errorText = "Username has been taken";
          else if (response.status === 200) {
            this.$store.commit('setUserToken', response.data.access_token);
            this.$router.push("menu"); 
          } else this.errorText = "Error on creating new account";
        })
      }
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