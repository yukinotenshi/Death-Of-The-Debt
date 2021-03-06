import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import config from './../config.json'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: '',
      id: '',
      username: '',
      level: '',
    },
    room: {
      chasing_team: [],
      hiding_team: [],
      is_owner: '',
      room_id: '',
      character: '',
    },
    baseUrl: config.baseUrl,
  },
  plugins: [createPersistedState()],
  getters: {
    getUser(state) {
      return state.user;
    },
    getRoom(state) {
      return state.room;
    },
    getChasingTeam(state) {
      return state.chasing_team;
    },
    getHidingTeam(state) {
      return state.hiding_team;
    }
  },
  mutations: {
    setUser(state, data) {
      state.user.token = data.access_token;
      state.user.id = data.id;
      state.user.username = data.username;
    },
    setCharacter(state, data) {
      state.room.character = data.character;
    },
    setLevel(state, level) {
      state.user.level = level;
    },
    setRoom(state, data) {
      state.room.room_id = data.room_id;
      state.room.is_owner = data.is_owner;
    },
    setRoomMember(state, data) {
      state.room.chasing_team = data.chasing_team;
      state.room.hiding_team = data.hiding_team;
    },
    addChasingTeam(state, username) {
      state.room.chasing_team.push(username);
    },
    addHidingTeam(state, username) {
      state.room.hiding_team.push(username);
    }
  }
})