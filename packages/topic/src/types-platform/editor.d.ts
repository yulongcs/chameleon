type PageInfoProps = {
  pageCategory: string
  pageId: string
  pageName: string
  projectId: string
  projectName: string
}
type PageDataProps = {
  extendTopic?: {
    projectOrigin?: string
    projectIcon?: string
  }
  pageInfo: PageInfoProps
  offlineTime?: number
  onlineTime?: number
  pc?: DeviceEnvProps
  mobile?: DeviceEnvProps
  other?: DeviceEnvProps
  lang: {
    test?: {
      defaultLang: string
      selectLangs: Array<string>
    }
    prod?: {
      defaultLang: string
      selectLangs: Array<string>
    }
  }
}

type PageProps = {
  pageId: string
  content: PageDataProps
}

type DeviceDataProps = {
  domSnapshot?: string
  designSize?: {
    width: number
    height?: number
  }
  sectionId: string
  data: Array<TreeNodeProps>
  empModules: Array<TreeNodeRemoteModule>
  status: boolean
  openScale?: boolean
}
type DeviceEnvProps = {
  test: DeviceDataProps
  prod: DeviceDataProps
}

declare type EmpProjectConfig = {
  prod: string
  test: string
  dev: string
  filename: string
  filefullpath: string
  name: string
  title: string
  remotes?: Record<string, string>
  exposes?: Record<string, string>
}

declare type DesizeSizeType = {
  width: number
  height?: number
}
