import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from './pages/mainpage.vue'
import AppInfo from './pages/infopage.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:[
      {path: '/', name: 'Home', component: AppHome},
      {path: '/info', name: 'Info', component: AppInfo}
    ]
})