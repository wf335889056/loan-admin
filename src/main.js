// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import $ from 'jquery'
import '@/style/index.less'
import { dev, baseUrl } from '@/utils/fetch'
import 'babel-polyfill'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$uploadUrl = dev? '/api/deskManagementController/uploadFile' : '/deskManagementController/uploadFile'

Vue.use(iView, {
  transfer: true,
  size: 'small'
})

iView.Message.config({
  top: 100,
  duration: 3
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = window.sessionStorage.getItem('adminToken')
  if (to.path == '/appRegister' || to.path == '/appDownload' || to.path == '/appBlank' || to.path == '/login') {
    next()
  } else {
    if (!token) {
      store.dispatch('logoutByUser')
      next({ path: '/login' })
    } else {
      next()
    }
  }  
})

router.afterEach(route => {
  iView.Message.destroy()
  iView.Modal.remove()
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
