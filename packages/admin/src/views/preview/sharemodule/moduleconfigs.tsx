export const EmpModuleConfigs: Record<string, TreeNodeRemoteModule> = (() => {
  const result = {
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

    bdgamelive_share_emp: {
      rmn: 'bdgamelive_share_emp',
      rmp: '',
      title: '游戏直播',
      unpkgUrlMap: {
        dev: 'https://cweb-dev.yy.com:4422/bdgamelive_share_emp.js',
        test: 'https://unpkg.yy.com/@gfe/bdtopic@test/dist/bdgamelive_share_emp.js',
        prod: 'https://unpkg.yy.com/@gfe/bdtopic@latest/dist/bdgamelive_share_emp.js',
      },
    },
  }
  return result
})()
