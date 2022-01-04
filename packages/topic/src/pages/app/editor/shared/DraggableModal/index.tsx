import {Modal, Button, ModalFuncProps} from 'antd'
import Draggable, {DraggableEventHandler} from 'react-draggable'
import React from 'react'
import {ANTD_POPOVER_Z_INDEX} from 'src/helpers/antdConst'
const Z_INDEX = ANTD_POPOVER_Z_INDEX
export class DraggableModal extends React.Component<ModalFuncProps> {
  state = {
    disabled: true,
    bounds: {left: 0, top: 0, bottom: 0, right: 0},
  }

  draggleRef = React.createRef<HTMLDivElement>()

  onStart: DraggableEventHandler = (event, uiData) => {
    const {clientWidth, clientHeight} = window?.document?.documentElement
    const targetRect = this.draggleRef?.current?.getBoundingClientRect()
    this.setState({
      bounds: {
        left: -(targetRect?.left || 0) + uiData?.x,
        right: clientWidth - ((targetRect?.right || 0) - uiData?.x),
        top: -(targetRect?.top || 0) + uiData?.y,
        bottom: clientHeight - ((targetRect?.bottom || 0) - uiData?.y),
      },
    })
  }

  render() {
    const {bounds, disabled} = this.state
    const {title, ...otherProps} = this.props
    return (
      <>
        <Modal
          zIndex={Z_INDEX + 1}
          mask={false}
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={(ev: React.MouseEvent) => {
                ev.stopPropagation()
                ev.preventDefault()
                if (disabled) {
                  this.setState({
                    disabled: false,
                  })
                }
              }}
              onMouseOut={(ev: React.MouseEvent) => {
                ev.stopPropagation()
                ev.preventDefault()
                this.setState({
                  disabled: true,
                })
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              {title}
            </div>
          }
          modalRender={modal => (
            <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => this.onStart(event, uiData)}>
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
          {...otherProps}></Modal>
      </>
    )
  }
}
