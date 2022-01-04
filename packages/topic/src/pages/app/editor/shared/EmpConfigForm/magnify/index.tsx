import {Button, Drawer, Input} from 'antd'
import React, {useCallback, useEffect, useState} from 'react'
import {getAdvanceFormValue} from '..'
const Magnify = ({item, node}: {item: EmpEditPropTypes; node: TreeNodeProps}) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState<any>('')
  const onClose = useCallback(() => {
    setVisible(false)
  }, [])
  const rewriteSection = useCallback(
    (section: Record<string, any>) => {
      getAdvanceFormValue().updateForm(section)
    },
    [node?.id],
  )
  const {empStyle, empEvent, ...allSection}: any = getAdvanceFormValue().getEditingValue() || {}
  useEffect(() => {
    const key = item?.aliasName
    const index = item?.index
    const isArray = Object.prototype.toString.call(item.type).slice(8, -1) === 'Array'
    setText(isArray ? allSection[key]?.[index] : allSection[key])
  }, [...allSection])
  const textChange = useCallback((e: any) => {
    const key = (item as any)?.aliasName
    if (Object.prototype.toString.call(item?.type).slice(8, -1) === 'Array') {
      allSection[key][item?.index] = e.target.value
    } else {
      allSection[key] = e.target.value
      setText(allSection[key])
    }
    const values = allSection[key]
    rewriteSection({[key]: values})
  }, [])
  const typeTest = (type: any) => {
    let tmpType = type
    if (Object.prototype.toString.call(type).slice(8, -1) === 'Array') {
      tmpType = type[0]
    }
    if (tmpType === 'Input' || tmpType === 'InputTextArea') {
      return true
    }
    return false
  }
  return (
    <>
      {typeTest(item?.type) && (
        <div>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setVisible(true)
            }}>
            {'放大编辑'}
          </Button>
          <Drawer
            title={'放大编辑'}
            placement={'left'}
            closable={false}
            onClose={onClose}
            visible={visible}
            width="50vw">
            <Input.TextArea
              style={{height: '500px'}}
              value={text}
              onChange={e => {
                textChange(e)
                e.stopPropagation()
                e.preventDefault()
              }}></Input.TextArea>
          </Drawer>
        </div>
      )}
    </>
  )
}
export default Magnify
