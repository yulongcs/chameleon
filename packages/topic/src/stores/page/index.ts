import {empCreateClassStore, makeAutoObservable} from 'src/stores/empmobx'
import {getPageById} from './api'
import {EnumDevice, EnumPageEnv} from '../../types/type'
import langStore from './lang'
import {queryParamsByKey} from 'src/helpers/urlUtil'
import {DefaultDesizeSize} from 'src/engineModule/utils/flexibleHelper'

const fixDesignSize = (renderData: any, device: EnumDevice) => {
  // 兼容旧的designSize
  renderData.designSize = renderData.designSize || DefaultDesizeSize(device)
}
class PageStore {
  id = ''
  edit = false
  device = EnumDevice.empty
  contentEnv = EnumPageEnv.empty
  lang: any = {
    defaultLang: '',
    selectLangs: [],
  }
  renderData: DeviceDataProps = {
    sectionId: '',
    data: [{id: '', rm: {rmn: '', rmp: ''}}],
    empModules: [],
    status: false,
  }
  pageContent: PageDataProps & any = {
    pageInfo: {
      pageCategory: '',
      pageId: '',
      pageName: '',
      projectId: '',
      projectName: '',
    },
    lang: {
      test: {
        defaultLang: '',
        selectLangs: [],
      },
      prod: {
        defaultLang: '',
        selectLangs: [],
      },
    },
  }

  constructor() {
    makeAutoObservable(this)
    const defaultDevice = queryParamsByKey('device')
    if (defaultDevice) {
      this.setDevice(defaultDevice)
    }
  }

  setPageId(id: string) {
    this.id = id
  }
  setContentEnv(env: EnumPageEnv) {
    this.contentEnv = !env || env === EnumPageEnv.prod ? EnumPageEnv.prod : EnumPageEnv.test
  }
  setEdit(edit: boolean) {
    this.edit = edit
  }
  setDevice(device: EnumDevice) {
    this.device = device
  }
  renderApp = () => {}

  async getPageContentById(id: string, queryDevice: EnumDevice, userAgentDevice: EnumDevice) {
    let res = null
    try {
      const sessionData = sessionStorage.getItem(id)
      res = sessionData ? JSON.parse(sessionData) : null
    } catch (e) {}
    const result: ApiRes<PageProps> = res || (await getPageById(id))
    if (result.code === 0) {
      this.updatePageContent(result.data.content)
      this.setRenderDataByDevice(queryDevice, userAgentDevice)
    }
    return result
  }

  updatePageContent(content: PageDataProps) {
    this.pageContent = content
  }

  setRenderDataByDevice(queryDevice: EnumDevice = this.device, userAgentDevice?: EnumDevice) {
    const env = this.contentEnv
    if (queryDevice) {
      const deviceData: DeviceEnvProps & any = this.pageContent[queryDevice] || {}
      const result = deviceData[env]

      // 设备不为空
      if (result && result?.status) {
        this.renderData = result
        // 兼容旧的designSize
        fixDesignSize(this.renderData, queryDevice)
        this.lang = this.pageContent.lang[env]
        this.device = queryDevice
        return
      }
    }

    if (userAgentDevice) {
      const deviceData: DeviceEnvProps & any = this.pageContent[userAgentDevice] || {}
      const result = deviceData[env]

      // 设备不为空
      if (result && result?.status) {
        this.renderData = result
        // 兼容旧的designSize
        fixDesignSize(this.renderData, userAgentDevice)
        this.lang = this.pageContent.lang[env]
        this.device = userAgentDevice
        return
      }
    }

    if (this.pageContent.pc && this.pageContent.pc[env] && this.pageContent.pc[env].status) {
      this.renderData = this.pageContent.pc[env]
      // 兼容旧的designSize
      fixDesignSize(this.renderData, EnumDevice.pc)
      this.lang = this.pageContent.lang[env]
      this.device = EnumDevice.pc
      return
    }

    if (this.pageContent.mobile && this.pageContent.mobile[env] && this.pageContent.mobile[env].status) {
      this.renderData = this.pageContent.mobile[env]
      // 兼容旧的designSize
      fixDesignSize(this.renderData, EnumDevice.mobile)
      this.lang = this.pageContent.lang[env]
      this.device = EnumDevice.mobile
      return
    }

    if (this.pageContent.other && this.pageContent.other[env] && this.pageContent.other[env].status) {
      this.renderData = this.pageContent.other[env]
      // 兼容旧的designSize
      fixDesignSize(this.renderData, EnumDevice.other)
      this.lang = this.pageContent.lang[env]
      this.device = EnumDevice.other
      return
    }
  }
  async getRemoteLanguage() {
    // 页面
    await langStore.getPublicLang(this.id, this.pageContent, this.contentEnv, this.device)
  }
  async setContent(id: string, pageContent: any, content: any, env: any, device: string, edit: boolean) {
    this.setEdit(edit)
    this.setPageId(id)
    this.pageContent = pageContent
    this.renderData = this.pageContent[device][env]
    this.setContentEnv(env)
    this.setDevice(device === 'pc' ? EnumDevice.pc : device === 'mobile' ? EnumDevice.mobile : EnumDevice.other)
    this.lang = 'zh'
  }
}
const pageStore = empCreateClassStore<PageStore>(PageStore)
export default pageStore
