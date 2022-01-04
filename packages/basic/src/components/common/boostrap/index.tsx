import React from 'react'
import {EnumDevice} from 'src/types/emptype'

const Bootstrap = (
  props: EmpFCProps<T>,
  PcComponent: React.LazyExoticComponent<EmpFC<T>>,
  MobileComponent: React.LazyExoticComponent<EmpFC<T>>,
) => {
  const {device} = props
  return <>{device === EnumDevice.pc ? <PcComponent {...props} /> : <MobileComponent {...props} />}</>
}

export default Bootstrap
