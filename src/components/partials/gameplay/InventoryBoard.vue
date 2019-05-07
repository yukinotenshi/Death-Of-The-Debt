<template>
  <v-container fluid id="gameplay__inventory" @click="closeInventory">
    <div id="inventory-placeholder">
      <div id="inventory-board"> 
        <div id="inventory-board__header">
          <div id="profile__avatar-container">
            <img :src="avatarSrc"/>     
          </div>
          <div id="profile__lv">
            <span>Lv.{{level}}</span>
          </div>
          <button>×</button>
        </div>
        <div id="inventory-board__items">
          <div id="character-name">
            <h2>{{character}}</h2>
            <h4>~{{status}} Team~</h4>
          </div>
          <div>
            <h3>Your team members:</h3>
            <div
              v-for="item in items"
              class="name-list"
              :key="item.username"
            >
              {{item.username}}
            </div>
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
      items: [],
      level: 0,
      status: '',
      character: '',
      avatarSrc: '',
    };
  },
  mounted() {
    this.character = this.$store.state.room.character;
    this.level = this.$store.state.user.level;
    this.getTeam();
    this.setAvatar(this.character);
  },
  methods: {
    setAvatar(character) {
      if(character === 'Police') {
        this.avatarSrc = require("./../../../assets/img/chara/pose/chasing1.png");
      }
      else if (character === 'Debt Collector') {
        this.avatarSrc = require("./../../../assets/img/chara/pose/chasing2.png");
      }
      else if (character === 'Drunk') {
        this.avatarSrc = require("./../../../assets/img/chara/pose/hiding2.png");
      }
      else if (character === 'Trickster') {
        this.avatarSrc = require("./../../../assets/img/chara/pose/hiding1.png");
      }
    },
    getTeam() {
      let hidingTeam = this.$store.state.room.hiding_team;
      let chasingTeam = this.$store.state.room.chasing_team;
      let username = this.$store.state.user.username;
      let level = this.$store.state.user.level;

      for (let i in hidingTeam) {
        let p = hidingTeam[i].username;
        if(p === username) {
          this.status = 'Hiding';
          this.items = hidingTeam;
          break;
        }
      }

      if(this.status === '') {
        for (let i in chasingTeam) {
          let p = chasingTeam[i].username;
          if(p === username) {
            this.status = 'Chasing';
            this.items = chasingTeam;
            break;
          }
        }
      }
    },
    closeInventory() {
      this.$emit('closeInventory');
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #FFD659;
$brown: #E3AF5B;
$darkbrown:rgb(102, 10, 10);
$lightbrown: rgb(220, 50, 50);

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
    height: auto;
    width: calc(85vw - 2.4rem);
    text-align: center;
    overflow: hidden;
    position: relative;

    background-color: $brown;
    border-radius: 20px;
    border: 0.3rem solid $yellow;
    -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);

    #inventory-board {
      width: calc(85vw - 2.4rem);
      height: auto;

      h1 {
        text-align: center;
        color: white;
        text-shadow: 2px 2px 5px rgba(0,0,0,0.47);
      }

      #inventory-board__header {
        h1 {
          font-family: 'Fredoka One';
        }

        #profile__lv {
          span {
            border-radius: 10px 10px 0 0;
            background: $darkbrown;
            color: white;
            padding: 0 0.5rem;          
          }
        }

        #profile__avatar-container {
          border-radius: 1000px;
          width: 25vw;
          height: 25vw;
          margin: 0.5rem auto;
          overflow: hidden;
          background: $yellow;

          img {
            width: 100%;
          }  
        }

        button {
          cursor: pointer;
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: $yellow;
          border: 0.2rem solid #6E563C;
          border-radius: 50px;
          font-size: 3.5vh;
          font-weight: bold;
          color: #6E563C;

          -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
          -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
          box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
        }
      }

      #inventory-board__items {
        height: auto;
        width: calc(85vw - 2.4rem);
        -webkit-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
        -moz-box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);
        box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.31);

        #character-name {
          background: brown;
          border-top: 1px dashed $darkbrown;
          border-bottom: 1px dashed $darkbrown;
          box-shadow: 0 0 0 3px brown, 0 3px 1px 2px #00000022;

          h2, h4 {
            margin: 0;
          }

          h2 {
            color: white;
          }

          h4 {
            background: $lightbrown;
            color: $darkbrown;
          }
        }

        .name-list {
          background: $lightbrown;
          border-top: 1px dashed $darkbrown;
          border-bottom: 1px dashed $darkbrown;
          margin: 0.75rem 0;
          box-shadow: 0 0 0 3px $lightbrown, 0 3px 1px 2px #00000022;
          color: $darkbrown;
        }

        h1, h3 {
          color: white;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        }

        h3 {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
