import Vue from 'vue'
import VueRouter from 'vue-router'
// import devLinePage from '@/views/devLinePage.vue'
// import rsLinePage from '@/views/rsLinePage.vue'
// import devBarAndPiePage from '@/views/devBarAndPiePage.vue'
// import rsBarPage from '@/views/rsBarPage.vue'
import ScreenPage from '@/views/ScreenPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/screen' },
  { path: '/screen', component: ScreenPage },
  // { path: '/devLinePage', component: devLinePage },
  // { path: '/rsLinePage', component: rsLinePage },
  // { path: '/devBarAndPiePage', component: devBarAndPiePage },
  // { path: '/rsBarPage', component: rsBarPage },
]

const router = new VueRouter({
  routes,
})

export default router
