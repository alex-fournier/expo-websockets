import { FC, useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { AppContext } from '../context/AppContext'

interface Props {
  visible: boolean
  onDismiss: () => void
}

const styles = StyleSheet.create({
  dialog: {
    marginTop: -200,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
})

export const NicknameDialog: FC<Props> = ({ visible, onDismiss }) => {
  const { nickname, updateNickname } = useContext(AppContext)
  const [value, setValue] = useState(nickname)

  useEffect(() => {
    if (visible) {
      setValue(nickname)
    }
  }, [visible])

  const onDone = () => {
    updateNickname(value)
    onDismiss()
  }

  return (
    <Portal>
      <Dialog visible={visible} style={styles.dialog} onDismiss={onDismiss}>
        <Dialog.Title>Nickname</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus
            autoComplete="off"
            autoCorrect={false}
            mode="outlined"
            returnKeyType="done"
            left={<TextInput.Icon icon="account-outline" />}
            value={value}
            onChangeText={setValue}
            style={styles.textInput}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDone}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
