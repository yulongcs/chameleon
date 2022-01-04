# 版本化配置平台
| 环境 | 入口 | 使用说明 |
| -- | -- | -- |
| 测试环境 | https://cweb-test.yy.com | 根据项目创建活动后跳转活动配置页 |
| 线上环境 | https://cweb.yy.com | 根据项目创建活动后跳转活动配置页 |

# 平台使用
**平台将以通过实验室方式来切换方式，满足正常使用及调试方式。**

## 调试
1 打开编辑页
测试环境：https://cweb-test.yy.com/topic/editor?pageId=610a47d20e3f2b2ad572557c
线上环境：https://cweb.yy.com/topic/editor?pageId=610a47d20e3f2b2ad572557c

2 打开右上角实验室，“请选择页面资源环境”选择“开发调试”

3 **页面资源加载**，在“版本选择”Tab栏对应的内容里，修改“开发地址”为当前项目运行的地址。
```
（参数为：remoteEnv）
```

4 **组件库列表资源加载**，在“组件列表版本”Tab栏对应的内容里，修改“开发地址”为当前项目运行的地址。

## 链接相关参数
| 参数 | 使用说明 | 默认值 | 值描述 |
| -- | -- | -- | -- |
| remoteEnv | 页面emp.js资源环境，默认按照平台环境加载 | prod或undefined,表示加载线上资源 <br> |  prod、undefined: 表示线上资源 <br>  test: 表示加载测试 <br>  dev: 表示加载开发地址 <br> 地址：相对概念，“实验室”版本管理进行混合。 <br> 提示：一个页面只会加载一种环境|
| mock | 组件参数，判断是否使用mock数据 <br> 可根据该参数在编辑时显示预览数据 | true:编辑时，预览页参数 <br> true: 编辑预览页中传递；false/undefined: 默认值，非预览。 <br> | |
| serverEnv | 平台数据加载环境，默认按照平台环境加载 | 根据当前域名编辑环境 <br>  | test: 表示平台测试环境 <br> prod: 表示平台线上环境 <br> prod: 表示平台线上环境 <br> |
| env | 组件参数，判断当前属于预览或线上 | prod或undefined，表示线上 |  prod: 表示发布状态 <br> test: 表示预览状态 <br> 预览编辑时，组件接收到env=test|
| engineEnv | 引擎加载资源地址，默认按照平台环境加载 | prod或undefined，表示线上 |  prod: 表示发布状态 <br> test: 表示预览状态 <br> 预览编辑时，组件接收到env=test|

## 项目域名配置
| 环境 | 入口 | 使用说明 |
| -- | -- | -- |
| 页面实验室 | 在编辑页右上角“实验室”，点击“域名”Tab栏进行修改 | 修改后保存，即生效 |
| 测试环境 | https://cweb-test.yy.com/admin/project/list | 在项目设置中修改，新创建的会自动同步更新 |
| 线上环境 | https://cweb.yy.com/admin/project/list | 在项目设置中修改，新创建的会自动同步更新 |
| 地址要求 | https://xxx.com | 结尾不带斜杆 |

## 项目相关插件
| 插件名 | 版本 |
| -- | -- |
| @efox/emp-sharemf-exposes-plugin | 最新 |
| @efox/emp-single-mobx6 | 最新 |

## 创建组件
安装ts依赖
在package.json中script增加
"tss:lib": "emp tss https://cweb-test.yy.com/topic/emp.d.ts -n types/emp.d.ts && emp tss https://cweb-test.yy.com/topic/emptype.ts -n types/emptype.ts"

执行yarn tss:lib
1 引入EmpPropTypes
```
import {EmpPropTypes} from 'src/types/emptype.ts'
```
2 创建普通React组件并声明为EmpFC类型,参数类型为EmpFCProps,ListProps为可变参数接口
```
const Test: EmpFC = (props: EmpFCProps<ListProps>) => {
    return xxx
}
```
3 **填写EmpPropTypes内容**,需要按照如下数据结构：
```
Test.empPropTypes = {
  name: '通用榜单',
  defined: {
    description: '榜单组件',
  },
  mockDatas: [
    {
      name: '即将开始',
      value: getRevenueMockData(1, 1, 22222),
    },
  ]
  props: {
    rankId: {
      label: '活动ID',
      type: EmpPropTypes.Input,
      value: '',
    },
    styleSelect: {
      label: '前三样式切换',
      description: '两种样式间的切换',
      type: EmpPropTypes.RadioGroup,
      value: 1,
      options: {
        options: [
          {label: '排列', value: 1},
          {label: '置顶', value: 2},
        ],
      },
    }, 
  },
}
```
## EmpPropTypes属性
| 属性 | 属性说明 | 是否必填 |
| -- | -- | -- |
| name | 组件名称  | 是 | 
| defined | 组件描述 | 否 |
| props | 组件可变参数 | 否 |
| mockDatas | 是否使用mock数据 | 否 |
| components | 预留 | 否 |

## EmpPropTypes属性子属性
| 属性 | 子属性 | 子属性说明 | 是否必填 |
| -- | -- | -- | -- |
| name | 无 | | |
| defined | | | |
| | description | 组件作用描述 | 否 |
| | hidden | 组件隐藏显示 | 否 |
| | catagories | 中文分类 | 否 |
| | slots | 定义导航，该属性会影响节点更新的逻辑 | 否 |
| | slotsTab | slot的子标签，即导航tab标签 | 否 |
| props | | | |
| | label | 可变参数名称 | 是 |
| | description | 可变参数描述 | 否 |
| | type | 可变参数类型| 是 |
| | value | 可变参数默认值 | 是 |
| | priority | 参数权重 | 否 |
| | options | 透传antd组件的参数 | 否 |
| mockDatas | 无 | | |

4 **通过props引入可变参数**,在组件里通过porps可以将EmpPropTypes属性里props引入组件内作为参数，后续可以在变色龙编辑平台修改这些参数<br>
组件内props内置属性有：node、children、mock、mockData、env、device，这些属性无需通过EmpPropTypes属性填写，可以直接从组件内props提取

## 组件内props内置属性
| 属性 | 属性说明 |
| -- | -- |
| node | slot子节点 | 
| children | 子组件 | 
| mock | 是否使用mock数据 |
| mockData | 返回的mock数据 |
| device | 当前设备值 pc mobile other |
| env | 编辑状态 test, prod 区别发布或预览 |

5 **定义组件代码**
```
import React from 'react'

// 定义组件属性类型
type Props = {
  propKey: string
}

const ExampleCommponent: EmpFC<Props> = (props: EmpFCProps<Props>) => {
  return <div>ExampleCommponent</div>
}

Image.empPropTypes = {
  name: '组件名称',
  defined: {
    description: '组件描述',
  },
  props: {
    propKey: {
      label: '图片地址',
      type: EmpPropTypes.Upload,
      value: 'https://pushmiddle.bs2dl.yy.com/img/612dd171cce0a501f5f6d303',
      extendConfig: {
        url: './ExampleCommponentConfig',
        name: '自定义名称',
        width: '100%',
      },
    }
  }
}
export default ExampleCommponent
```

6 **定义扩展配置代码**
```
import React from 'react'

// 定义组件属性类型

const ExampleCommponentConfig: EmpFC<any> = ({propKey, propValue, section, callback, empLangKvs, ...rest}: EmpFCExtendConfig<any>) => {
  return <div>
    <h1>ExampleCommponentConfig</h1>
    <div>
      <div>所有数据存储： {JSON.stringify(empLangKvs)}</div>
      <h2>通过section能拿到当前props表单数据{JSON.stringify(section)}</h2>
      <h2>propKey为当前Key: {propKey}</h2>
      <h2>propValue为当前值: {propValue}</h2>
      <Button
        onClick={() => {
          callback({
            [`${propKey}`]: 'test',
            abc: 'test',
          }, {
            globalKey: '自定义key-value存储',
          })
        }}>
        通过回调同方式增量回写数据
      </Button>
    </div>
  </div>
}

export default ExampleCommponentConfig
```