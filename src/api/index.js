import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JsonBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 最大安全数据自定义转换
axios.defaults.transformResponse = [(data) => {
  try {
    return JsonBig.parse(data)
  } catch (e) {
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  const status = err.response.status
  if (status === 401) {
    store.delUser()
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
