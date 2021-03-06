import Vue from 'vue'
import VueRouter from 'vue-router'
// import devLinePage from '@/views/demoPage/noticeboard/devLinePage.vue'
// import rsLinePage from '@/views/demoPage/noticeboard/rsLinePage.vue'
// import devBarAndPiePage from '@/views/demoPage/noticeboard/devBarAndPiePage.vue'
// import rsBarPage from '@/views/demoPage/noticeboard/rsBarPage.vue'
import diskIOPage from '@/views/demoPage/StorageReport/diskIOPage.vue'
import SwitchInterfaceUtilizationPage from '@/views/demoPage/StorageReport/SwitchInterfaceUtilizationPage.vue'
import FaultDistributionPage from '@/views/demoPage/StorageReport/FaultDistributionPage.vue'
import weeklyReportPage from '@/views/demoPage/weeklyReport/weeklyReportPage.vue'
import ScreenPage from '@/views/ScreenPage.vue'
import DataEntryPage from '@/views/dataEntry/DataEntryPage.vue'
import wrDataEntryPage from '@/views/dataEntry/WeeklyReportDataEntryPage.vue'
import editorPage from '@/views/editorPage/editorPage.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/editorPage' },
  // { path: '/screen', component: ScreenPage },
  // { path: '/devLinePage', component: devLinePage },
  // { path: '/rsLinePage', component: rsLinePage },
  // { path: '/devBarAndPiePage', component: devBarAndPiePage },
  // { path: '/rsBarPage', component: rsBarPage },
  // { path: '/dataEntry', component: DataEntryPage },
  // { path: '/diskIOPage', component: diskIOPage },
  // { path: '/SIUPage', component: SwitchInterfaceUtilizationPage },
  // { path: '/fdPage', component: FaultDistributionPage },
  // { path: '/wrPage', component: weeklyReportPage },
  // { path: '/wrDataEntry', component: wrDataEntryPage },
  {
    path: '/editorPage',
    component: editorPage,
    children: [
      { path: '/diskIOPage', component: diskIOPage },
      { path: '/SIUPage', component: SwitchInterfaceUtilizationPage },
      { path: '/fdPage', component: FaultDistributionPage },
      { path: '/screen', component: ScreenPage },
      { path: '/wrPage', component: weeklyReportPage },
      { path: '/dataEntry', component: DataEntryPage },
      { path: '/wrDataEntry', component: wrDataEntryPage },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
