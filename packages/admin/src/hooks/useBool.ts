import React, {useState} from 'react'
import useSyncRef from './useSyncRef'

export interface Handler {
  show: () => any
  hide: () => any
  change: () => any
}

/**
 * bool 值变化封装
 * @param initialValue
 */
function useBool(initialValue: boolean | (() => boolean)): [boolean, Handler, React.RefObject<boolean>] {
  const [value, syncSetState, ref] = useSyncRef<boolean>(initialValue)
  const show = () => syncSetState(true)
  const hide = () => syncSetState(false)
  const change = () => syncSetState(val => !val)
  const handler: Handler = {
    show,
    hide,
    change,
  }

  return [value, handler, ref]
}

export default useBool
