import React, {useState} from 'react'
import style from './index.module.scss'
import {EmpPropTypes} from 'src/types/emptype'

interface HeaderRule {
  ruleSrc: string
  ruleDetailSrc: string
  imgSrc: string
}
const HeaderRule: EmpFC = (props: EmpFCProps<HeaderRule>) => {
  const {imgSrc, ruleSrc, ruleDetailSrc} = props
  const [show, setShow] = useState(false)
  return (
    <div className={style.box}>
      <img src={imgSrc} alt="" className={style.imgbox} />
      {ruleSrc && (
        <img
          src={ruleSrc}
          alt=""
          className={style.rulebg}
          onClick={() => {
            setShow(true)
          }}
        />
      )}
      {show && (
        <div className={style.rulebox}>
          <div className={style.rulebox_main}>
            <div className={style.rulebox_main_img}>
              <img src={ruleDetailSrc} alt="" />
            </div>

            <img
              className={style.rulebox_main_close}
              src={require('../assets/close.png')}
              onClick={() => {
                setShow(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

HeaderRule.empPropTypes = {
  name: 'H5头图+规则',
  defined: {
    description: 'H5头图+规则',
  },
  props: {
    imgSrc: {
      label: '头图背景1111',
      type: [EmpPropTypes.Upload],
      value: ['https://pushmiddle.bs2dl.yy.com/img/612dd171cce0a501f5f6d303'],
    },
    ruleSrc: {
      label: '规则背景',
      type: EmpPropTypes.Upload,
      value: 'https://pushmiddle.bs2dl.yy.com/img/6154700459cc8201f681b114',
    },
    ruleDetailSrc: {
      label: '规则内容图',
      type: EmpPropTypes.Upload,
      value: 'https://pushmiddle.bs2dl.yy.com/img/612dd171cce0a501f5f6d303',
    },
  },
}

export default HeaderRule
