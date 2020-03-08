import Vue from 'vue'
import router from '@/router'
import App from '@/pages/template.vue'
import {store} from '@/store'
const fb = require('@/firebaseConfig')
import VueHeadful from 'vue-headful'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.component('vue-headful', VueHeadful)
Vue.use(VueTabs)

let app
fb.auth().onAuthStateChanged(() => {
  if(!app)
  {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})