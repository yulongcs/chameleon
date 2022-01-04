import config from 'src/configs'
import http from 'src/helpers/http'
export type AdminI18nResp = {
  allLangs: Array<string>
  list: Array<{
    createTime: 1615192166121
    id: string
    kvs: Record<string, string>
    lang: string
    lastEditor: string
    moduleId: string
    projectId: string
    updateTime: number
    version: number
  }>
} & any

/**
 *获取翻译语言包列表
 *
 * @export
 * @param {string} moduleId
 * @return {*}
 */
export async function getI18nAdminList(moduleId: string): Promise<ApiRes<AdminI18nResp>> {
  if (!moduleId) {
    console.error('moduleId is not defined', moduleId)
    return {code: 1, msg: 'moduleid is empty', data: null}
  }
  const url = `${config.adminHost}/admin/mlconfigBig?moduleId=${moduleId}&page=0&size=80`
  const resp: any = await http.get(url)
  console.log('多语言返回', moduleId, url)
  console.log('resp', resp)
  return resp
}

/*
 * 更新多语言
 * payload 参数列表：
 * langId string 语言包id
 * kvs string 语言包json数据
 * */
export async function updateI18n(payload: JSONObject): Promise<any> {
  const {langId, kvs} = payload
  const url = `${config.adminHost}/admin/mlconfigBig/${langId}`
  console.log(`updateI18n`, url)
  const res = await http.put(url, {
    kvs,
  })
  return res
}

type UpdateI18nLangProps = {
  lang: string
  kvs: JSONObject
  moduleId: string
}
/*
 * 更新多语言
 * payload 参数列表：
 * langId string 语言包id
 * kvs string 语言包json数据
 * */
export async function updateI18nByModuleIdAndLang(payload: UpdateI18nLangProps): Promise<any> {
  const url = `${config.adminHost}/admin/mlconfigBig`
  console.log(`updateI18n`, url)
  const res = await http.post(url, payload)
  return res
}

type CreateBatchPramas = {
  projectId: string
  pageId: string
  key: string
  value: Record<string, any>
}

export const createBatch = (params: Array<CreateBatchPramas>) => {
  return http.post(config.adminHost + '/admin/topicPageSection/batch', {list: params})
}

export const create = (params: CreateBatchPramas) => {
  const result = http.post(config.adminHost + '/admin/topicPageSection', params)
  console.log('result', result)
  return result
}

export const update = (id: string, value: Record<string, any>) => {
  const result = http.put(config.adminHost + '/admin/topicPageSection/' + id, {value})
  console.log('result', result)
  return result
}

export const get = (id: string) => {
  const result = http.get(config.adminHost + '/admin/topicPageSection/' + id)
  return result
}

export const getPublic = (pageId: string, key: string) => {
  const result = http.get(config.publicHost + '/topicPage/getSection/' + pageId + '/' + key, {
    withCredentials: false,
  })
  return result
}

export const getPublicBySectionId = (sectionId: string) => {
  const result = http.get(config.publicHost + '/topicPage/getSectionById/' + sectionId, {
    withCredentials: false,
  })
  return result
}
