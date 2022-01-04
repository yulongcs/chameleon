import config from 'src/configs'
import fetch from './fetch'

export const SectionMap = {
  PcProd: 'pc_prod_zh',
  PcTest: 'pc_test_zh',
  MobileProd: 'mobile_prod_zh',
  MobileTest: 'mobile_test_zh',
  OtherProd: 'other_prod_zh',
  OtherTest: 'other_test_zh',
}

export interface SectionResp {
  list: Array<SectionRespInfo>
}

export type SectionReqInfo = {
  projectId: string
  pageId: string
  key: string
  value: Record<string, any>
}

export type SectionRespInfo = {
  createTime: number
  creator: string
  key: string
  lastEditor: string
  pageId: string
  projectId: string
  sectionId: string
  uid: number
  updateTime: number
  value: Record<string, any>
}

export const createProjectDefaultSectionKvs: (projectId: string, pageId: string) => Promise<Array<SectionRespInfo>> =
  async (projectId: string, pageId: string) => {
    const result = createBatchSectionValue(projectId, pageId, [
      SectionMap.PcTest,
      SectionMap.PcProd,
      SectionMap.MobileTest,
      SectionMap.MobileProd,
      SectionMap.OtherTest,
      SectionMap.OtherProd,
    ])
    const resp: any = await createBatchSection(result)
    if (resp.list) {
      return resp.list
    }
    return []
  }

export const createBatchSectionValue = (projectId: string, pageId: string, keys: Array<string>) => {
  const result = keys.map((key: string) => {
    return {projectId, pageId, key, value: {}}
  })
  return result
}

export const createBatchSection = (params: Array<SectionReqInfo>) => {
  return fetch.post(config.mlApiBaseUrl + '/admin/topicPageSection/batch', {list: params})
}

export const createSection = (params: SectionReqInfo) => {
  return fetch.post(config.mlApiBaseUrl + '/admin/topicPageSection', params)
}

export const updateSection = (id: string, value: Record<string, any>) => {
  fetch.put(config.mlApiBaseUrl + '/admin/topicPageSection' + id, {value})
}

export const getSectionById = (id: string) => {
  fetch.get(config.mlApiBaseUrl + '/admin/topicPageSection' + id)
}

export const getSectionList: (projectId: string, pageId: string) => Promise<any> = async (
  projectId: string,
  pageId: string,
) => {
  return await fetch.get(
    config.mlApiBaseUrl + '/admin/topicPageSection?' + `projectId=${projectId}&pageId=${pageId}&page=0&size=1000`,
  )
}
