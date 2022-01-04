import axios from 'axios'
import fetch from 'src/api/fetch'
import config from 'src/configs'

export interface PosterUser {
  concat: string
  first_name: string
  is_active: boolean
  username: string
}

// 查找用户信息
export function posterUser(key: string): Promise<PosterUser[]> {
  return axios.get('https://cix.yy.com/porter/user/' + key).then(res => res.data)
}

export interface YYUser {
  imid: string
  passport: string
  uid: string
  nick: string
  jifen: string
  sign: string
  intro: string
  nickExt: string
}

// result 0 未找到，1 找到用户信息
export interface YYUserRes {
  result: 1 | 0
  info: YYUser | string
}

// 查询用户详细信息
export function getYYUser(dwName: string): Promise<YYUserRes> {
  return fetch.get(config.mlApiBaseUrl + '/admin/yyuser/queryUserinfo/' + dwName)
}
