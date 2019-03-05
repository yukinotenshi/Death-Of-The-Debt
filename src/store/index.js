import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from './../config.json'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: '',
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
    setUserToken(state, data) {
      state.user.token = data;
    }
  }
})