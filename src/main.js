import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
