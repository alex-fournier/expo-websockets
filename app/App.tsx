import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native'
import { MD3LightTheme, PaperProvider } from 'react-native-paper'
import { Header } from './components/Header'
import { AppContextProvider } from './context/AppContext'
import { Conversation } from './components/Conversation'
import { Editor } from './components/Editor'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MD3LightTheme.colors.primaryContainer,
  },
})

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <AppContextProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.container}>
            <Header />
            <Conversation />
            <Editor />
          </View>
        </KeyboardAvoidingView>
      </AppContextProvider>
    </PaperProvider>
  )
}
