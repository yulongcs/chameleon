const refactorData: (content: any) => PageDataProps = (content: any) => {
  return {
    pageInfo: content.pageInfo,
    offlineTime: content?.offlineTime,
    onlineTime: content?.onlineTime,
    pc: {
      test: {
        empModules: [],
        sectionId: content.pc.testI18nId,
        data: content.pc.testData,
        status: true,
      },
      prod: {
        empModules: [],
        sectionId: content.pc.prodI18nId,
        data: content.pc.prodData,
        status: true,
      },
    },
    mobile: {
      test: {
        empModules: [],
        sectionId: content.mobile.testI18nId,
        data: content.mobile.testData,
        status: true,
      },
      prod: {
        empModules: [],
        sectionId: content.mobile.prodI18nId,
        data: content.mobile.prodData,
        status: true,
      },
    },
    other: {
      test: {
        empModules: [],
        sectionId: content.other.testI18nId,
        data: content.other.testData,
        status: true,
      },
      prod: {
        empModules: [],
        sectionId: content.other.prodI18nId,
        data: content.other.prodData,
        status: true,
      },
    },
    lang: {
      test: {
        defaultLang: content.defaultLang,
        selectLangs: content.selectLangs,
      },
      prod: {
        defaultLang: content.defaultLang,
        selectLangs: content.selectLangs,
      },
    },
  }
}
