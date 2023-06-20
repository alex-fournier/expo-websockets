import AsyncStorage from '@react-native-async-storage/async-storage'
import { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { Storage } from '../enums/Storage'
import { Message } from '../types'
import { getRandomNickname } from '../utils/random'

interface Props {
  children: ReactNode
}

interface AppContextType {
  nickname: string
  updateNickname: (nickname: string) => void
  messages: Message[]
  addMessage: (message: Message) => void
}

const defaultContext: AppContextType = {
  nickname: getRandomNickname(),
  updateNickname: () => {},
  messages: [],
  addMessage: () => {},
}

export const AppContext = createContext<AppContextType>(defaultContext)

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [nickname, setNickname] = useState(defaultContext.nickname)
  const [messages, setMessages] = useState(defaultContext.messages)

  useEffect(() => {
    AsyncStorage.getItem(Storage.Nickname).then((value) => {
      if (value !== null) {
        setNickname(value)
      } else {
        AsyncStorage.setItem(Storage.Nickname, nickname)
      }
    })
  }, [])

  const updateNickname = (nickname: string) => {
    if (!nickname) {
      return
    }

    setNickname(nickname)
    AsyncStorage.setItem(Storage.Nickname, nickname)
  }

  const addMessage = (message: Message) => {
    setMessages((messages) => [...messages, message])
  }

  const value = useMemo(
    () => ({ nickname, updateNickname, messages, addMessage }),
    [nickname, updateNickname, messages, addMessage],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
