// npm 555e4c9e-d505-4c44-8836-77eba78f39ef
// semantic-release fCv9jfLF1bzXznm5-Z7s
// process.env.GL_TOKEN = 'fCv9jfLF1bzXznm5-Z7s'
console.log('topic')
const config = require('@yy/release-config-gitlab')
config.plugins.push([
  '@semantic-release/exec',
  {
    prepareCmd:
      'echo $BUILD_ENV && NEXT_VERSION=${nextRelease.version} yarn run build:$BUILD_ENV && mkdir $ROOT_BUILD_PATH/topic && cp -r dist/* $ROOT_BUILD_PATH/topic',
    successCmd: `emposs ossupload`,
  },
])
config.branches = [
  'master',
  {name: 'test', channel: 'test', prerelease: true},
  {name: 'beta', channel: 'beta', prerelease: true},
]
// config.extends = 'semantic-release-monorepo'

module.exports = config
