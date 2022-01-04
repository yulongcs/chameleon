import React from 'react'
import {useParams} from 'react-router'

const PagePreview = () => {
  const params = useParams<Array<string>>()
  return (
    <>
      {/* {BaseComponent({name: shareModuleStore.projectModule.name, env: EnumPlatformEnv.dev, moduleName: params[0]})} */}
    </>
  )
}

export default PagePreview
