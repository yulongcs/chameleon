import {ChangeEvent, useState} from 'react'

export type Modify<T> = 'trim' | 'number' | ((value: any) => T)

/**
 * onChange Event state
 * @param initialState
 * @param modify
 */
const useInputChange = <T>(
  initialState: T | (() => T),
  modify?: Modify<T>,
): [T, (event: ChangeEvent<HTMLInputElement>) => void, any] => {
  const [value, setValue] = useState<T>(initialState)
  const changeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    let val: any = event.target.value
    console.log('changeEvent', val, event)
    if (modify === 'trim') {
      val = val.trim()
    } else if (modify === 'number') {
      val = Number(val)
    } else if (typeof modify === 'function') {
      val = modify(val)
    }
    setValue(val)
  }
  return [value, changeEvent, setValue]
}

export default useInputChange
