import fetch from 'src/api/fetch'
import axios from 'axios'
import config from 'src/configs'
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
const getProjectInfo = async () => {
  const result: any = await axios.get('https://unpkg.yy.com/@webbase/chameleonbasic@1.0.1/dist/basic_share_emp.js')
  return result
}
const getActivityInfo = async (projectId: string) => {
  const result: any = await fetch.get(`admin/topicPage?page=0&size=20&projectId=${projectId}`)
  return result
}
export {getProjectInfo, getActivityInfo}
