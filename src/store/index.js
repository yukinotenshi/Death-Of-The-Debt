import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from './../config.json'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: '',
      id: '',
      username: '',
    },
    room: {
      chasing_team: [],
      hiding_team: [],
      is_owner: '',
      room_id: '',
    },
    baseUrl: config.baseUrl,
  },
  plugins: [createPersistedState()],
  getters: {
    getIdByName(state, name) {
      return state.profiles[name];
    }
  },
  mutations: {
    setUser(state, data) {
      state.user.token = data.access_token;
      state.user.id = data.id;
      state.user.username = data.username;
    },
    setRoom(state, data) {
      state.room.room_id = data.room_id;
      state.room.is_owner = data.is_owner;
    },
    addChasingTeam(state, username) {
      state.room.chasing_team.push(username);
    },
    addHidingTeam(state, username) {
      state.room.hiding_team.push(username);
    }
  }
})