import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})
/**
 * 请求拦截器
 */
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return new Promise(new Error(message))
  }
}, error => {
  // 处理 token 超时问题
  if (
    error.response &&
    error.response.data &&
    error.response.data.code === 401
  ) {
    store.dispatch('user/logout')
  }
  ElMessage.error(error.message)
  return new Promise(new Error(error))
})

export default service
