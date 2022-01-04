const ProjectConfig = {
  prod: 'http://localhost',
  test: 'http://localhost',
  dev: 'http://localhost',
  context: '/topic/',
  filename: 'chameleon_share_emp.js',
  name: 'chameleon_share_emp',
  title: '共享基站',
  remotes: {},
  exposes: {},
  componentGroups: {
    // image: {
    //   title: '图片',
    // },
    // text: {
    //   title: '文本',
    // },
    // tab: {
    //   title: '导航',
    // },
  },
}
console.log('ProjectConfig', ProjectConfig)

module.exports = {
  ProjectConfig,
}
