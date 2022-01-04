import {empCreateClassStore, makeAutoObservable} from 'src/stores/empmobx'
import config from 'src/configs'
import {EmpModuleConfigs} from './moduleconfigs'
import {loadScript} from 'src/engineModule/utils/scriptLoader'
import {loadModuleFactory, loadShareModule} from 'src/engineModule/utils/componentLoader'
const {ProjectConfig} = require('/empconfig/project-config.js')
const {version} = require('/package.json')

export enum PanelType {
  ADD_MODULE = 'ADD_MODULE',
  EDIT_PANEL = 'EDIT_PANEL',
}
class ShareModule {
  packageVersion: string = version
  moduleConfigMap: Record<string, TreeNodeRemoteModule> = EmpModuleConfigs()
  allCmpList: Partial<Record<TreeNodeRemoteModule['rmn'], TreeNodePropsInEdit[]>> = {}
  allCmpListFilterHidden: Partial<Record<TreeNodeRemoteModule['rmn'], TreeNodePropsInEdit[]>> = {}

  // 组件库面板是否打开
  panelList = {
    [PanelType.ADD_MODULE]: {
      isShow: false,
    },
    [PanelType.EDIT_PANEL]: {
      activeTab: '',
    },
  }

  constructor() {
    makeAutoObservable(this)
    this.updateProjectModule()
  }

  updateProjectModule = (
    projectConfig: EmpProjectConfig = ProjectConfig,
    configEnv: any = config.env,
    packageVersion = version,
  ) => {
    this.packageVersion = packageVersion || this.packageVersion
  }

  // name: 远端组件的mf-namespace
  loadModuleListByMfName(empShareItem: TreeNodeRemoteModule): Promise<any> {
    return new Promise(resolve => {
      //如果有url,会缓存
      loadScript([empShareItem], async () => {
        const tmpList: any = []
        const result = await loadShareModule(empShareItem.rmn)
        if (!result) {
          console.error('result fail')
          return
        }
        const keys = Object.keys(result?.moduleMap || {})
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const componentBlock = await loadModuleFactory(result, key)
          const moduleFactory = (componentBlock?.default || {}) as EmpFC
          const commponentName = moduleFactory?.empPropTypes?.name || ''
          const {props, mockDatas, ...rest} = moduleFactory?.empPropTypes || {}
          commponentName &&
            tmpList.push({
              ...rest,
              rm: {
                rmn: empShareItem.rmn,
                rmp: key,
                v: result.v,
                unpkgUrlMap: result.unpkgUrlMap,
              },
            })
        }
        this.updateAllCmpList(empShareItem.rmn, tmpList)
        resolve(JSON.parse(JSON.stringify(result)))
      })
    })
  }

  async getTreeNodePropsByRemote(rm: TreeNodeProps['rm']) {
    const {rmn, rmp} = {...rm}
    if (!this.allCmpList[rmn]) {
      await this.loadModuleListByMfName(rm)
    }

    return this.allCmpList[rmn]?.find(item => item.rm.rmp === rmp)
  }

  async updateAllCmpList(name: string, list: any) {
    this.allCmpList[name] = list
    this.updateAllCmpListFilterHidden(name, list)
  }

  async updateAllCmpListFilterHidden(name: string, list: any) {
    this.allCmpListFilterHidden[name] = list.filter((item: TreeNodePropsInEdit) => {
      return item.defined?.hidden !== true
    })
  }

  setPanelOpts(type: PanelType, options: any) {
    const opts = this.panelList[type]
    this.panelList[type] = {
      ...opts,
      ...options,
    }
  }

  setAddPanelShow(isShow: boolean) {
    this.setPanelOpts(PanelType.ADD_MODULE, {isShow})
  }
}

const shareModuleStore = empCreateClassStore<ShareModule>(ShareModule)
export default shareModuleStore
