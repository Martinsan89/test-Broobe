import React, {useState} from 'react'
import { TokenContext } from './TokenContext'

export const TokenProvider = ({children}) => {

    const [token, setToken] = useState('')

    window.localStorage.setItem('token', token)

    

  return (
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  )
}

