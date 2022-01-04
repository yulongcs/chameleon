import {Tabs, Button, Drawer} from 'antd'
import Tooltip from 'antd/es/tooltip'
const {TabPane} = Tabs
import React, {useEffect, useState} from 'react'
import pageStore from 'src/stores/page'
import DevEngineIndex from './devVersion'
import HostIndex from './host'
import ProjectVersion from './projectVersion'
import Engine from './engine'
import ErrorBoundary from '../../shared/Error'

const LibraryIndex = ({name}: {name?: string}) => {
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {}, [pageStore.renderData?.empModules])

  return (
    <>
      <Button type="primary" size="small" onClick={showDrawer}>
        <Tooltip
          placement="bottom"
          title={
            <div>
              <p>当前环境: {window.__EMP.globalParams.remoteEnv}</p>
            </div>
          }>
          {name || `实验室${window.__EMP.globalParams.remoteEnv}`}
        </Tooltip>
      </Button>
      <ErrorBoundary>
        <Drawer title="实验室" placement="right" onClose={onClose} visible={visible} width="800">
          <DevEngineIndex />
          <Tabs defaultActiveKey="1">
            <TabPane tab="资源版本" key="1">
              <ProjectVersion />
            </TabPane>
            <TabPane tab="域名" key="2">
              <HostIndex />
            </TabPane>
            <TabPane tab="引擎版本" key="3">
              <Engine />
            </TabPane>
            {/* <TabPane tab="拓展" key="4">
              <Extend />
            </TabPane> */}
          </Tabs>
        </Drawer>
      </ErrorBoundary>
    </>
  )
}

export default LibraryIndex
