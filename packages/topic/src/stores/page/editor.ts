// import {empCreateClassStore, makeAutoObservable} from '@efox/emp-single-mobx6'
import {empCreateClassStore, makeAutoObservable} from 'src/stores/empmobx'
import {getPageById, refreshCdn, updatePageData} from './api'
import {EnumDevice} from '../../types/type'
import userStore from '../user'
import pageStore from 'src/stores/page/index'
import config from 'src/configs'
import langStore from './lang'
import {IFrameForPreview} from 'src/pages/app/editor'
import {message} from 'antd'

const getScopeList = (list: Array<TreeNodeProps>, tmpList: Array<string> = []) => {
  list.map((item: TreeNodeProps) => {
    if (tmpList.indexOf(item.rm?.rmn) === -1) {
      tmpList.push(item.rm?.rmn)
    }
    item.chs && getScopeList(item.chs, tmpList)
  })
  return tmpList
}
class EditorStore {
  get parentNode() {
    return pageStore.renderData?.data[0]
  }

  get chsList() {
    return pageStore.renderData?.data[0]?.chs || []
  }

  constructor() {
    makeAutoObservable(this)
  }
  // TODO 需要优化
  removeTreeNodeRemotes(remotes: DeviceDataProps['empModules']) {
    const tmpEmpModules = [...pageStore.renderData.empModules]
    // 删除empModules
    for (const index in tmpEmpModules) {
      if (remotes.includes(tmpEmpModules[index])) delete tmpEmpModules[index]
    }
    pageStore.renderData.empModules = [...tmpEmpModules]
  }

  addTreeNodeRemotes(treeNode: TreeNodePropsInEdit) {
    const remotesObj = JSON.parse(JSON.stringify(treeNode.rm))
    // 添加empModules，用于页面加载
    let tmpEmpModules: Array<string | TreeNodeRemoteModule> = [...pageStore.renderData.empModules]
    tmpEmpModules.push(remotesObj)
    tmpEmpModules = tmpEmpModules.filter((item: any) => typeof item !== 'string')
    const scopeList = getScopeList(pageStore.renderData.data?.[0]?.chs || [])
    console.log('树级内容', JSON.stringify(scopeList, null, 2), JSON.stringify(tmpEmpModules, null, 2))
    const filterEmpModules: any = {}
    tmpEmpModules.map((item: string | TreeNodeRemoteModule) => {
      if (Object.prototype.toString.call(item).slice(8, -1) === 'String') {
        return false
      }
      const scope = (item as TreeNodeRemoteModule)?.rmn
      if (scopeList.indexOf(scope) !== -1 && !filterEmpModules[scope]) {
        filterEmpModules[scope] = item
      }
    })
    this.updateEmpModules(Object.values(filterEmpModules))
  }

  getScalcByDevice = () => {
    let calc = 1
    if (pageStore.device === EnumDevice.mobile) {
      calc = (2 * (pageStore.renderData.designSize?.width || 750)) / 750
    }
    if (pageStore.device === EnumDevice.other) {
      calc = Number(pageStore.renderData.designSize?.width || 375) / 375
    }
    return calc
  }

  async updateDomHeight() {
    const body = window.frames[IFrameForPreview].document.body
    const domList: any = body.querySelectorAll('[id^=App]')
    const langKvs = JSON.parse(JSON.stringify(langStore.langKvs))
    Object.keys(langKvs).map(item => {
      delete langKvs?.[item]?.empSnapshotStyle
    })
    // 处理样式兼容
    const calc = this.getScalcByDevice()
    // 处理样式兼容
    ;[].concat(...domList).map((item: any) => {
      const value = {
        ...(langKvs[item.id] || {}),
        empSnapshotStyle: {
          height: Number(item.clientHeight) * calc,
        },
      }
      if (item.id === 'App') {
        delete value.empSnapshotStyle
      }
      langKvs[item.id] = value
    })
    langStore.updateLangKvsWithObject(langKvs)
  }

  updateEmpModules(empModules: Array<TreeNodeRemoteModule>) {
    pageStore.renderData.empModules = JSON.parse(JSON.stringify(empModules))
  }

  updateDesignSize(desizeSize: DesizeSizeType) {
    pageStore.renderData.designSize = JSON.parse(JSON.stringify(desizeSize))
  }

  updateExtendTopic(extendTopic: any) {
    pageStore.pageContent.extendTopic = extendTopic || {}
  }

  updateEngineVersion(engineVersion: any) {
    pageStore.pageContent.engineVersion = engineVersion || {}
    delete pageStore.pageContent.engineV
    delete pageStore.pageContent.engineVe
  }

  updateCssOpenTransformScale(type: EnumDevice, status: boolean) {
    const device = pageStore.pageContent[type]
    if (!device) {
      return
    }
    device &&
      (() => {
        device.test.openScale = status
        // device.prod.openScale = status
      })()
    pageStore.pageContent[type] = device
  }

  updateDeviceStatus(type: EnumDevice, status: boolean) {
    const device = pageStore.pageContent[type]
    if (!device) {
      return
    }
    device &&
      (() => {
        device.test.status = status
        device.prod.status = status
      })()
    pageStore.pageContent[type] = device
  }

  async updatePageContentById() {
    if (!userStore.hasAuth) {
      console.error('没有权限')
      return {
        msg: '没有权限',
      }
    }
    console.log('当前保存的类型', pageStore.device)
    delete pageStore.renderData.domSnapshot
    const tmpPageContent = JSON.parse(JSON.stringify(pageStore.pageContent))
    pageStore.pageContent = {
      ...tmpPageContent,
      [pageStore.device]: {
        ...tmpPageContent[pageStore.device],
        [pageStore.contentEnv]: pageStore.renderData,
      },
    }
    if (!pageStore.pageContent.extendTopic && window.__extendTopic) {
      pageStore.pageContent.extendTopic = window.__extendTopic
    }
    if (!pageStore.pageContent.v) {
      pageStore.pageContent.v = 1
    } else {
      pageStore.pageContent.v++
    }
    const result: ApiRes<any> = await updatePageData(pageStore.id, pageStore.pageContent)
    console.info('page result', result)
    this.refreshApi()
    return result
  }

  async publish() {
    const pageContent = JSON.parse(JSON.stringify(pageStore.pageContent))
    const destDevice: DeviceEnvProps = pageContent[pageStore.device]
    const sectionId = destDevice.prod.sectionId
    destDevice.prod = {
      ...JSON.parse(JSON.stringify(destDevice.test)),
      sectionId,
    }
    const result = await updatePageData(pageStore.id, pageContent)
    if (result.code === 0) {
      pageStore.updatePageContent(result.data.content)
    }
    this.refreshApi()
    return result
  }
  async savePage(pageId: string, v: string) {
    const getPageInfo = async (pageId: string) => {
      const pageInfo = await getPageById(`${pageId}?t=${Date.now()}`)
      if (pageInfo.code === 0) {
        return pageInfo.data
      } else {
        message.error(pageInfo.msg)
      }
      return null
    }
    const pageInfo = await getPageInfo(pageId)
    if (!pageInfo) {
      return
    }
    const curV = pageInfo.content.v
    if (curV === v) {
      await editorStore.updateDomHeight()
      const result: any = await editorStore.updatePageContentById()
      if (result.code === 0) {
        await langStore.save()
      }
    } else {
      message.error('保存失败，请刷新页面重试')
    }
  }
  refreshApi() {
    const pageId = pageStore.id
    if (config.env === 'prod') {
      refreshCdn([
        `https://multi-lang.yy.com/topicPage/${pageId}`,
        `https://multi-lang.yy.com/topicPage/getSection/${pageId}/pc_test_zh`,
        `https://multi-lang.yy.com/topicPage/getSection/${pageId}/other_test_zh`,
        `https://multi-lang.yy.com/topicPage/getSection/${pageId}/mobile_test_zh`,
        `https://multi-lang.yy.com/topicPage/getSection/${pageId}/pc_prod_zh`,
        `https://multi-lang.yy.com/topicPage/getSection/${pageId}/other_prod_zh`,
        `https://multi-lang.yy.com/topicPage/getSection/${pageId}/mobile_prod_zh`,
      ])
    }
  }
}
const editorStore = empCreateClassStore<EditorStore>(EditorStore)
export default editorStore
