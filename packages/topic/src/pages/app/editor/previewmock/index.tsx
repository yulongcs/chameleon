import Tooltip from 'antd/es/tooltip'
import {observer} from 'mobx-react'
import React, {useCallback, useEffect, useState} from 'react'
import {sendRefreshSignal} from 'src/helpers/appSignaUtil'
import {EnumActionTypes} from 'src/pages/engine/event/engineSignalUtil'
import treeStore from 'src/stores/page/tree'
import {getItemsFromMockData} from '../shared/utils'
import style from './index.module.scss'
const PreviewMockSelector = () => {
  const [dataList, setDataList] = useState([])

  const resetData = useCallback(async () => {
    const list = (await getItemsFromMockData(treeStore.curTreeNode)) || []
    setDataList(list)
  }, [])

  useEffect(() => {
    resetData()
  }, [treeStore.curTreeNode])

  const onClickAction = ({value, callback}: any) => {
    if (callback) {
      return callback()
    }
    sendRefreshSignal({
      id: treeStore.curTreeNode.id,
      action: EnumActionTypes.UpdateWithMockData,
      data: value,
    })
  }
  const data = {
    name: '',
    defined: {},
    mockDatas: [
      {
        name: '自定义标题1',
        value: {code: 0, data: {}},
      },
      {
        name: '自定义标题2',
        value: {code: 0, data: {}},
      },
    ],
    props: {},
  }
  const tipData = (data: any) => {
    return (
      <div>
        <h3 style={{color: 'white', fontWeight: 'bold'}}>mock数据使用示例：</h3>
        <span>
          1. 通过empPropTypes.props.mockDatas获取mock数据，在变色龙编辑平台可以通过
          <span style={{color: 'red'}}>此按钮</span>
          回调不同的mock数据
        </span>
        <br />
        <span>2. 在组件里通过props内置的mockDatas直接引入</span>
        <br />
        <span>以下为示例:</span>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 2).replace(/\n/gi, '</br>').replace(/\s/gi, '&nbsp;'),
          }}></div>
      </div>
    )
  }
  return (
    <div className={style.box}>
      {dataList.length ? (
        dataList.map((item: EmpPropTypesMockConfig, index: number) => {
          const data = item.value
          return (
            <Tooltip
              placement={'right'}
              key={`${item}_${index}`}
              overlay={
                <div
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(data, null, 2).replace(/\n/gi, '</br>').replace(/\s/gi, '&nbsp;'),
                  }}></div>
              }
              overlayInnerStyle={{width: '300px', height: '600px', overflowY: 'scroll'}}>
              <div
                key={`${item}_${index}`}
                className={style.box_btn}
                onClick={(ev: React.MouseEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  onClickAction(item)
                }}>
                {item.name}
              </div>
            </Tooltip>
          )
        })
      ) : (
        <Tooltip
          placement={'right'}
          overlay={tipData(data)}
          overlayInnerStyle={{width: '300px', height: '300px', overflowY: 'scroll'}}>
          <div className={style.box_btn} style={{width: '90px'}}>
            mock数据指引
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default observer(PreviewMockSelector)
