import axios, {AxiosResponse} from 'axios'
import config from './configs'
import {message} from 'antd'

const msgError = message.error
const fetch = axios.create({
  baseURL: config.mlApiBaseUrl,
  withCredentials: true,
})
const fetch1 = axios.create({
  baseURL: config.publicHost,
})
fetch.interceptors.response.use((axiosRes: AxiosResponse) => {
  return axiosRes.data
})

export {fetch, fetch1}
