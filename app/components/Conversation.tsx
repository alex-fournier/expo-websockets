import { useContext, useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Message } from './Message'
import { AppContext } from '../context/AppContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 239, 255)',
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
})

export const Conversation = () => {
  const { messages } = useContext(AppContext)
  const scrollViewRef = useRef<ScrollView>()

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
    >
      {messages.map(({ id, me, author, text }) => (
        <Message key={id} me={me} author={author} text={text} />
      ))}
    </ScrollView>
  )
}
