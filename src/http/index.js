import axios from "axios"
import { ElMessageBox, Message } from "element-ui"
import qs from "qs"
import { getToken } from "@/utils/auth"
import { removeToken } from "@/utils/auth"
import store from "@/store"

const service = axios.create({
  // URL地址 环境变量文件 这样的方式需要后端服务器允许跨域访问
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: '/', // 本地反向代理，缺点是在chrome中无法看到请求的完整链接
  timeout: 5000, // 默认
  withCredentials: true
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const { url, method } = config
    if (method === "get") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded"
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" })
      }
    }
    // 如果是login页面
    if (/\/login$/.test(url)) {
    } else if (getToken) {
      config.headers["Authorization"] = "Bearer " + getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      let responseData = response.data
      Message({
        message: responseData.message || responseData.error,
        type: "error"
      })
      return Promise.reject(response)
    }
  },
  (error) => {
    let response = error.response
    console.log(response)
    if (response) {
      let responseData = response.data
      let errorMessage = responseData.message
        ? responseData.message
        : responseData.error
      Message({
          message: errorMessage,
          type: 'error'
      })  
      if (response.sttaus === 401) {
        removeToken()
        store.dispatch("user/resetToken").then(() => {
          location.reload()
        })
      }
    }
  }
)
export default service
