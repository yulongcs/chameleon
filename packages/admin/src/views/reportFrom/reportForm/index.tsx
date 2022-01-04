import React, {useCallback, useEffect, useRef, useState} from 'react'
import {getActivitiesList} from '../../reportFrom/api/api'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {BarChart, PieChart} from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers'
import {Select, DatePicker, Button, Drawer} from 'antd'
import {getTimeRange} from './util/getTimeRange'
import {getEhartsOptions} from './util/getEchartsOptions'
import {timeStringFormat} from './util/timeStringFormat'
import style from './index.module.scss'
import moment from 'moment'
import userStore from 'src/stores/user'
import ReportFormConfig from './reportFormConfig/index'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  LegendComponent,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
])

interface ProjectVO {
  value: number
  name: string
  publicValue: number
}
interface ChartsData {
  legendData: any
  seriesData: any
  allCount: number
  publicCount: number
}
//展示页面数据逻辑
const ReportForm = () => {
  const [type, setType] = useState<any>('week')
  const {Option} = Select
  const [pickerValue, setPickValue] = useState<any>()
  const PickerWithType = ({type, onChange}: any) => {
    return <DatePicker picker={type} onChange={onChange} value={pickerValue} />
  }

  useEffect(() => {
    //拿数据
    getActivitiesList().then((data: any) => {
      const projectInfo: any = data?.value?.projectMap
      allProjectHandle(projectInfo)
    })
  }, [getActivitiesList])
  const [timeSelect, setTimeSelect] = useState<number>(Date.now())
  //echarts部分逻辑
  const [addMain, setAddMain] = useState<HTMLElement | null>()
  const [publishMain, setPublishMain] = useState<HTMLElement | null>()
  const [allMain, setAllMain] = useState<HTMLElement | null>()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all')
  const [allProject, allProjectHandle] = useState<any>()
  const [addActivities, setAddActivities] = useState<ChartsData>()
  const [allActivities, setAllActivities] = useState<ChartsData>()
  const [timeRange, setTimeRange] = useState<string>(
    `${new Date(getTimeRange(Date.now(), 'week')[0]).toLocaleDateString} - ${
      new Date(getTimeRange(Date.now(), 'week')[1]).toLocaleDateString
    }`,
  )
  const [timeRangeString, setTimeRangeString] = useState<string>('本周')
  //本年度总数
  const [yearTotal, setYearTotal] = useState<number>(0)
  //本月总数
  const [monthTotal, setMonthTotal] = useState<number>(0)
  const [hasAuthority, setHasAuthority] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const onChangeProject = (value: string) => {
    setSelectedProjectId(value)
  }
  //时间选择回调
  const onChangeTime = useCallback((value: any, valueString: string) => {
    setTimeRangeString(valueString)
    setPickValue(value)
    setTimeSelect(value?._d.getTime())
  }, [])
  const onClose = () => {
    setVisible(false)
  }
  const onOpen = () => {
    setVisible(true)
  }
  //白名单，在这里配置白名单后可以打开表报配置开关
  const whiteList = ['dw_yangshangzhi', 'dw_linlijian']
  //选择不同类型日期选择框后清空数据
  useEffect(() => {
    const value = getTimeRange(Date.now(), type)
    setTimeRangeString(
      `${moment(value[0]).year()}${type === 'year' ? '' : '-'}${timeStringFormat(moment(value[0])[type](), type)} `,
    )
    setPickValue(moment(value[0]))
    setTimeSelect(value[0])
  }, [type])
  useEffect(() => {
    const addNode = document.getElementById('addMain')
    const publishNode = document.getElementById('publishMain')
    const AllNode = document.getElementById('allMain')
    setAddMain(addNode)
    setPublishMain(publishNode)
    setAllMain(AllNode)
  }, [allProject])
  useEffect(() => {
    const timeRangeString = getTimeRange(timeSelect, type)
    if (timeRangeString) {
      setTimeRange(
        `${new Date(timeRangeString[0]).toLocaleDateString()} - ${new Date(timeRangeString[1]).toLocaleDateString()}`,
      )
    }
  }, [timeSelect])
  useEffect(() => {
    if (userStore.isLogin && userStore.userInfo) {
      whiteList.some((item: string) => {
        if (item === userStore.userInfo?.passport) {
          setHasAuthority(true)
          return true
        }
      })
    }
  }, [])
  const addOptions = getEhartsOptions(
    `${new Date(getTimeRange(Date.now(), 'week')[0]).toLocaleDateString()} - ${new Date(
      getTimeRange(Date.now(), 'week')[1],
    ).toLocaleDateString()}`,
    addActivities,
    'right',
    `本周新增活动-${addActivities?.allCount}`,
  )
  const allOptions = getEhartsOptions(
    timeRange,
    allActivities,
    'left',
    `${timeRangeString}累计新增活动-${allActivities?.allCount}`,
  )
  useEffect(() => {
    if (addMain) {
      const myAddChart = echarts.init(addMain)
      myAddChart.resize({height: 500, width: 650})
      myAddChart.setOption(addOptions)
    }
    if (allMain) {
      const myAllcharts = echarts.init(allMain)
      myAllcharts.resize({height: 500, width: 650})
      myAllcharts.setOption(allOptions)
    }
  }, [addMain, publishMain, addOptions])
  //echarts部分逻辑结束

  //拿到数据之后处理
  useEffect(() => {
    const addList: ChartsData = {
      legendData: [],
      seriesData: [],
      allCount: 0,
      publicCount: 0,
    }
    const AllList: ChartsData = {
      legendData: [],
      seriesData: [],
      allCount: 0,
      publicCount: 0,
    }
    let yearTotal = 0
    let monthTotal = 0
    if (allProject) {
      let projects: any = []
      if (selectedProjectId === 'all') {
        projects = Object.values(allProject)
      } else {
        projects.push(allProject?.[selectedProjectId])
      }
      projects?.map((item: any) => {
        addList.legendData.push(item.projectName)
        AllList.legendData.push(item.projectName)
        const addProject: ProjectVO = {
          name: item.projectName,
          value: 0,
          publicValue: 0,
        }
        const AllProject: ProjectVO = {
          name: item.projectName,
          value: 0,
          publicValue: 0,
        }
        const activities = Object.values(item.listMap)
        activities.map((item: any) => {
          if (getTimeRange(Date.now(), 'week', item.createTime)) {
            addProject.value++
          }
          if (getTimeRange(Date.now(), 'week', item.updateTime)) {
            addProject.publicValue++
          }
          if (getTimeRange(timeSelect, type, item.createTime)) {
            AllProject.value++
          }
          if (getTimeRange(timeSelect, type, item.updateTime)) {
            AllProject.publicValue++
          }
          if (getTimeRange(Date.now(), 'year', item.createTime)) {
            yearTotal++
          }
          if (getTimeRange(Date.now(), 'month', item.createTime)) {
            monthTotal++
          }
        })
        addList.allCount += addProject.value
        AllList.allCount += AllProject.value
        addList.publicCount += addProject.publicValue
        AllList.publicCount += AllProject.publicValue
        addProject.value && addList.seriesData.push(addProject)
        AllProject.value && AllList.seriesData.push(AllProject)
      })
      setYearTotal(yearTotal)
      setMonthTotal(monthTotal)
      setAddActivities(addList)
      setAllActivities(AllList)
    }
  }, [selectedProjectId, allProject, timeSelect])
  const onChangeType = (type: string) => {
    setType(type)
  }
  const handleProjectChange = () => {
    getActivitiesList().then(data => {
      const projectInfo: any = data?.value?.projectMap
      allProjectHandle(projectInfo)
    })
  }
  return (
    <>
      {allProject && (
        <div>
          <div className="module-header">
            <div className="module-header-main">
              <div className="form-item">
                <span>项目选择：</span>
                <Select defaultValue={'all'} onChange={onChangeProject} placeholder={'全部项目'}>
                  <Select.Option value={'all'}>全部项目</Select.Option>
                  {Object.values(allProject).map((item: any) => (
                    <Select.Option key={item.projectId} value={item.projectId}>
                      {item.projectName}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="form-item-large">
                <span>时间选择：</span>
                <Select
                  value={type}
                  onChange={(type: string) => {
                    onChangeType(type)
                  }}
                  defaultValue={'week'}>
                  <Option value="week">周</Option>
                  <Option value="month">月</Option>
                  <Option value="quarter">季度</Option>
                  <Option value="year">年</Option>
                </Select>
                <PickerWithType
                  type={type}
                  onChange={(value: any, valueString: any) => onChangeTime(value, valueString)}
                />
              </div>
              <div className="form-item">
                <span className={style.allRangeCount}>年度累计：{yearTotal}</span>
              </div>
              <div className="form-item">
                <span className={style.allRangeCount}>本月累计：{monthTotal}</span>
              </div>
              <div style={{display: hasAuthority ? 'block' : 'none'}}>
                <Button type="primary" size="middle" onClick={onOpen}>
                  报表配置
                </Button>
              </div>
            </div>
          </div>
          <div className={style.chartsContainer}>
            <div id="allMain"></div>
            <div id="addMain"></div>
            <div className={style.allCount}>
              累计新增：{allActivities?.allCount} - 累计发布：{allActivities?.publicCount}
            </div>
            <div className={style.allCount}>
              本周新增：{addActivities?.allCount} - 本周发布: {addActivities?.publicCount}
            </div>
          </div>
        </div>
      )}
      <Drawer title="报表配置" placement="right" onClose={onClose} visible={visible} width="800">
        <ReportFormConfig allProject={allProject} handleProjectChange={handleProjectChange} />
      </Drawer>
    </>
  )
}
export default ReportForm
