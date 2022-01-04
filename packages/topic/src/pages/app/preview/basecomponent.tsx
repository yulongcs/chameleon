import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {dynamicPreviewComponent} from 'src/engineModule/engine/render'
import {loadScript} from 'src/engineModule/utils/scriptLoader'
import {EnumPlatformEnv} from 'src/types/type'

const PreviewId = 'preview'
const BaseComponent = ({name, moduleName, env}: {env: EnumPlatformEnv; name: string; moduleName: string}) => {
  const [protoypeValue, setPrototypeValue] = useState<any>()
  useEffect(() => {
    loadScript([name], async () => {
      console.error('moduleName', moduleName)
      const value = await dynamicPreviewComponent({rmn: name, rmp: `.${moduleName}`}, PreviewId)
      setPrototypeValue(value)
    })
  }, [])
  return (
    <>
      <div id={PreviewId}>loading</div>
      <div>名称：{protoypeValue?.name}</div>
      <div>描述：{protoypeValue?.description}</div>
    </>
  )
}
export default BaseComponent
