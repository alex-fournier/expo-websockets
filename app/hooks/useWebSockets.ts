import { useContext, useEffect, useRef } from 'react'
import { Message } from '../types'
import { AppContext } from '../context/AppContext'
import { Platform } from 'react-native'

const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'
const WS_URL = `ws://${host}:8080`

export function useWebSockets() {
  const { addMessage } = useContext(AppContext)
  const ws = useRef<WebSocket>()

  useEffect(() => {
    ws.current = new WebSocket(WS_URL)

    ws.current.onmessage = (e) => {
      addMessage(JSON.parse(e.data))
    }

    ws.current.onclose = (e) => {
      console.log(e.code, e.reason)
    }
  }, [])

  const sendMessage = (message: Message) => {
    ws.current?.send(JSON.stringify(message))
  }

  return sendMessage
}
