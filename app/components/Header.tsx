import { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, MD3LightTheme } from 'react-native-paper'
import { NicknameDialog } from './NicknameDialog'
import { AppContext } from '../context/AppContext'

const styles = StyleSheet.create({
  container: {
    backgroundColor: MD3LightTheme.colors.primaryContainer,
  },
})

export const Header = () => {
  const [visible, setVisible] = useState(false)
  const { nickname } = useContext(AppContext)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  return (
    <>
      <Appbar.Header style={styles.container}>
        <Appbar.Content title={nickname} />
        <Appbar.Action icon="account-edit-outline" onPress={showDialog} />
      </Appbar.Header>
      <NicknameDialog visible={visible} onDismiss={hideDialog} />
    </>
  )
}
