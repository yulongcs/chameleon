import config from 'src/configs'
import {TopicPageResp} from './admin.api'
import fetch from './fetch'
import {message} from 'antd'
import {getSectionList, SectionReqInfo, SectionResp, SectionRespInfo} from './lang.api'

export const getPageById: (pageId: string) => Promise<any> = async (pageId: string) => {
  return await fetch.get(`${config.publicHost}/topicPage/${pageId}`, {
    withCredentials: false,
  })
}

export const updatePageDataInProdution: (pageId: string, content: any) => Promise<any> = async (
  pageId: string,
  content: any,
) => {
  const prodHost = 'https://ml-admin.yy.com'
  if (!pageId) {
    console.error('pageId is not defined', pageId)
    return
  }
  const url = `${prodHost}/admin/topicPage/${pageId}`
  console.log('updatePageData', content)
  return await fetch.put(url, {
    content,
  })
}

export const getPageByIdInProduction: (pageId: string) => Promise<any> = async (pageId: string) => {
  const prodHost = 'https://multi-lang.yy.com'
  return await fetch.get(`${prodHost}/topicPage/${pageId}`, {
    withCredentials: false,
  })
}

export const createBatchSectionInProduction = (params: Array<SectionReqInfo>) => {
  const prodHost = 'https://ml-admin.yy.com'
  return fetch.post(prodHost + '/admin/topicPageSection/batch', {list: params})
}
export async function sendTestDataToProd(projectId: string, pageId: string, prodPageId: string) {
  const promiseAll: any = await Promise.all([
    getPageByIdInProduction(prodPageId),
    getPageById(pageId),
    getSectionList(projectId, pageId),
  ]).catch(e => {
    return {
      code: 1,
      msg: e,
    }
  })
  console.error('promiseAll', promiseAll)

  if (promiseAll?.code === 1) {
    message.error('同步有误，请确认ID')
    return
  }

  const prodPageResult: TopicPageResp = promiseAll[0]
  const testPageResult: TopicPageResp = promiseAll[1]
  const testSectionResult: SectionResp = promiseAll[2]
  const pcSectionId = prodPageResult.content.pc?.test.sectionId
  ;(prodPageResult.content.pc as any).test = {
    ...testPageResult.content.pc?.test,
    sectionId: pcSectionId,
  }

  const mobileSectionId = prodPageResult.content.mobile?.test.sectionId
  ;(prodPageResult.content.mobile as any).test = {
    ...testPageResult.content.mobile?.test,
    sectionId: mobileSectionId,
  }

  const otherSectionId = prodPageResult.content.other?.test.sectionId
  ;(prodPageResult.content.other as any).test = {
    ...testPageResult.content.other?.test,
    sectionId: otherSectionId,
  }
  const sectionList: Array<SectionReqInfo> = []
  testSectionResult?.list.map((item: SectionRespInfo) => {
    if (
      [
        testPageResult.content.pc?.test.sectionId,
        testPageResult.content.mobile?.test.sectionId,
        testPageResult.content.other?.test.sectionId,
      ].includes(item.sectionId)
    ) {
      sectionList.push({
        projectId: prodPageResult.content.pageInfo.projectId,
        pageId: prodPageResult.pageId,
        key: item.key,
        value: item.value,
      })
    }
  })
  const result: any = await Promise.all([
    updatePageDataInProdution(prodPageId, prodPageResult.content),
    createBatchSectionInProduction(sectionList),
  ]).catch(e => {
    console.log('e', e)
    return {
      code: 1,
      msg: e,
    }
  })
  console.error('result', result)
  if (result?.code === 1) {
    message.error('局部同步失败，请重新操作！！！')
  } else {
    message.success('同步成功~，打开页面中~')
    setTimeout(() => {
      // window.open(`https://cweb.yy.com/topic/editor/#/editor/${prodPageId}`, '_blank')
      window.open(`https://cweb.yy.com/topic/editor/?pageId=${prodPageId}`, '_blank')
    }, 500)
  }
  if (result) return result
}
