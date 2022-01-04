import React, {useEffect} from 'react'
import {Input} from 'antd'
import styles from './index.module.scss'

import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'

import classNames from 'classnames'

interface IProps {
  value?: any
  onChange?: (value: any) => void
  label: string
  useCenter?: boolean
}

const BorderRadius: React.FC<IProps> = props => {
  const {label, useCenter = true, value} = props

  const handleChange = () => {
    const obj = {
      top_left,
      top_right,
      bottom_left,
      bottom_right,
      center,
    }
    props.onChange && props.onChange(obj)
  }

  const [top_left, setTop_left] = React.useState('')
  const [top_right, setTop_right] = React.useState('')
  const [bottom_left, setBottom_left] = React.useState('')
  const [bottom_right, setBottom_right] = React.useState('')
  const [center, setCenter] = React.useState('')

  React.useEffect(() => {
    handleChange()
  }, [top_left, top_right, bottom_left, bottom_right, center])

  const isNullOrUndef = (v: any) => {
    return isUndefined(v) && isNull(v)
  }

  React.useEffect(() => {
    try {
      const {top_left, top_right, bottom_left, bottom_right, center} = value || {}
      if (!isNullOrUndef(top_left)) setTop_left(top_left)
      if (!isNullOrUndef(top_right)) setTop_right(top_right)
      if (!isNullOrUndef(bottom_left)) setBottom_left(bottom_left)
      if (!isNullOrUndef(bottom_right)) setBottom_right(bottom_right)
      const isEqual = Object.values(value || {}).every((val, i, arr) => val === arr[0])
      if (isEqual) setCenter(bottom_right)
    } catch (err) {}
  }, [])

  const strategyMap: any = {
    top_left: setTop_left,
    top_right: setTop_right,
    bottom_left: setBottom_left,
    bottom_right: setBottom_right,
    center: setCenter,
  }

  const onChange = (value: string, mode: string) => {
    const fn = strategyMap[mode]
    if (mode !== 'center' && fn) {
      fn(value)
      return
    }
    if (mode === 'center' && useCenter) {
      Object.entries(strategyMap).forEach(([key, fn]) => {
        if (typeof fn === 'function') fn(value)
      })
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <div className={styles.box}>
        <div className={classNames(styles.item, styles.top_left)}>
          <Input
            value={top_left}
            onChange={evt => {
              onChange(evt.target.value, 'top_left')
            }}
            placeholder="top-left"
          />
        </div>
        <div className={classNames(styles.item, styles.top_right)}>
          <Input
            value={top_right}
            onChange={evt => {
              onChange(evt.target.value, 'top_right')
            }}
            placeholder="top-right"
          />
        </div>

        <div className={classNames(styles.item, styles.bottom_left)}>
          <Input
            value={bottom_left}
            onChange={evt => {
              onChange(evt.target.value, 'bottom_left')
            }}
            placeholder="bottom-left"
          />
        </div>

        <div className={classNames(styles.item, styles.bottom_right)}>
          <Input
            value={bottom_right}
            onChange={evt => {
              onChange(evt.target.value, 'bottom_right')
            }}
            placeholder="bottom-right"
          />
        </div>

        {useCenter ? (
          <div className={classNames(styles.item, styles.center)}>
            <Input
              value={center}
              onChange={evt => {
                onChange(evt.target.value, 'center')
              }}
              placeholder="center"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BorderRadius
