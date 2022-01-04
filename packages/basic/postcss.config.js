module.exports = {
  plugins: {
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 750,
    //   propList: ['*'],
    //   unitPrecision: 3,
    //   viewportUnit: 'vw',
    //   fontViewportUnit: 'vw',
    //   selectorBlackList: ['.ignore', '.hairlines'],
    //   minPixelValue: 2,
    //   mediaQuery: true,
    //   exclude: [/node_modules/],
    //   include: [/(\/|\\)sharemodule(\/|\\)mobile/],
    // },
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      unitPrecision: 3,
      minPixelValue: 0.5,
      exclude: function (file) {
        const reg = new RegExp(
          /(commonComponent(\\|\/)container)|(components(\\|\/)mobile)|(components(\\||\/)activities)/,
          '',
        )
        let result = /(components(\\|\/)mobile)|(components(\\||\/)activities)/.test(file)
        if (result) {
          return !result
        }
        result = /((\\|\/).*rem)/i.test(file)
        if (result) {
          return !result
        }
        result = /((\\|\/).*Mobile)/i.test(file)
        if (result) {
          return !result
        }
        return !reg.test(file)
      },
    },
  },
}
