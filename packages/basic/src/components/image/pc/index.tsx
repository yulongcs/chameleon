import {observer} from 'mobx-react'
import React from 'react'
import {EmpPropTypes} from 'src/types/emptype'
import style from './index.module.scss'

type Props = {
  imgSrc: string
  options: string[]
}

const Image: EmpFC<Props> = ({imgSrc, options = [], env, device, children, mock}: EmpFCProps<Props>) => {
  const cover = options.includes('cover')
  const replaceHttp = options.includes('replaceHttp')
  return (
    <img
      src={replaceHttp ? imgSrc.replace('http', 'https') : imgSrc}
      alt=""
      className={style.box}
      style={
        cover
          ? {
              width: '100%',
              height: '100%',
            }
          : {}
      }
    />
  )
}

Image.empPropTypes = {
  name: 'PC图片',
  defined: {
    description: '适用PC',
  },
  props: {
    imgSrc: {
      label: '图片地址',
      type: EmpPropTypes.Upload,
      value: 'https://pushmiddle.bs2dl.yy.com/img/612dd171cce0a501f5f6d303',
    },
    options: {
      label: '选项',
      type: EmpPropTypes.Checkbox,
      value: [],
      options: {
        options: [
          {label: '替换http为https', value: 'replaceHttp'},
          {label: '宽高铺满', value: 'cover'},
        ],
      },
    },
  },
}

export default observer(Image)
