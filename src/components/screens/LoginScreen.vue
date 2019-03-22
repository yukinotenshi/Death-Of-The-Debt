<template>
  <v-container fluid id="loginscreen">
    <transition name="fade">
    <loading-overlay
      v-if="isLoggingIn"
      subtitle="Logging in..."
    />
    </transition>
    <div id="loginscreen__container">
      <h1>Login</h1>
      <h3>Username</h3>
      <input type="text" v-model="username">
      <h3>Password</h3>
      <input type="password" v-model="password">
      <p>
        {{ errorText }}
      </p>
      <game-button title="Login" v-on:action="login"/>
      <hr/>
      <game-button title="Create Account" v-on:action="register"/>
    </div>
  </v-container>
</template>

<script>
import GameButton from './../partials/utils/GameButton';
import LoadingOverlay from './../partials/utils/LoadingOverlay';

export default {
  name: 'LoginScreen',
  components: {
    GameButton,
    LoadingOverlay,
  },
  data() {
    return {
      username: "",
      password: "",
      errorText: "",
      isLoggingIn: false,
    }
  },
  methods: {
    login() {
      if (this.username.length == 0 || this.password.length == 0) {
        this.errorText = "Username or password cannot be blank.";
        return;
      }

      this.isLoggingIn = true;

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
        } else if(response.status === 404) {
          this.errorText = 'Wrong username/password.';
          this.isLoggingIn = false;
        } else {
          this.errorText = 'Cannot login. Please try again.';
          this.isLoggingIn = false;
        }
      })
      .catch(error => {
        this.errorText = 'Cannot fetch data from the server. Please check your internet connection.';
        this.isLoggingIn = false;
      })
    },
    register() {
      this.$router.push({ name: 'register' });
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #FFD659;
$darkyellow: #D2B24F;
$brown: #E3AF5B;
$darkbrown: #6E563C;

#loginscreen {
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

  #loginscreen__container {
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

    hr {
      height: 1px;
      border: 0;
      border-top: 1px solid #6E563C;
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