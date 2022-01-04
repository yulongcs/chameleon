import {makeAutoObservable} from 'mobx'

class DemoStore {
  count = 0
  constructor() {
    makeAutoObservable(this)
  }
  addCount() {
    this.count += 1
  }
}

export default new DemoStore()
