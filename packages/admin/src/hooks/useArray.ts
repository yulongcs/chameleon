import React, {useState} from 'react'

export interface Handle<T> {
  set: React.Dispatch<React.SetStateAction<T[]>>
  push(...items: T[]): void
  pop(): void
  unshift(...items: T[]): void
  shift(): void
  splice(start: number, deleteCount?: number): void
  splice(start: number, deleteCount: number, ...items: T[]): void
  update(predicate: (value: T, index: number, array: T[]) => unknown): void
}

function useArray<T>(initialValue: T[] | (() => T[])): [T[], Handle<T>, React.Dispatch<React.SetStateAction<T[]>>] {
  const [state, setState] = useState<T[]>(initialValue)

  const handle: Handle<T> = {
    set: setState,
    push(...items: T[]) {
      setState(prevState => [...prevState, ...items])
    },
    pop() {
      setState(prevState => {
        const newState = [...prevState]
        newState.pop()
        return newState
      })
    },
    unshift(...items) {
      setState(prevState => [...items, ...prevState])
    },
    shift() {
      setState(prevState => {
        const newState = [...prevState]
        newState.shift()
        return newState
      })
    },
    splice(start: number, deleteCount: number, ...items: T[]) {
      setState(prevState => {
        const newState = [...prevState]
        newState.splice(start, deleteCount, ...items)
        return newState
      })
    },
    update(predicate: (value: T, index: number, array: T[]) => unknown) {
      setState(prevState => {
        const newState = [...prevState]
        newState.some(predicate)
        return newState
      })
    },
  }

  return [state, handle, setState]
}

export default useArray
