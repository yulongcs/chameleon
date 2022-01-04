import {fetch, fetch1} from './fetch'
import {message} from 'antd'
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
//发布逻辑
//开发sectionId:618de22b8e69cf14a1a4486e , 线上sectionId：619c90f808b49e233da50d82
const getActivitiesList = async () => {
  const result = await fetch1.get(
    `topicPage/getSectionById/${isProd ? '619c90f808b49e233da50d82' : '619c9a2518afc85c5ef70c91'}`,
  )
  const {code, data, msg} = result?.data
  if (code === 0) {
    return data
  } else {
    message.error(msg)
  }
}
const updateActicitiesList = async (value: any) => {
  const result: any = await fetch.post('admin/topicPageSection', {
    projectId: isProd ? '612767467e5b2a7a83835c53' : '60d0050f02cf81422237471e',
    pageId: isProd ? '612767597e5b2a7a83835c5b' : '60d0353502cf814222374960',
    key: isProd ? 'activitiesReport' : 'activitiesReport',
    value: value,
  })
  const {code, data, msg} = result
  if (code === 0) {
    return data
  } else {
    message.error(msg)
  }
}
const getActivityInfo = async (projectId: string) => {
  const result: any = await fetch.get(`admin/topicPage?page=0&size=1000&projectId=${projectId}`)
  return result
}
const modifyData = (data: any, addItem: any, pageId: string): any => {
  const {projectId} = addItem
  const {value} = data
  const {projectMap} = value
  if (projectMap.hasOwnProperty(projectId)) {
    const activityList = projectMap[projectId].listMap
    if (activityList[pageId]) {
      const activity = activityList[pageId]
      activity.updateTime = String(Date.now())
    } else {
      getActivityInfo(projectId).then((activities: any) => {
        const activitiesList = activities.data.list
        const activity: any = activitiesList.find((item: any) => {
          return item.pageId === pageId
        })
        const curActivitiesList = projectMap[projectId].listMap
        curActivitiesList[pageId] = {
          pageId,
          createTime: activity.createTime,
          updateTime: String(Date.now()),
        }
      })
    }
  }
  value.timeStamp = Date.now()
  return value
}
export const saveActivities = async (itemValue: any, pageId: string) => {
  const data = await getActivitiesList()
  if (data) {
    const value = modifyData(data, itemValue, pageId)
    const result: any = await updateActicitiesList(value)
    if (result?.value?.timeStamp !== value.timeStamp) {
      const newData = await getActivitiesList()
      const newValue = modifyData(newData, itemValue, pageId)
      const result = await updateActicitiesList(newValue)
      return result
    } else if (result) {
      return result
    }
  }
}
