<template>
  <v-container fluid id="registerscreen">
    <transition name="fade">
    <loading-overlay
      v-if="isRegistering"
      subtitle="Creating new account..."
    />
    </transition>
    <div id="registerscreen__container">
      <h1>Register</h1>
      <h3>Username</h3>
      <input type="text" v-model="username">
      <h3>Password</h3>
      <input type="password" v-model="password">
      <h3>Re-type Password</h3>
      <input type="password" v-model="passwordConfirm">
      <p>
        {{ errorText }}
      </p>
      <game-button title="Register" v-on:action="check"/>
    </div>
  </v-container>
</template>

<script>
import GameButton from './../partials/utils/GameButton';
import LoadingOverlay from './../partials/utils/LoadingOverlay';

export default {
  name: 'RegisterScreen',
  components: {
    GameButton,
    LoadingOverlay,
  },
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      errorText: "",
      isRegistering: false,
    }
  },
  methods: {
    check() {
      if (this.username.length == 0) {
        this.errorText = "Username required";
        return;
      } else if (this.password.length == 0) {
        this.errorText = "Password required";
        return;
      } else if (this.password != this.passwordConfirm) {
        this.errorText = "Password do not match";
        return;
      }

      this.errorText = "";
      this.isRegistering = true;

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
        if (response.status === 500) {
          this.errorText = "Username has been taken.";
          this.isRegistering = false;
        }
        else if (response.status === 200) {
          this.$store.commit('setUserToken', response.data.access_token);
          this.$router.push("menu"); 
        } else {
          this.errorText = "Error on creating new account.";
          this.isRegistering = false;
        }
      })
      .catch(error => {
        this.errorText = "Cannot fetch data from the server. Please check your internet connection.";
        this.isRegistering = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #FFD659;
$darkyellow: #D2B24F;
$brown: #E3AF5B;
$darkbrown: #6E563C;

#registerscreen {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: url('./../../assets/img/backgrounds/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  #registerscreen__container {
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

    h1, h3 {
      color: white;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
    }
    
    h3 {
      margin: 0 1rem;
      display: inline;
    }

    p {
      color: brown;
      margin: 10px 1rem;
      text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
    }

    input[type=text],
    input[type=password] {
      width: 100%;
      font-size: 1.25rem;
      border: 2px solid $darkbrown;
      border-radius: 20px;
      background-color: white;
      padding: 0.5rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;    
      box-sizing: border-box;
    }
  }

  button {
    text-decoration: none;
    background-color: $darkbrown;
    width: 100%;
    color: white;
    transition-duration: 0.2s;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.17);

    &:active {
      color: black;
      -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
      -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
      box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.09);
    }
  }
}

</style>