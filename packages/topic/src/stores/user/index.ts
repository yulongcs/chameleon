import {message} from 'antd'
import combineLogin from 'src/helpers/combineLogin'
import {empCreateClassStore, makeAutoObservable} from 'src/stores/empmobx'
import {getProjectInfo} from '../project/api'

class UserStore {
  uid = 0
  userInfo = {
    name: '',
    passport: '',
    uid: 0,
  }
  isLogin = false
  hasAuth = false
  constructor() {
    makeAutoObservable(this)
  }

  checkUid() {
    const uidstr = combineLogin.hasLogin('yyuid')
    if (!uidstr || uidstr !== '0') {
      this.uid = +uidstr
    }
    this.isLogin = true
    return this.uid
  }

  async getUserAuth(projectId: string) {
    if (!projectId) return false
    const res: any = await getProjectInfo(projectId)
    if (res.code > 0) {
      if (res.code === 401 || res.code === 302) {
        combineLogin.clearCookie()
        this.userInfo = {uid: 0, passport: '', name: ''}
      }
      this.updateAuth(false)
      if (res.code === 302) {
        message.info('请登录', 2)
        return false
      }
      message.warning(res.message, 2)
      return false
    }
    const authorizers4Show = res?.data?.authorizers4Show
    let authItem
    if (authorizers4Show) {
      authItem = authorizers4Show.find((item: any) => item.uid === this.uid)
    }
    window.__extendTopic = res?.data?.extendTopic
    console.log('authorizers4Show:::', this.uid, authItem)
    this.userInfo = authItem
    this.updateAuth(!!authItem)
    return !!authItem
  }

  updateAuth(hasAuth: boolean) {
    this.hasAuth = hasAuth
    this.isLogin = hasAuth
  }
}

const userStore = empCreateClassStore<UserStore>(UserStore)
export default userStore
