import { FC, useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { MD3LightTheme, TextInput } from 'react-native-paper'
import { AppContext } from '../context/AppContext'
import { getRandomId } from '../utils/random'
import { useWebSockets } from '../hooks/useWebSockets'
import { Message } from '../types'

const styles = StyleSheet.create({
  container: {
    backgroundColor: MD3LightTheme.colors.primaryContainer,
    marginBottom: 32,
  },
  textInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'transparent',
  },
})

export const Editor: FC = () => {
  const { addMessage, nickname } = useContext(AppContext)
  const [value, setValue] = useState('')
  const sendMessage = useWebSockets()

  const handleSendMessage = () => {
    const message: Message = { id: getRandomId(), me: false, author: nickname, text: value }
    sendMessage(message)
    addMessage({ ...message, me: true })
    setValue('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoComplete="off"
        mode="outlined"
        value={value}
        right={<TextInput.Icon icon="send" disabled={value === ''} onPress={handleSendMessage} />}
        style={styles.textInput}
        onChangeText={setValue}
      />
    </View>
  )
}
