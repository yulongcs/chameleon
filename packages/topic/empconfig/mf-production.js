const path = require('path')
const packageInfo = require(path.resolve('./', 'package.json'))
module.exports = {
  exposes: {},
  remotes: {
    // ge_components: `ge_components@${'https://unpkg.bdgamelive.com/@gfe/ge-components@1.3.1/dist/federation/ge_components.js'}`,
  },
}
