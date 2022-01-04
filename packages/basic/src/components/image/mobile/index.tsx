import React from 'react'
import style from './index.module.scss'
import {observer} from 'mobx-react'
import {EmpPropTypes} from 'src/types/emptype'
type Props = {
  imgSrc: string
}

const Image: EmpFC<Props> = ({imgSrc, env, device, children, mock}: EmpFCProps<Props>) => {
  return <img src={imgSrc} alt="" className={style.box} />
}

Image.empPropTypes = {
  name: 'H5图片',
  defined: {
    description: '适用H5',
  },
  props: {
    imgSrc: {
      label: '图片地址',
      type: EmpPropTypes.Upload,
      value: 'https://pushmiddle.bs2dl.yy.com/img/612dd171cce0a501f5f6d303',
      // extendConfig: {
      //   url: './image/mobile/indexconfig',
      //   name: '',
      // },
    },
  },
}

export default observer(Image)
