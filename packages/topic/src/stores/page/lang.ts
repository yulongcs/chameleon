// import {empCreateObjectStore} from '@efox/emp-single-mobx6'
import {empCreateObjectStore} from 'src/stores/empmobx'
import {EnumDevice, EnumPageEnv, EmpPropTypes} from 'src/types/type'
import pageStore from './index'
import {getI18nAdminList, getPublicBySectionId, update, updateI18n} from './langapi'
// 不要删除
if (EmpPropTypes.Input) {
}
const LangStore = {
  sectionId: '',
  langKvs: {} as Record<string, Record<string, any> | undefined>,
  initLangKvsAndId(id: string, lang: any) {
    this.sectionId = id
    this.langKvs = lang
  },
  initLangKvs(lang: any) {
    this.langKvs = lang
  },

  async getPublicLang(pageId: string, content: PageDataProps & any, env: EnumPageEnv, device: EnumDevice) {
    const sectionId = content[device][env].sectionId
    let res = null
    try {
      const sessionData = sessionStorage.getItem(sectionId)
      res = sessionData ? JSON.parse(sessionData) : null
    } catch (e) {}
    const resp: any = res || (await getPublicBySectionId(sectionId))
    if (resp.code === 0 && resp.data) {
      this.initLangKvs(resp.data.value)
      langStore.sectionId = resp.data.sectionId
    }
  },

  updateLangKvs: (id: string, obj: Record<any, any>) => {
    const tmpValue = langStore.langKvs[id] || {}
    langStore.langKvs[id] = {
      ...tmpValue,
      ...obj,
    }
  },

  updateLangKvsWithObject: (obj: Record<any, any>) => {
    const tmpValue = JSON.parse(JSON.stringify(langStore.langKvs || {}))
    langStore.langKvs = {
      ...tmpValue,
      ...obj,
    }
  },

  deleteKvsById: (id: string) => {
    for (const key in langStore.langKvs) {
      if (key.includes(id)) {
        delete langStore.langKvs[key]
      }
    }
  },

  async save() {
    await update(langStore.sectionId, langStore.langKvs)
  },

  resetKvs() {
    this.langKvs = {}
  },

  async _updateProdLang(prodModuleId: string, testModuleId: string, lang: string) {
    const testResult = await getI18nAdminList(testModuleId)
    if (testResult.data?.list) {
      testResult.data.list.some(async (testItem: any) => {
        if (testItem.lang === lang) {
          const prodResult = await getI18nAdminList(prodModuleId)
          prodResult.data.list.some((prodItem: any) => {
            if (prodItem.lang === lang) {
              updateI18n({
                langId: prodItem.id,
                kvs: testItem.kvs,
              })
            }
          })
        }
      })
    }
  },

  async publish() {
    const content: PageDataProps & any = pageStore.pageContent
    const sectionId = content[pageStore.device].prod.sectionId
    await update(sectionId, langStore.langKvs)
  },
}

const langStore = empCreateObjectStore(LangStore)
export default langStore
