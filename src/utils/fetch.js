import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import iView from 'iview'

export const dev = process.env.NODE_ENV === 'development'
export const baseUrl = 'http://www.xiaoyoujr.com:8091'

const service = axios.create({
  baseURL: dev? '/api' : baseUrl,
  timeout: 60000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    if (store.getters.token && store.getters.token != '') {
      config.headers['token'] = store.getters.token
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.state == 0) {
      iView.Message.error(res.info.message)
      return Promise.reject(res)
    }
    if (res.state == -1) {
      iView.Model.warning({
        title: '您的账号已在另一个位置登录',
        content: '如非本人操作, 请及时修改密码或联系管理员',
        onOk: () => {
          store.dispatch('logoutByUser')
          router.replace({ path: '/login' })
        }
      })
      return Promise.reject(res)
    }
    return res
  },
  error => {
    iView.Message.error('network error 500..., 技术员工正在修复中')
    return Promise.reject(error)
  }
)

export default service