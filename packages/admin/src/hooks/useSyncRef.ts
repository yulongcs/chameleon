import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'

/**
 * 值同步 ref
 * @param initialState
 */
function useSyncRef<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>, React.RefObject<T>] {
  const [state, setState] = useState<T>(initialState)
  const ref = useRef<T>(state)

  const syncSetState = (val: SetStateAction<T>) => {
    setState(val)
    ref.current = typeof val === 'function' ? (val as any)() : val
  }

  useEffect(() => {
    ref.current = state
  }, [state])

  return [state, syncSetState, ref]
}

export default useSyncRef
