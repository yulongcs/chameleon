import React, {useState} from 'react'

/**
 * 合并对象 state
 * @param initialState
 */
const useLegacyState = <S>(initialState: S | (() => S)): [S, (state: Partial<S>) => void] => {
  const [state, setState] = useState(initialState)

  const setLegacyState = (nextState: Partial<S>) => {
    setState(prevState => ({...prevState, ...nextState}))
  }

  return [state, setLegacyState]
}

export default useLegacyState
