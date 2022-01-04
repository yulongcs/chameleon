import React from 'react'
import {Row, Col, Tooltip, Collapse} from 'antd'

import EmpConfigForm from 'src/pages/app/editor/shared/EmpConfigForm'
import {FromItem} from 'src/pages/app/editor/shared/EmpConfigForm'
// import {useCollectStyle} from 'src/baseComponents/Core/styles/hooks'
import styles from './index.module.scss'
import {formList, group1, styleList} from './config'
import Form from 'antd/es/form'
import langStore from 'src/stores/page/lang'
import {FormType} from 'src/stores/page/tree'
import {observer} from 'mobx-react'

const {Panel} = Collapse

interface PropsI {
  id: TreeNodeProps['id']
  formType?: string
}
type ItemType = typeof group1['render'][0]
const StyleSetting = (props: PropsI) => {
  const {id, formType} = props

  // const {updateStylesData, selectedNodeType, controlledStyleAttr, stylesData, form} = useCollectStyle()

  const renderItem = ({col, item}: {col: ItemType['col']; item: ItemType['item']}, idx: number) => {
    const key = `${item.name}-${idx}`
    // console.log(key)
    if (item.type === 'custom' && typeof item.Comp !== 'function') {
      return <React.Fragment key={key}></React.Fragment>
    }

    const defaultFromItemProps = {
      labelAlign: 'right',
      label: (
        <Tooltip title={item?.label}>
          <div className={styles.form_item_label}>{item?.label}</div>
        </Tooltip>
      ),
    }

    return (
      <Row className={styles.row} key={key}>
        <Col
          {...(col
            ? col
            : {
                span: 12,
              })}>
          <FromItem
            item={{
              ...item,
              formItemOptions: {
                ...defaultFromItemProps,
                ...(item?.formItemOptions || {}),
              },
            }}
          />
        </Col>
      </Row>
    )
  }

  const renderCompStyleEditPanel = () => {
    return (
      <>
        {(formList as typeof group1[]).map((item, idx) => (
          <React.Fragment key={`${item.name}-${idx}`}>
            {item.render.some(i => styleList.includes(i.item.name)) ? (
              <Panel
                style={{
                  width: '100%',
                  borderBottom: 'none',
                }}
                // forceRender
                header={item?.name}
                key={`${item.name}-${idx}`}>
                {item.render.map((i, idx) => {
                  return styleList?.includes(i.item.name) ? renderItem(i, idx) : null
                })}
              </Panel>
            ) : null}
          </React.Fragment>
        ))}
      </>
    )
  }
  const initialValues = (langStore.langKvs[id] || {})[formType || FormType.Style] || {
    opacity: 1,
  }
  const [form] = Form.useForm()
  return (
    <EmpConfigForm
      initialValues={initialValues}
      id={id}
      // 默认是empStyle，可以是组件自己的style key
      formType={formType || FormType.Style}
      form={form}>
      <Collapse style={{width: '100%'}} accordion ghost={false} bordered={false}>
        {renderCompStyleEditPanel()}
      </Collapse>
    </EmpConfigForm>
  )
}
export default observer(StyleSetting)
