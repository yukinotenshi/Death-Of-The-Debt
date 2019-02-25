import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAofIDQCXU2kPC-QNEcHtm82sPxQdyaDk8'
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
