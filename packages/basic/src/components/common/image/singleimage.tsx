import React, {lazy} from 'react'
import {EmpPropTypes} from 'src/types/emptype'
import Bootstrap from '../boostrap'
const MobileImage = lazy(() => import('src/components/image/mobile/index'))
const PcImage = lazy(() => import('src/components/image/pc/index'))
import {observer} from 'mobx-react'
type Props = {
  imgSrc: string
}

const Image: EmpFC<Props> = (props: EmpFCProps<Props>) => {
  return <>{Bootstrap(props, PcImage, MobileImage)}</>
}

Image.empPropTypes = {
  name: '图片',
  defined: {
    description: '兼容PC、H5',
    hidden: true,
  },
  props: {
    imgSrc: {
      label: '图片地址',
      type: EmpPropTypes.Upload,
      value: 'https://pushmiddle.bs2dl.yy.com/img/612dd171cce0a501f5f6d303',
    },
  },
}

export default observer(Image)
