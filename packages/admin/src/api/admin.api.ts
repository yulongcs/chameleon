import fetch from 'src/api/fetch'
import {fetch1} from 'src/api/fetch'
import {SectionRespInfo} from './lang.api'
import userStore from 'src/stores/user'
const whiteList = ['dw_yangshangzhi']
export interface Authorizer {
  uid: number
  name: string
  passport: string
}

export interface UpdateProjectParams {
  name: string
  alias: string
  desc: string
  languages: string[]
  authorizers: string
  authorizers4Show: Authorizer[]
  lastEditor?: string
  extendTopic: {
    projectIcon: string
    projectOrigin: string
    v?: number
  }
  projType: string
  extend?: Record<string, any> // 扩展字段
}

export interface ProjectInfo extends UpdateProjectParams {
  id: string
  name: string
  creator: string
  createTime: number
  updateTime: number
}

/**
 * 查询项目列表
 * @param page
 * @param size
 */
export function getProject(page: number, size: number, projType?: string): Promise<PageableData<ProjectInfo>> {
  const hasAuthority = whiteList.some((item: string) => {
    if (item === userStore.userInfo?.passport) {
      return true
    }
  })
  return fetch.get('/admin/mlproject', {
    params: {
      page,
      size,
      // projType: hasAuthority ? '' : projType,
    },
  })
}

/**
 * 更新项目设置
 * @param id
 * @param data
 */
export function updateProject(id: string, data: UpdateProjectParams) {
  return fetch.patch('/admin/mlproject/' + id, data)
}

/**
 * 添加项目
 * @param params
 */
export function addProject(params: UpdateProjectParams) {
  return fetch.post('/admin/mlproject', params)
}

/**
 * 获取所有的语言
 * 数据结构 {af: "公用荷兰语", ar: "阿拉伯语", ...}
 */
export function getLanguages(): Promise<Record<string, string>> {
  return fetch.get('/admin/mlproject/listLanguages')
}

export interface AddTopicPageParams {
  projectId: string
  content: PageDataProps
}
export interface TopicPageResp {
  pageId: string
  content: PageDataProps
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface TopicInfo extends PageDataProps {
  pageName: string
  pageData: any
  editor: Array<{name: string; uid: string}>
}

export interface TopicPage {
  index: number
  content: TopicInfo
  createTime: number
  creator: string
  lastEditor: string
  pageId: string
  projectId: string
  shortKeys: any[]
  uid: number
  updateTime: number
}

export interface GetTopicPageParams extends AdminPageParams {
  projectId: string
  queryJson?: string
}

/**
 * 获取专题列表
 * @param params
 */
export function getTopicPage(params: GetTopicPageParams): Promise<PageableData<TopicPage>> {
  return fetch.get('/admin/topicPage', {
    params,
  })
}

/**
 * 添加专题
 * @param data
 */
export async function addTopicPage(data: AddTopicPageParams & any): Promise<any> {
  const content = {
    pc: {
      test: {
        empModules: [],
        sectionId: '',
        data: [{id: 'App', rm: {rmn: 'chameleon_share_emp', rmp: './EMPAppContainer', v: '1_0'}}],
        status: true,
        designSize: {
          width: 1000,
        },
      },
      prod: {
        empModules: [],
        sectionId: '',
        data: [{id: 'App', rm: {rmn: 'chameleon_share_emp', rmp: './EMPAppContainer', v: '1_0'}}],
        status: true,
        designSize: {
          width: 1000,
        },
      },
    },
    mobile: {
      test: {
        empModules: [],
        sectionId: '',
        data: [{id: 'App', rm: {rmn: 'chameleon_share_emp', rmp: './EMPAppContainer', v: '1_0'}}],
        status: true,
        designSize: {
          width: 750,
        },
      },
      prod: {
        empModules: [],
        sectionId: '',
        data: [{id: 'App', rm: {rmn: 'chameleon_share_emp', rmp: './EMPAppContainer', v: '1_0'}}],
        status: true,
        designSize: {
          width: 750,
        },
      },
    },
    other: {
      test: {
        empModules: [],
        sectionId: '',
        data: [{id: 'App', rm: {rmn: 'chameleon_share_emp', rmp: './EMPAppContainer', v: '1_0'}}],
        status: true,
        designSize: {
          width: 200,
          height: 280,
        },
      },
      prod: {
        empModules: [],
        sectionId: '',
        data: [{id: 'App', rm: {rmn: 'chameleon_share_emp', rmp: './EMPAppContainer', v: '1_0'}}],
        status: true,
        designSize: {
          width: 200,
          height: 280,
        },
      },
    },
    lang: {
      test: {
        defaultLang: 'zh',
        selectLangs: ['zh'],
      },
      prod: {
        defaultLang: 'zh',
        selectLangs: ['zh'],
      },
    },
  }
  data.content = {...content, ...data.content}
  return fetch.post('/admin/topicPage', data)
}

export const mergePageContentAndSectionData = (content: PageDataProps, sectionList: Array<SectionRespInfo>) => {
  for (let index = 0; index < sectionList.length; index++) {
    const section: SectionRespInfo = sectionList[index]
    const [device, env, lang] = section.key.split('_')
    ;(content as any)[device][env].sectionId = section.sectionId
  }
  return content
}

/**
 * 更新专题
 * @param id
 * @param data
 */
export function updateTopicPage(id: string, data: {content: TopicInfo}) {
  return fetch.put(`/admin/topicPage/${id}`, data)
}

/**
 * 删除专题
 * @param pageId
 */
export function deleteTopicPage(pageId: string) {
  return fetch.delete(`/admin/topicPage/${pageId}`)
}

/**
 * @param pageId
 */
export function getPageInfo(pageId: string) {
  return fetch1.get(`/topicPage/${pageId}`)
}
