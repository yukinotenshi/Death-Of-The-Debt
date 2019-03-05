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
    }
  }
})