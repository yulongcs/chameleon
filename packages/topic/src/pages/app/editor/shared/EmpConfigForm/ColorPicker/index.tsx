/*
 * @Description:
 * @Author: hejilun
 * @Date: 2021-02-25 14:22:00
 * @LastEditors: hejilun
 * @LastEditTime: 2021-03-01 11:32:55
 */
import React, {useState, useCallback} from 'react'
import {SketchPicker, ColorResult} from 'react-color'
import style from './index.module.scss'

type colorType = keyof Omit<ColorResult, 'hsl'>

type RbgColor = ColorResult['rgb']

const presetColors = [
  {
    color: 'TRANSPARENT',
    title: 'clear',
  },
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
]

interface Props<T extends colorType> {
  type: T
  defaultValue?: ColorResult[T]
  value?: ColorResult[T]
  onChange?: (value: ColorResult[T]) => void
}

const ColorPicker: <T extends colorType>({type, defaultValue, value, onChange}: Props<T>) => JSX.Element = <
  T extends colorType,
>({
  type,
  defaultValue,
  value,
  onChange,
}: Props<T>) => {
  type = type || 'hex'
  const isHex = type === 'hex'
  const color = value || defaultValue || (isHex ? '#fff' : {r: 255, g: 255, b: 255, a: 1})
  const bg = isHex
    ? (color as string)
    : `rgba(${(color as RbgColor).r},${(color as RbgColor).g},${(color as RbgColor).b},${(color as RbgColor).a})`
  const [display, setDisplay] = useState(false)
  const handleChange = (color: ColorResult) => {
    onChange?.(color[type])
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <div className={style.swatch} onClick={() => setDisplay(true)}>
        <div className={style.color} style={{background: bg}} />
      </div>
      {display ? (
        <div className={style.popover}>
          <div className={style.cover} onClick={() => setDisplay(false)} />
          <div className={style.picker}>
            <SketchPicker color={color} onChange={handleChange} disableAlpha={isHex} presetColors={presetColors} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ColorPicker
