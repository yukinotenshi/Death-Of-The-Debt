import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex);
Vue.use(VueCookie);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
