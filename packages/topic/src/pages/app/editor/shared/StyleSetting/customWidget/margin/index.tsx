import React from 'react'
import InputGroup from '../inputGroup'

interface IProps {
  value?: string
  onChange?: (value: string) => void
}

const Margin: React.FC<IProps> = props => {
  const handleChange = (obj: any) => {
    const {top = 0, left = 0, right = 0, bottom = 0, center = 0} = obj
    const arr = [top, right, bottom, left]

    const flag = arr.every(r => r && r?.replace(/(^\s+)|(\s+$)/g, '') === '')

    const margin = flag ? '' : arr.join(' ')

    props.onChange && props.onChange(margin)
  }

  // console.warn('Margin value', props.value)

  return <InputGroup onChange={handleChange} value={props?.value || ''} label="外边距:"></InputGroup>
}

export default Margin
