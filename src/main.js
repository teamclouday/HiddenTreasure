import Vue from 'vue'
import router from './router'
import App from './pages/template.vue'
import {store} from './store'
const fb = require('./firebaseConfig')

Vue.config.productionTip = false
Vue.config.devtools = false

let app
fb.auth.onAuthStateChanged(() => {
  if(!app)
  {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created(){
        console.log('CIS454 Hidden Treasure Final Project (Group 4)')
        console.log('Thank you for visiting')
      }
    })
  }
})