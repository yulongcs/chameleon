import React, {useState} from 'react'
import {Modal, Popconfirm, PopconfirmProps, Tabs, Dropdown, Menu, Spin, Button, Tooltip, message} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import classNames from 'classnames'
import style from './index.module.scss'
import {observer} from 'mobx-react'
import treeStore, {FormType} from 'src/stores/page/tree'
import EditPanel from '../EditPanel'
import {showEditModalByRemote} from '../utils'
import {shareModuleStore} from 'src/stores'
import {useEffect} from 'react'
import {windowMemoryInstance} from 'src/helpers/watchClickEvent'
import {DefaultSlotItem} from 'src/stores/page/tree-const'
import editorStore from 'src/stores/page/editor'
import langStore from 'src/stores/page/lang'
import pageStore from 'src/stores/page'

type EditeItemType = {
  popcconfirmProps?: Partial<PopconfirmProps>
  treeNode: TreeNodePropsInEdit
  // children?: React.ReactChild
  onClick?: React.MouseEventHandler<HTMLDivElement>
  showId?: boolean
  // chsList: TreeNodeProps[]
}

export const EditItem = observer((props: EditeItemType) => {
  const {treeNode, popcconfirmProps, onClick, showId} = props
  const [node, setNode] = useState<EditeItemType['treeNode']>(treeNode)
  const isFromTree = Boolean(treeNode?.id)
  const [showPanel, setShowPanel] = useState(false)

  const handleVisible = async (visible: boolean) => {
    if (!visible) {
      setShowPanel(false)
    }
  }

  // 修复node不更新导致store层拿到旧数据的问题
  useEffect(() => {
    setNode(treeNode)
  }, [JSON.stringify(treeNode)])

  useEffect(() => {
    if (showPanel && !isFromTree) {
      ;(async () => {
        setNode(await treeStore.createTreeNode(treeNode))
      })()
    }
  }, [showPanel, isFromTree])

  const handleConfirm = async (treeNode = node, fromTree = isFromTree) => {
    // const modal = Modal.info({
    //   mask: true,
    //   maskClosable: false,
    //   closable: false,
    //   content: <Spin tip="保存中，请稍等..."></Spin>,
    //   okText: '.',
    //   okType: 'link',
    // })
    treeNode = JSON.parse(JSON.stringify(treeNode))
    await treeStore.setFormKvs(treeNode.id, FormType.Style)
    await treeStore.setFormKvs(treeNode.id, FormType.Props)
    await treeStore.setFormKvs(treeNode.id, FormType.Event)
    await treeStore.refreshLangKvs(treeNode.id, [FormType.Style, FormType.Props, FormType.Event])
    // 如果是树列表点开,是更新操作，否则是添加
    if (fromTree) {
      await treeStore.updateTreeNodeById(treeNode.id, treeNode)
    } else {
      await treeStore.addTreeNodeToParent(treeNode)
    }
    await treeStore.resetCurTreeNode()
    setShowPanel(false)
    await editorStore.savePage(pageStore.id, pageStore.pageContent.v)
    // modal.destroy()
    message.success('保存成功', 1)
  }
  const handleCancel = (ev: any) => {
    ev.stopPropagation()
    ev.preventDefault()
    setShowPanel(false)
  }

  const handleDelete = () => {
    Modal.confirm({
      content: (
        <>
          确认删除组件<span>{node.id}</span>
          {node.name}吗？删除后将无法恢复。
        </>
      ),
      onOk: () => {
        treeStore.deleteTreeNodeById(node.id)
      },
    })
  }

  const handleAddSub = () => {
    showEditModalByRemote(node.defined?.slots || DefaultSlotItem, {
      onOk: node => {
        handleConfirm(node, false)
      },
    })
  }

  const isActive = isFromTree && treeNode.id === treeStore.curTreeNode?.id
  const isSlotsChild = isFromTree && treeStore.getParentInfo(node.id).parentNode.defined?.slots

  const handleClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation()
    ev.preventDefault()
    onClick && onClick(ev)
    windowMemoryInstance.callback()
    windowMemoryInstance.callback = () => {
      handleVisible(false)
    }
  }

  const handleAddPanel: React.MouseEventHandler = ev => {
    ev.stopPropagation()
    ev.preventDefault()
    treeStore.setCurTreeNode(node)
    shareModuleStore.setAddPanelShow(true)
  }

  const handleCopy = () => {
    treeStore.copyTreeNode(node)
  }

  return (
    <Popconfirm
      onVisibleChange={handleVisible}
      destroyTooltipOnHide={{keepParent: false}}
      {...popcconfirmProps}
      placement={'rightTop'}
      title={<EditPanel node={node} />}
      okButtonProps={{
        size: 'large',
      }}
      cancelButtonProps={{
        size: 'large',
      }}
      visible={showPanel}
      disabled={true}
      icon={null}
      okText={isFromTree ? '修改并保存' : '确定并保存'}
      cancelText="取消"
      onCancel={handleCancel}
      onConfirm={(ev: any) => {
        ev.stopPropagation()
        ev.preventDefault()
        handleConfirm(node)
      }}
      overlayClassName={classNames(popcconfirmProps?.overlayClassName, style.popconfirm)}>
      <div className={classNames(style.item, isActive && style.active)} onClick={handleClick}>
        {isFromTree && showId && <div className={style.id}>ID: {treeNode.id}</div>}
        <style>{`
            .ant-popover {
              z-index:0;
            }
          `}</style>
        <div
          className={style.content}
          onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleClick(ev)
            setShowPanel(true)
          }}>
          <Tooltip className={style.name} title={node.defined?.description || node.name}>
            {node.name}
          </Tooltip>
          {/* <p className={style.name}>
            {node.defined?.description && node.defined?.description !== node.name && (
              <span>({node.defined?.description})</span>
            )}
          </p> */}
          {isSlotsChild && <span onClick={handleAddPanel}>点击添加导航内容</span>}
        </div>
        {isFromTree && (
          <Dropdown
            trigger={['hover']}
            overlay={
              <Menu>
                {node.defined?.slots && (
                  <Menu.Item key={'add-sub'}>
                    <span onClick={handleAddSub}>添加导航节点</span>
                  </Menu.Item>
                )}
                {/* <Menu.Item key={'copy'} onClick={handleCopy}>
                  <span>复制</span>
                </Menu.Item> */}
                <Menu.Item key={'delete'} onClick={handleDelete}>
                  <span>删除</span>
                </Menu.Item>
              </Menu>
            }>
            <div className={style.control}>
              <MoreOutlined size={100} />
            </div>
          </Dropdown>
        )}
      </div>
    </Popconfirm>
  )
})
