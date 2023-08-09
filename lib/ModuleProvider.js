import { createContext, useContext } from 'react'

const ModuleContext = createContext()

export function useModule() {
  return useContext(ModuleContext)
}

export default function ModuleProvider({ value, children }) {
  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  )
}
