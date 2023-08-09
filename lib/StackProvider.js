import { createContext, useContext } from 'react'

const StackContext = createContext()

export function useStack() {
  return useContext(StackContext)
}

export default function StackProvider({ value, children }) {
  return (
    <StackContext.Provider value={value}>
      {children}
    </StackContext.Provider>
  )
}
