declare type TreeNodeRemoteModule = {
  rmn: string
  rmp: string
  title?: string
  v?: string
  unpkgUrlMap?: Record<string, string>
}
// TODO: 不存放protoTypes数据，本地读取mf的数据
declare type TreeNodePropsInEdit = {
  id: string
} & TreeNodeProps &
  EmpFC['empPropTypes']

declare type TreeNodeProps = {
  id: string
  // 页面使用slot时，首次需要主动触发修改id,data-slot="id"
  // slots?: Array<TreeNodeProps>
  rm: TreeNodeRemoteModule
  // name?: string
  // TOOD: 兼容上个版本的字段
  alias?: string
  /** @deprecated style属性 */
  style?: React.CSSProperties
  chs?: Array<TreeNodeProps>
}
