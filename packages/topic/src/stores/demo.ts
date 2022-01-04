import './empmobx'
import {empCreateClassStore, makeAutoObservable} from './empmobx'

class DemoStore {
  count = 2
  list = [{index: 0, person: {name: 'Lion', age: 12}}]
  constructor() {
    makeAutoObservable(this)
  }
  addCount() {
    this.count += 1
  }
  pushList() {
    this.list.push({...this.list[0], index: this.list.length})
  }
}

export default empCreateClassStore<DemoStore>(DemoStore)
