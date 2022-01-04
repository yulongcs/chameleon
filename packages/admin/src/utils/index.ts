import {Modal} from 'antd'

export function confirm(content: string, title?: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      title,
      content,
      onOk: () => resolve(),
      onCancel: () => reject(),
    })
  })
}
