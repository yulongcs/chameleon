import {sortBy} from 'lodash'

export const generateRestFormMap = (restFormItems: any) => {
  const defaultGroupList: any[] = []
  let restFormMap: Record<string, any[]> = {}

  if (Array.isArray(restFormItems) && restFormItems.length) {
    restFormItems.forEach(item => {
      if (item?.group && typeof item?.group === 'string') {
        if (restFormMap[item?.group]) restFormMap[item?.group].push(item)
        else restFormMap[item?.group] = [item]
      } else if (!item?.group) {
        defaultGroupList.push(item)
      }
    })
    restFormMap = {
      ...restFormMap,
      defaultGroupList: defaultGroupList,
    }
    for (const key in restFormMap) {
      const list = restFormMap[key]
      if (list?.length) {
        restFormMap[key] = sortBy(list, o => -o?.weight)
      }
    }
  }
  return Object.keys(restFormMap).map(item => ({
    name: item,
    items: restFormMap[item],
  }))

  // return restFormMap
}
