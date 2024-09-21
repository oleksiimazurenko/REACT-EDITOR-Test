'use client'

import { makeStore } from '@/lib/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

type StoreProviderProps = {
  children: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const { store, persistor } = useRef(makeStore()).current

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}