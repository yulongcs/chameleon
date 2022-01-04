import {makeAutoObservable} from 'mobx'
import {history} from 'src/routers/config'
import {clearCookie, getCookieValue} from 'src/utils/cookie'

export interface UserInfo {
  uid: number
  nick: string
  passport: string
  hdlogo?: string
}

class User {
  isLogin: boolean
  userInfo: UserInfo | null
  constructor() {
    makeAutoObservable(this)
    this.isLogin = false
    this.userInfo = null
  }
  isAdmin() {
    return ['dw_yangshangzhi'].join(',').indexOf(this.userInfo?.passport || '') !== -1
  }
  checkLogin() {
    const uid = Number(getCookieValue('yyuid') || 0)
    const username = getCookieValue('username')
    if (uid && username) {
      this.isLogin = true
      this.setUserInfo({
        uid,
        passport: username,
        nick: username,
      })
    } else {
      this.isLogin = false
      this.userInfo = null
    }
  }
  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo
  }
  login() {
    this.isLogin = true
  }
  logout() {
    this.isLogin = false
    this.userInfo = null
    clearCookie()
  }
}

const userStore = new User()
export default userStore
