import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import AppHome from '@/pages/mainpage.vue'
import AppInfo from '@/pages/infopage.vue'
import AppSignup from '@/pages/signup.vue'
import AppLogin from '@/pages/login.vue'
import AppDashboard from '@/pages/dashboard.vue'
import AppDashboardSimple from "@/pages/dashboardsimple.vue"
import ItemDetail from '@/pages/itemdetail.vue'
import Search from '@/pages/search.vue'
import Upload from '@/pages/upload.vue'
import PageNotFound from '@/pages/404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:[
      // {path: '/', name: 'Home', component: AppHome},
      // {path: '/info', name: 'Info', component: AppInfo},
      // {path: '/signup', name: 'SignUp', component: AppSignup},
      // {path: '/login', name: 'Login', component: AppLogin},
      // {path: '/upload', name: 'Upload', component: Upload},
      // {path: '/dashboard', name: 'Dashboard', component: AppDashboard, meta:{requiresAuth: true}},
      // {path: '/items/:itemid/name/:itemname', name: 'Item', component: ItemDetail},
      // {path: '/dashboard/:otheruserid/name/:othername', name: 'Others Dashboard', component: AppDashboardSimple},
      // {path: '/search/:keywords', name: 'Search', component: Search},
      {path: '*', name: '404', component: PageNotFound}
    ]
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if(requiresAuth && !currentUser)
  {
    next(false)
  } else if(requiresAuth && currentUser)
  {
    next()
  }
  else
  {
    next()
  }
})

export default router