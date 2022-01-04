const config = () => {
  return {
    adminHost: 'https://ml-admin-test.yy.com',
    publicHost: 'https://multi-lang-test.yy.com',
    fileHost: 'https://push-admin-test.yy.com',
    loginIframeSrc: 'https://login-test.bdgamelive.com/index.html',
  }
}
export type configType = ReturnType<typeof config>
export default config()
