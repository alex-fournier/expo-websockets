import { FC, useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { MD3LightTheme, TextInput } from 'react-native-paper'
import { AppContext } from '../context/AppContext'
import randomString from 'randomstring'

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

  const handleSendMessage = () => {
    addMessage({ id: randomString.generate(), me: true, author: nickname, text: value })
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
