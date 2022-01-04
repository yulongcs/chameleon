import {makeAutoObservable} from 'mobx'
import {Authorizer, ProjectInfo} from 'src/api/admin.api'
import userStore from './user'

class Project {
  constructor() {
    makeAutoObservable(this)
  }
  hasProjectAuth(project: ProjectInfo) {
    if (userStore?.userInfo?.passport === 'dw_yangshangzhi') {
      return true
    }
    return project.authorizers4Show.some((auth: Authorizer) => {
      return auth.passport === userStore?.userInfo?.passport
    })
  }
}

const projectStore = new Project()
export default projectStore
