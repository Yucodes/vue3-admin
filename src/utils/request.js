import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return new Promise(new Error(message))
  }
}, error => {
  ElMessage.error(error.message)
  return new Promise(new Error(error))
})

export default service
