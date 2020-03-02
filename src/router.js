import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHeadful from 'vue-headful'
import AppHome from './pages/mainpage.vue'
import AppInfo from './pages/infopage.vue'
import AppSignup from './pages/signup.vue'
import AppLogin from './pages/login.vue'

Vue.component('vue-headful', VueHeadful)
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:[
      {path: '/', name: 'Home', component: AppHome},
      {path: '/info', name: 'Info', component: AppInfo},
      {path: '/signup', name: 'SignUp', component: AppSignup},
      {path: '/login', name: 'Login', component: AppLogin}
    ]
})