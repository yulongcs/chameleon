import React, {useEffect} from 'react'
import {Input} from 'antd'
import styles from './index.module.scss'

import classNames from 'classnames'

interface IProps {
  value?: string
  onChange?: (value: any) => void
  label: string
  useCenter?: boolean
}

const InputGroup: React.FC<IProps> = props => {
  const {label, useCenter = true, value} = props

  const handleChange = () => {
    const obj = {
      top,
      left,
      right,
      bottom,
      center,
    }
    props.onChange && props.onChange(obj)
  }

  const [top, setTop] = React.useState('0')
  const [left, setLeft] = React.useState('0')
  const [right, setRight] = React.useState('0')
  const [bottom, setBottom] = React.useState('0')
  const [center, setCenter] = React.useState('0')

  React.useEffect(() => {
    handleChange()
  }, [top, left, right, bottom, center])

  React.useEffect(() => {
    if (typeof value === 'string') {
      const arr: any[] = value.split(' ')
      if (arr.length === 4) {
        const [t, r, b, l] = arr
        setTop(t)
        setRight(r)
        setBottom(b)
        setLeft(l)
        const isEqual = Math.max.apply(null, arr) === Math.min.apply(null, arr)
        if (isEqual) {
          setCenter(l)
        }
      }
    }
  }, [])

  const strategyMap: any = {
    top: setTop,
    left: setLeft,
    right: setRight,
    bottom: setBottom,
    center: setCenter,
  }
  const onChange = (value: string, mode: string) => {
    const fn = strategyMap[mode]
    if (mode !== 'center') {
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
        <div className={classNames(styles.item, styles.top)}>
          <Input
            value={top}
            onChange={evt => {
              onChange(evt.target.value, 'top')
            }}
            placeholder="top"
          />
        </div>
        <div className={classNames(styles.item, styles.left)}>
          <Input
            value={left}
            onChange={evt => {
              onChange(evt.target.value, 'left')
            }}
            placeholder="left"
          />
        </div>

        <div className={classNames(styles.item, styles.right)}>
          <Input
            value={right}
            onChange={evt => {
              onChange(evt.target.value, 'right')
            }}
            placeholder="right"
          />
        </div>

        <div className={classNames(styles.item, styles.bottom)}>
          <Input
            value={bottom}
            onChange={evt => {
              onChange(evt.target.value, 'bottom')
            }}
            placeholder="bottom"
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

export default InputGroup
