type PrimitiveType = string | number | boolean | null | undefined | symbol | array
type EmpFC<T = any> = EmpFunctionComponent<T>

interface EmpPropTypesMockConfig {
  name: string
  value: any
  callback?: () => void
}
interface EmpPropTypesPropConfig {
  /**name 名称 */
  label: string // 名称
  description?: string
  type: EmpPropTypes
  value: P[K]
  priority?: number // 权重，数字越小
  // 透传antd组件的参数
  options?: Record<string, any>
  // 兼容旧字段
  defaultValue?: P[K]
  // 表单分组
  group?: string
  extendConfig?: {
    url: string // 扩展配置地址，exposes需要暴露出来 hidden需要为false，不在组件库中显示数据
    name?: string // 扩展配置名称
    width?: string | number
  }
}

interface EmpFunctionComponent<P = any> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
  empPropTypes?: {
    name: string // 组件名称
    components?: Array<{key: string; component: ReactElement}>
    mockDatas?: Array<EmpPropTypesMockConfig>
    defined?: {
      description?: string // 组件作用描述
      hidden?: boolean // 组件隐藏显示
      catagories?: Array<string> // 中文分类
      slots?: TreeNodeRemoteModule // 定义导航，该属性会影响节点更新的逻辑
      slotsTab?: boolean // 为true，是slot的子标签，即导航tab标签
      // TODO:变色龙7是否仍需要该字段？
      styleEditable?: boolean
      extendEditor?: React.ReactElement
    }
    props?: {
      [K in keyof P]?: EmpPropTypesPropConfig
    }
  }
}

declare type EmpFCPropsPrimitive = {
  empLangKvs?: Record<string, any>
  node?: TreeNodeProps
  children?: JSX.Element | Array<JSX.Element> | undifined | any
  mock?: boolean // 是否使用mock数据
  mockData?: any // 返回的mock数据
  device?: EnumDevice // 当前设备值 pc mobile other
  env?: EnumPlatformEnv // 编辑状态 test ,prod 区别生产或测试
  style?: React.CSSProperties
}

declare type EmpFCProps<T> = {
  [P in keyof T]: T[P] extends any ? EmpFCProps<T[P]> : T[P]
} &
  EmpFCPropsPrimitive

declare type ComponentGroups = {
  title: string
} & Record<string, any>

declare type UrlMap = {
  prod: string
  test: string
  dev: string
}

declare type EmpProjectConfig = {
  prod: string // 线上域名 eg: https://xxx.com
  test: string // 测试域名 eg: https://xxx.com/
  dev: string // 开发域名 eg: https://xxx.com:443
  filename: string // 文件名 eg: emp.js
  context: string // 业务侧上下文 eg: /topic/
  name: string // 名称，非必须，eg: topic
  title: string // 项目名，eg: ‘xxx专题平台’
  remotes?: Record<string, string> // module federation remotes
  exposes?: Record<string, string> // module federation exposes
  componentGroups?: Record<string, ComponentGroups> // exposes一级目录名作为key，进行组分类，{title: 组名}, eg: 目录名为：mobile/， componentGroups： {mobile: {title: '这里写分组名'}}
  unpkg?: boolean // 使用unpkg，默认false,
  unpkgUrlMap?: UrlMap // 组件地址
}

declare type EmpFCExtendConfig<T> = EmpFCProps<T> & {
  section: Record<string, any> // 返回已定义的props编辑中的值
  propItem: EmpEditPropTypes // 当前props定义的结构
  propKey: string // 当前key
  propValue: PrimitiveType // 当前值
  callback: (section: Record<string, any>, globalMap?: Record<string, any>) => void // object对象，按照section结构回调，增量修改; globalMap: key:value结构，会存储到外层
  onClose: () => void
}
interface EmpEditPropTypes extends EmpPropTypesPropConfig {
  aliasName?: any
  name: string
  index?: any
  id?: any
  configFormRef?: any
}
