import AsyncStorage from '@react-native-async-storage/async-storage'
import { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import randomString from 'randomstring'
import { Storage } from '../enums/Storage'
import { Message } from '../types'

interface Props {
  children: ReactNode
}

interface AppContextType {
  nickname: string
  updateNickname: (nickname: string) => void
  messages: Message[]
  addMessage: (message: Message) => void
}

const randomStringOpts = {
  length: 4,
  readable: true,
  charset: 'hex',
}

const dummyMessages: Message[] = [
  { id: 1, author: 'Alex', text: 'Bonjour, ça va ?' },
  { id: 2, author: 'Magela', text: 'Tranquille et toi ?' },
  { id: 3, author: 'Thomas', text: 'Bien bien' },
  { id: 5, author: 'Alex', text: 'Super !' },
  { id: 4, author: 'Magela', text: 'Vous avez valider MOBP-4242 ?' },
  { id: 6, author: 'Thomas', text: "Yes c'est bon" },
  { id: 7, author: 'Alex', text: 'Top !' },
]

const defaultContext: AppContextType = {
  nickname: `user#${randomString.generate(randomStringOpts)}`,
  updateNickname: () => {},
  // messages: [],
  messages: dummyMessages,
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
