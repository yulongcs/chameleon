import fetch from 'src/api/fetch'
import axios from 'axios'
import config from 'src/configs'
//emp平台环境
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.EMP_ENV === 'prod'
export const fetch1 = axios.create({
  baseURL: config.publicHost,
})
//获取报表数据
const getActivitiesList = async () => {
  const result = await fetch1.get(
    `topicPage/getSectionById/${isProd ? '619c90f808b49e233da50d82' : '619c9a2518afc85c5ef70c91'}?t=${Date.now()}`,
  )
  const {code, data, msg} = result?.data
  if (code === 0) {
    return data
  } else {
    return new Error(msg)
  }
}
const updateActicitiesList = async (value: any) => {
  const result: any = await fetch.post(`admin/topicPageSection`, {
    projectId: isProd ? '612767467e5b2a7a83835c53' : '60d0050f02cf81422237471e',
    pageId: isProd ? '612767597e5b2a7a83835c5b' : '60d0353502cf814222374960',
    key: 'activitiesReport',
    value: value,
    t: Date.now(),
  })
  return result
}
const modifyData = (data: any, addItem: any, pageId: string): any => {
  //projectName为aliasName
  const {projectId, projectName} = addItem
  const {value} = data
  const {projectMap} = value
  if (projectMap.hasOwnProperty(projectId)) {
    //创建的时候必定有大项目存在，项目名为别名
    projectMap[projectId].projectName = projectName
    //活动列表
    const activityList = projectMap[projectId].listMap
    activityList[pageId] = {
      createTime: String(Date.now()),
      pageId: pageId,
    }
  } else {
    projectMap[projectId] = {
      projectId: projectId,
      listMap: {
        [pageId]: {
          createTime: String(Date.now()),
          pageId: pageId,
        },
      },
      projectName: projectName,
    }
  }
  value.timeStamp = Date.now()
  return value
}
const deleteProjectData = (data: any, projectId: string) => {
  const {value} = data
  const {projectMap} = value
  delete projectMap[projectId]
  value.timeStamp = Date.now()
  return value
}
//更新项目或活动页
const saveActivities = async (pageInfo: any) => {
  const {projectId, pageId} = pageInfo
  const allProjects = JSON.parse(localStorage.getItem('allProjects') || 'null')
  const data = await getActivitiesList()
  let projectName = ''
  allProjects.some((project: any) => {
    if (project.id === projectId) {
      projectName = project.alias
      return true
    }
  })
  if (data) {
    const value = modifyData(data, {projectId, projectName}, pageId)
    const result: any = await updateActicitiesList(value)
    if (result?.value?.timeStamp !== value.timeStamp) {
      const newData = await getActivitiesList()
      const newValue = modifyData(newData, {projectId, projectName}, pageId)
      const result: any = await updateActicitiesList(newValue)
      return result
    } else if (result) {
      return result
    }
  }
}
//删除某个项目
const deleteProject = async (projectId: string) => {
  const data: any = await getActivitiesList()
  if (data) {
    const value = deleteProjectData(data, projectId)
    const result: any = await updateActicitiesList(value)
    if (result?.value?.timeStamp !== value.timeStamp) {
      const newData = await getActivitiesList()
      const newValue = deleteProjectData(newData, projectId)
      const result: any = await updateActicitiesList(newValue)
      return result
    } else if (result) {
      return result
    }
  }
}
//删除某个活动页
const deletePageData = (data: any, projectId: string, pageId: string) => {
  const {value} = data
  const {projectMap} = value
  const {listMap} = projectMap[projectId]
  delete listMap[pageId]
  value.timeStamp = Date.now()
  return value
}
//获取全部已有项目
const getAllprojectList = async () => {
  const result: any = await fetch.get(`admin/mlproject?page=0&size=1000&t=${Date.now()}`)
  return result
}
//添加项目
const addProject = async (project: any) => {
  const {id, alias} = project
  const projectInfo = await fetch.get(`admin/topicPage?page=0&size=1000&projectId=${id}&t=${Date.now()}`)
  const Allprojects = await getActivitiesList()
  const {value} = Allprojects
  const {projectMap} = value
  const newProject = {
    projectId: id,
    projectName: alias,
    listMap: transfrom(projectInfo['list']),
  }
  projectMap[id] = newProject
  value.timeStamp = Date.now()
  const result = await updateActicitiesList(value)
  if (result?.value?.timeStamp !== value.timeStamp) {
    value.timeStamp = Date.now()
    const result: any = await updateActicitiesList(value)
    return result
  } else if (result) {
    return result
  }
}
//项目数据格式转换：
const transfrom = (list: any) => {
  const result = {}
  list.map((item: any) => {
    const {pageId, createTime, updateTime} = item
    result[pageId] = {
      pageId,
      createTime,
      updateTime,
    }
  })
  return result
}

//删除活动页
const deletePage = async (projectId: string, pageId: string) => {
  const data: any = await getActivitiesList()
  if (data) {
    const value = deletePageData(data, projectId, pageId)
    const result: any = await updateActicitiesList(value)
    if (result?.value?.timeStamp !== value.timeStamp) {
      const newData = await getActivitiesList()
      const newValue = deletePageData(newData, projectId, pageId)
      const result: any = await updateActicitiesList(newValue)
      return result
    } else if (result) {
      return result
    }
  }
}
export {getActivitiesList, saveActivities, deleteProject, getAllprojectList, addProject, deletePage}
