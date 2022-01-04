import {Button, Col, Popconfirm, Row, Space, Switch, Tooltip, Modal, Spin, Popover, Input, message} from 'antd'
import {Header} from 'antd/lib/layout/layout'
import React, {useRef} from 'react'
import pageStore from 'src/stores/page'
import style from './index.module.scss'
import {
  MinusOutlined,
  PlusOutlined,
  IeOutlined,
  MobileOutlined,
  BorderOuterOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {EnumDevice, EnumPlatformEnv} from 'src/types/type'
import {observer} from 'mobx-react'
import {getIframeUrl, getIframeUrlProd} from 'src/helpers/urlUtil'
import userStore from 'src/stores/user'
import Avatar from 'antd/lib/avatar/avatar'
import langStore from 'src/stores/page/lang'
import editorStore from 'src/stores/page/editor'
import {baiduEventReport} from 'src/helpers/report/baiduReport'
import combineLogin from 'src/helpers/combineLogin'
import {DefaultDesizeSize} from 'src/engineModule/utils/flexibleHelper'
import InputParamsComponent from './inputparams'
import LibraryIndex from './library'
import {saveActivities} from '../../../../helpers/activiesItem/saveActivities'
import {getPageById} from 'src/stores/page/api'
const EditHeader = ({
  onChangeIframeSize,
  onReloadIframe,
}: {
  onChangeIframeSize: (isAdd: boolean) => void
  onReloadIframe: () => void
}) => {
  const deviceDesignSizeRef = useRef(pageStore.renderData.designSize || DefaultDesizeSize(pageStore.device))

  const onClickAction = async (type: string | EnumDevice, save = true) => {
    switch (type) {
      case 'increase': {
        onChangeIframeSize(true)
        break
      }
      case 'decrease': {
        onChangeIframeSize(false)
        break
      }
      default: {
        const modal = Modal.success({
          content: <Spin tip="切换中..."></Spin>,
        })
        if (save) {
          await editorStore.updatePageContentById()
          await langStore.save()
        }
        await pageStore.setDevice(type as EnumDevice)
        await pageStore.setRenderDataByDevice()
        modal.destroy()
        onReloadIframe()
        break
      }
    }
  }

  const SwitchIcon = (type: EnumDevice) => {
    let checked = false
    let deviceData = null
    let typeValue = ''
    switch (type) {
      case EnumDevice.pc: {
        deviceData = pageStore.pageContent?.pc
        typeValue = 'PC端'
        break
      }
      case EnumDevice.mobile: {
        deviceData = pageStore.pageContent?.mobile
        typeValue = 'H5'
        break
      }
      case EnumDevice.other: {
        deviceData = pageStore.pageContent?.other
        typeValue = '活动条'
        break
      }
    }
    if (deviceData) {
      checked = deviceData?.test?.status || false
      return (
        <Switch
          checkedChildren={`关闭${typeValue}`}
          unCheckedChildren={`开启${typeValue}`}
          checked={checked}
          onChange={async (status: boolean, ev: MouseEvent) => {
            await editorStore.updateDeviceStatus(type, status)
            await onClickAction(type)
            onReloadIframe()
          }}
        />
      )
    }
  }

  const getDeviceStatus = (type: EnumDevice) => {
    return pageStore.pageContent[type]?.test?.status
  }
  const urlCopy = (device: any) => {
    const url = getIframeUrlProd(pageStore.id, device)
    const inputElement: any = document.querySelector('input')
    inputElement.value = url
    inputElement.select()
    document.execCommand('copy')
    message.success(`复制成功：${url},两秒后自动跳转`)
    const id = setTimeout(() => {
      window.open(url, '_blank')
      clearTimeout(id)
    }, 2000)
  }
  const renderPreviewComponent = () => {
    const content = () => {
      return (
        <>
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                const url = getIframeUrl(pageStore.id, {env: EnumPlatformEnv.test, device: EnumDevice.pc})
                window.open(url, '_blank')
              }}>
              预览PC
            </Button>
          </Row>
          <br />
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                const url = getIframeUrl(pageStore.id, {env: EnumPlatformEnv.test, device: EnumDevice.mobile})
                window.open(url, '_blank')
              }}>
              预览H5
            </Button>
          </Row>
          <br />
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                const url = getIframeUrl(pageStore.id, {env: EnumPlatformEnv.test, device: EnumDevice.other})
                window.open(url, '_blank')
              }}>
              预览活动条或小屏
            </Button>
          </Row>
          <br />
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                urlCopy({device: EnumDevice.pc})
              }}>
              获取线上PC地址
            </Button>
          </Row>
          <br />
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                urlCopy({device: EnumDevice.mobile})
              }}>
              获取线上H5地址
            </Button>
          </Row>
          <br />
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                urlCopy({device: EnumDevice.other})
              }}>
              获取线上活动条地址
            </Button>
          </Row>
          <br />
          <Row>
            <Button
              size={'small'}
              type="link"
              onClick={() => {
                urlCopy({})
              }}>
              获取线上H5 PC地址
            </Button>
          </Row>
        </>
      )
    }
    return (
      <Popover content={content}>
        <Button
          size={'small'}
          type="dashed"
          onClick={() => {
            // const url = getIframeUrl(pageStore.id, {env: EnumPlatformEnv.test})
            // window.open(url, '_blank')
          }}>
          预览
        </Button>
      </Popover>
    )
  }

  const renderOtherDeviceSetting = () => {
    deviceDesignSizeRef.current = pageStore.renderData.designSize
      ? {...pageStore.renderData.designSize}
      : DefaultDesizeSize(pageStore.device)

    return (
      <>
        宽：
        <Input
          width={100}
          type={'number'}
          maxLength={4}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            deviceDesignSizeRef.current.width = Number(ev.target.value)
          }}
          placeholder="宽"
          defaultValue={pageStore.renderData.designSize?.width}></Input>
        <br />
        高：
        <Input
          width={100}
          type={'number'}
          maxLength={4}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            deviceDesignSizeRef.current.height = Number(ev.target.value)
          }}
          placeholder="高"
          defaultValue={pageStore.renderData.designSize?.height}></Input>
      </>
    )
  }

  const renderMobileDeviceSetting = () => {
    deviceDesignSizeRef.current = pageStore.renderData.designSize
      ? {...pageStore.renderData.designSize}
      : DefaultDesizeSize(pageStore.device)

    return (
      <>
        宽：
        <Input
          width={100}
          type={'number'}
          maxLength={4}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            deviceDesignSizeRef.current.width = Number(ev.target.value)
          }}
          placeholder="宽"
          defaultValue={pageStore.renderData.designSize?.width}></Input>
        {/* <br />
        高：
        <Input
          width={100}
          type={'number'}
          maxLength={4}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            deviceDesignSizeRef.current.height = Number(ev.target.value)
          }}
          placeholder="高"
          defaultValue={pageStore.renderData.designSize?.height}></Input> */}
      </>
    )
  }

  const renderPcDeviceSetting = () => {
    deviceDesignSizeRef.current = pageStore.renderData.designSize
      ? {...pageStore.renderData.designSize}
      : DefaultDesizeSize(pageStore.device)

    return (
      <>
        宽：
        <Input
          width={100}
          type={'number'}
          maxLength={4}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            deviceDesignSizeRef.current.width = Number(ev.target.value)
          }}
          placeholder="宽"
          defaultValue={pageStore.renderData.designSize?.width}></Input>
        {/* <br />
        高：
        <Input
          width={100}
          type={'number'}
          maxLength={4}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            deviceDesignSizeRef.current.height = Number(ev.target.value)
          }}
          placeholder="高"
          defaultValue={pageStore.renderData.designSize?.height}></Input> */}
      </>
    )
  }
  return (
    <Header className={style.header}>
      <Row align="middle" justify="start" style={{overflow: 'hidden', minWidth: '1200px'}}>
        <Col span={3} style={{whiteSpace: 'nowrap'}}>
          <Tooltip
            placement="left"
            title={`${pageStore.pageContent?.pageInfo?.pageName} - ${pageStore.device} - ${pageStore.contentEnv}`}>
            {pageStore.pageContent?.pageInfo?.pageName} - {pageStore.device} - {pageStore.contentEnv}
          </Tooltip>
        </Col>
        <Col span={5}>
          <InputParamsComponent onRefresh={onReloadIframe} id={pageStore.id} />
        </Col>
        <Col span={8}>
          <Space>
            <Button
              onClick={() => {
                onClickAction('decrease')
              }}
              icon={<MinusOutlined />}></Button>

            <Button
              onClick={() => {
                onClickAction('increase')
              }}
              icon={<PlusOutlined />}></Button>

            <Popconfirm
              placement="bottom"
              disabled={EnumDevice.pc === pageStore.device || !pageStore.pageContent.pc?.test?.status}
              title={'切换需要先保存。'}
              onConfirm={async () => {
                getDeviceStatus(EnumDevice.pc) && onClickAction(EnumDevice.pc)
              }}
              onCancel={() => {
                getDeviceStatus(EnumDevice.pc) && onClickAction(EnumDevice.pc, false)
              }}
              okText="保存并切换"
              cancelText="不保存切换">
              <Tooltip placement="left" title={SwitchIcon(EnumDevice.pc)}>
                <Button
                  disabled={!getDeviceStatus(EnumDevice.pc)}
                  icon={<IeOutlined />}
                  type={(pageStore.device === EnumDevice.pc && 'primary') || 'default'}></Button>
              </Tooltip>
            </Popconfirm>

            <Popconfirm
              placement="bottom"
              title={'切换需要先保存。'}
              disabled={EnumDevice.mobile === pageStore.device || !pageStore.pageContent.mobile?.test?.status}
              onConfirm={async () => {
                getDeviceStatus(EnumDevice.mobile) && onClickAction(EnumDevice.mobile)
              }}
              onCancel={() => {
                getDeviceStatus(EnumDevice.mobile) && onClickAction(EnumDevice.mobile, false)
              }}
              okText="保存并切换"
              cancelText="不保存切换">
              <Tooltip placement="left" title={SwitchIcon(EnumDevice.mobile)}>
                <Button
                  disabled={!getDeviceStatus(EnumDevice.mobile)}
                  icon={<MobileOutlined />}
                  type={(pageStore.device === EnumDevice.mobile && 'primary') || 'default'}></Button>
              </Tooltip>
            </Popconfirm>

            <Popconfirm
              placement="bottom"
              title={'切换需要先保存。'}
              disabled={EnumDevice.other === pageStore.device || !pageStore.pageContent.other?.test?.status}
              onConfirm={async () => {
                getDeviceStatus(EnumDevice.other) && onClickAction(EnumDevice.other)
              }}
              onCancel={() => {
                getDeviceStatus(EnumDevice.other) && onClickAction(EnumDevice.other, false)
              }}
              okText="保存并切换"
              cancelText="不保存切换">
              <Tooltip placement="left" title={SwitchIcon(EnumDevice.other)}>
                <Button
                  disabled={!getDeviceStatus(EnumDevice.other)}
                  icon={<BorderOuterOutlined />}
                  type={(pageStore.device === EnumDevice.other && 'primary') || 'default'}></Button>
              </Tooltip>
            </Popconfirm>

            {pageStore.device === EnumDevice.other && (
              <Popconfirm
                style={{height: '46px'}}
                icon={<MobileOutlined />}
                placement="bottom"
                title={renderOtherDeviceSetting()}
                onConfirm={() => {
                  editorStore.updateDesignSize(deviceDesignSizeRef.current)
                }}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{height: '18px', lineHeight: '18px'}}>
                    宽：{pageStore.renderData.designSize?.width}px
                  </span>
                  <span style={{height: '18px', lineHeight: '18px'}}>
                    高：{pageStore.renderData.designSize?.height}px
                  </span>
                </div>
              </Popconfirm>
            )}
            {pageStore.device === EnumDevice.other && (
              <Switch
                style={{height: '18px', lineHeight: '18px'}}
                checkedChildren={`兼容开启`}
                unCheckedChildren={`兼容关闭`}
                checked={pageStore.renderData.openScale}
                onChange={async (status: boolean, ev: MouseEvent) => {
                  await editorStore.updateCssOpenTransformScale(EnumDevice.other, status)
                }}></Switch>
            )}

            {pageStore.device === EnumDevice.pc && (
              <Popconfirm
                style={{height: '46px'}}
                icon={<MobileOutlined />}
                placement="bottom"
                title={renderPcDeviceSetting()}
                onConfirm={() => {
                  editorStore.updateDesignSize(deviceDesignSizeRef.current)
                }}>
                <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
                  <span style={{height: '18px', lineHeight: '18px'}}>
                    宽：{pageStore.renderData.designSize?.width}px
                  </span>
                  {/* <span style={{height: '18px', lineHeight: '18px'}}>
                    高：{pageStore.renderData.designSize?.height}px
                  </span> */}
                </div>
              </Popconfirm>
            )}

            {pageStore.device === EnumDevice.mobile && (
              <Popconfirm
                style={{height: '46px'}}
                icon={<MobileOutlined />}
                placement="bottom"
                title={renderMobileDeviceSetting()}
                onConfirm={() => {
                  editorStore.updateDesignSize(deviceDesignSizeRef.current)
                }}>
                <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
                  <span style={{height: '18px', lineHeight: '18px'}}>
                    宽：{pageStore.renderData.designSize?.width}px
                  </span>
                  {/* <span style={{height: '18px', lineHeight: '18px'}}>
                    高：{pageStore.renderData.designSize?.height}px
                  </span> */}
                </div>
              </Popconfirm>
            )}
          </Space>
        </Col>
        <Col span={6}>
          <Space>
            {renderPreviewComponent()}
            {userStore.hasAuth && (
              <>
                <Button
                  size={'small'}
                  onClick={async () => {
                    const modal = Modal.info({
                      mask: true,
                      maskClosable: false,
                      closable: false,
                      content: <Spin tip="保存中，请稍等..."></Spin>,
                      okText: '.',
                      okType: 'link',
                    })
                    await editorStore.savePage(pageStore.id, pageStore.pageContent.v)
                    modal.destroy()
                  }}>
                  保存
                </Button>

                <Popconfirm
                  placement="bottom"
                  title={'确定发布？'}
                  onConfirm={async () => {
                    const modal = Modal.success({
                      content: <Spin tip="发布中..."></Spin>,
                    })
                    const isPublish = await saveActivities(pageStore.pageContent?.pageInfo, pageStore.id)
                    if (isPublish) {
                      await editorStore.publish()
                      await langStore.publish()
                      const {projectId, projectName, pageName} = pageStore.pageContent?.pageInfo
                      baiduEventReport([
                        `publish-${projectId}-${projectName}`,
                        `${projectId}-${projectName}`,
                        `${pageStore.id}-${pageName}`,
                      ])
                      modal.destroy()
                      message.success('发布成功')
                    } else {
                      modal.destroy()
                      message.error('发布失败')
                    }
                  }}
                  okText="Yes"
                  cancelText="No">
                  <Button size={'small'} type="primary">
                    发布
                  </Button>
                </Popconfirm>
              </>
            )}

            {!userStore.uid ? (
              <Button
                size={'small'}
                type="primary"
                onClick={() => {
                  combineLogin.login('')
                }}>
                登录
              </Button>
            ) : (
              <Tooltip
                color={'white'}
                placement="bottom"
                title={
                  <Button
                    onClick={() => {
                      combineLogin.logout()
                    }}>
                    {' '}
                    退出
                  </Button>
                }>
                <Avatar style={{backgroundColor: '#87d068', cursor: 'pointer'}} icon={<UserOutlined />} />
              </Tooltip>
            )}
          </Space>
        </Col>
        <Col span={2}>
          <LibraryIndex></LibraryIndex>
        </Col>
      </Row>
    </Header>
  )
}

export default observer(EditHeader)
