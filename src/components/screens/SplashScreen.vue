<template>
  <v-container fluid>
    <transition name="fade">
      <div id="precaution__placeholder" v-if="warning">
        <div id="precaution__container">
          <div id="image-container">
            <img
              class="splash__icon"
              id="vibrate"
              src="./../../assets/img/icons/vibrate.png"
              alt="logo"
            />
            <img
              class="splash__icon"
              id="volume"
              src="./../../assets/img/icons/volume.png"
              alt="logo"
            />
          </div>
          <h3><b>Turn on device vibration</b> and <b>maximize device volume</b> for the best experience.</h3>
        </div>
      </div>
    </transition>
    <img
      id="splash__logo"
      src="./../../assets/img/logo.png"
      alt="logo"
    >
    <img
      id="splash__chara"
      src="./../../assets/img/splash/chara.png"
      alt="logo"
    >    
  </v-container>
</template>

<script>
export default {
  name: 'SplashScreen',
  data() {
    return {
      warning: true,
    }
  },
  created() {
    setTimeout(() => {
      this.warning = false;
    }, 5000);
    setTimeout(() => {
      if(this.$cookie.get('token')) {
        this.$router.push({name: 'menu'});
      } else {
        this.$router.push({name: 'login'});
      }
    }, 8000);
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('./../../assets/img/splash/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  #precaution__placeholder {
    position: fixed;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: white;
    color: brown;

    #precaution__container {
      #image-container {
        width: 100%;
        position: relative;

        #vibrate {
          position: absolute;
          animation: iconswoop1 6s 1 cubic-bezier(0, 0.94, 0.57, 1);
          opacity: 0;
        }

        #volume {
          animation: iconswoop2 6s 1 cubic-bezier(0, 0.94, 0.57, 1);
          opacity: 1;
        }
      }

      h3 {
        font-weight: normal; 
        margin: 0;
        width: 80vw;
      }      
    }
  }

  #splash__logo {
    margin: 10vh;
    margin-bottom: 0;
    width: 70vw;
    height: auto;
  }

  #splash__chara {
    margin: 0;
    width: 75vw;
    height: auto;
  }

  .splash__icon {
    width: 20vw;
    height: 20vw;
  }
}

@keyframes iconswoop1 {
  0% {
    transform: translate(100vw, 0);
    opacity: 1;
  }
  20% {
    transform: translate(0, 0);
    opacity: 1;
  }
  40% {
    transform: translate(0, 0);
    opacity: 1;
  }
  60% {
    transform: translate(-100vw, 0);
    opacity: 1;
  }
  100% {
    transform: translate(-100vw, 0);
    opacity: 1;
  }
}

@keyframes iconswoop2 {
  0% {
    transform: translate(100vw, 0);
  }
  40% {
    transform: translate(100vw, 0);
  }
  60% {
    transform: translate(0, 0);
  }
  80% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100vw, 0);
  }
}

</style>
