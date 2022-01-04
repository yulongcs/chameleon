import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import config from 'src/configs'
import {message} from 'antd'
import userStore from 'src/stores/user'
import {hideLoading, showLoading} from 'src/hooks/useModal'

const msgError = message.error

const fetch = axios.create({
  baseURL: config.mlApiBaseUrl,
  withCredentials: true,
})
export const fetch1 = axios.create({
  baseURL: config.publicHost,
})
fetch.interceptors.request.use((config: AxiosRequestConfig) => {
  showLoading()
  return config
})
fetch.interceptors.response.use(
  (axiosRes: AxiosResponse) => {
    hideLoading()
    if (axiosRes?.data?.code === 0) {
      return axiosRes.data.data
    } else {
      if (axiosRes?.data?.code === 401) {
        userStore.logout()
      } else {
        msgError(axiosRes.data.message || axiosRes.data.msg || '请求错误')
      }
      return Promise.reject(axiosRes)
    }
  },
  (axiosErr: AxiosError) => {
    hideLoading()
    msgError(axiosErr.message || '请求错误')
    return Promise.reject(axiosErr.response)
  },
)
fetch1.interceptors.response.use(
  (axiosRes: AxiosResponse) => {
    if (axiosRes?.data?.code === 0) {
      return axiosRes.data.data
    } else {
      if (axiosRes?.data?.code === 401) {
        userStore.logout()
      } else {
        msgError(axiosRes.data.message || axiosRes.data.msg || '请求错误')
      }
      return Promise.reject(axiosRes)
    }
  },
  (axiosErr: AxiosError) => {
    msgError(axiosErr.message || '请求错误')
    return Promise.reject(axiosErr.response)
  },
)

export default fetch
