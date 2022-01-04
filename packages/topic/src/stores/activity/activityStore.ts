import {empCreateClassStore, makeAutoObservable} from 'src/stores/empmobx'

class ActivitiyStore {
  activityStoreById: Record<string | number, any> = {}
  constructor() {
    makeAutoObservable(this)
  }

  addListener() {
    setTimeout(() => {
      this.setActStore('10', {
        activityInfo: {
          activityId: 100,
        },
      })
    }, 1000)
    // ;(window as any).onVisibleChange = (res: any) => {}
  }

  setActStore<T>(activityId: string, data: T) {
    this.activityStoreById[activityId] = data
  }

  getActStore<T>(activityId: string | number) {
    return (this.activityStoreById[activityId] || {}) as T
  }
}

export default empCreateClassStore<ActivitiyStore>(ActivitiyStore)
