import router from '@/router/index'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('admin-token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code == '10119') {
      localStorage.removeItem('admin-token')
      router.push('/login')
      ElMessage.error('登录过期')
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default http
