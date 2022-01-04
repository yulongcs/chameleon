export const localEmpModuleConfigs = (data?: Record<string, TreeNodeRemoteModule>) => {
  const key = `EMP_localEmpModuleConfigs`
  if (data) {
    sessionStorage.setItem(key, JSON.stringify(data))
  }
  return JSON.parse(sessionStorage.getItem(key) || '{}')
}

export const getMergePageModuleConfigs = (pageEmpModules: Array<TreeNodeRemoteModule>) => {
  const tmpMap: any = {}
  pageEmpModules.map((item: TreeNodeRemoteModule & any, index: number) => {
    if (typeof item === 'string') {
      pageEmpModules[index] = EmpModuleConfigs()[item]
    }
    tmpMap[item.rmn || item] = {
      ...EmpDefaultModuleConfigs[pageEmpModules[index].rmn],
      ...pageEmpModules[index],
    }
  })
  return {
    map: tmpMap,
    list: pageEmpModules,
  }
}

export const getMergeModuleConfigs = (pageEmpModules: Array<TreeNodeRemoteModule>) => {
  let {map} = getMergePageModuleConfigs(pageEmpModules)
  map = {...JSON.parse(JSON.stringify(EmpModuleConfigs())), ...map}
  localEmpModuleConfigs(map)
  return {
    list: Object.values(map),
    map,
  }
}

export const EmpDefaultModuleConfigs: any = {
  basic_share_emp: {
    rmn: 'basic_share_emp',
    rmp: '',
    title: '新基础组件',
    unpkgUrlMap: {
      dev: `https://unpkg.yy.com/@webbase/chameleonbasic@test/dist/basic_share_emp.js`,
      test: `https://unpkg.yy.com/@webbase/chameleonbasic@test/dist/basic_share_emp.js`,
      prod: `https://unpkg.yy.com/@webbase/chameleonbasic@latest/dist/basic_share_emp.js`,
    },
  },
  chameleon_share_emp: {
    rmn: 'chameleon_share_emp',
    rmp: '',
    title: '基础组件（过期）版本定在1.0.24',
    unpkgUrlMap: {
      dev: `https://unpkg.yy.com/@webbase/chameleonapp@1.0.24/dist/chameleon_share_emp.js`,
      test: `https://unpkg.yy.com/@webbase/chameleonapp@1.0.24/dist/chameleon_share_emp.js`,
      prod: `https://unpkg.yy.com/@webbase/chameleonapp@1.0.24/dist/chameleon_share_emp.js`,
    },
  },
  bdgamelive_share_emp: {
    rmn: 'bdgamelive_share_emp',
    rmp: '',
    title: '游戏直播',
    unpkgUrlMap: {
      dev: 'https://unpkg.yy.com/@gfe/bdtopic@test/dist/bdgamelive_share_emp.js',
      test: 'https://unpkg.yy.com/@gfe/bdtopic@test/dist/bdgamelive_share_emp.js',
      prod: 'https://unpkg.yy.com/@gfe/bdtopic@latest/dist/bdgamelive_share_emp.js',
    },
  },
  zhuiwan_share_emp: {
    rmn: 'zhuiwan_share_emp',
    rmp: '',
    title: '追玩',
    unpkgUrlMap: {
      dev: 'https://unpkg.yy.com/@friend/topic_emp_zhuiwan@test/dist/zhuiwan_share_emp.js',
      test: 'https://unpkg.yy.com/@friend/topic_emp_zhuiwan@test/dist/zhuiwan_share_emp.js',
      prod: 'https://unpkg.yy.com/@friend/topic_emp_zhuiwan@latest/dist/zhuiwan_share_emp.js',
    },
  },
}
export const EmpModuleConfigs: () => Record<string, TreeNodeRemoteModule> = () => {
  const result = {
    ...EmpDefaultModuleConfigs,
    ...localEmpModuleConfigs(),
  }
  return result
}
