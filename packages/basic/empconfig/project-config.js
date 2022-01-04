const ProjectConfig = {
  prod: 'http://localhost',
  test: 'http://localhost',
  dev: 'http://localhost',
  context: '/basic/',
  filename: 'basic_share_emp.js',
  name: 'basic_share_emp',
  title: '共享基站',
  remotes: {},
  exposes: {
    // 图片
    './image/pc/index': './src/components/image/pc/index.tsx',
    './image/mobile/index': './src/components/image/mobile/index.tsx',
    // './image/mobile/indexconfig': './src/components/image/mobile/indexconfig.tsx',
    './image/common/singleimage': './src/components/image/common/singleimage.tsx',
    './image/headerrule/mobile/index': './src/components/image/headerrule/mobile/index.tsx',
    // 文本
    './text/richtext/index': './src/components/text/richtext/index.tsx',
    './text/texttitle/index': './src/components/text/texttitle/index.tsx',
    // 导航
    './tab/scrollTabMobile/index': './src/components/tab/scrollTabMobile/index.tsx',
    './tab/scrollTabMobile/tab': './src/components/tab/scrollTabMobile/tab.tsx',
  },
  componentGroups: {
    image: {
      title: '图片',
    },
    text: {
      title: '文本',
    },
    tab: {
      title: '导航',
    },
  },
}

module.exports = {
  ProjectConfig,
}
