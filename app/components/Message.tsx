import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'

interface Props {
  me?: boolean
  author: string
  text: string
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  containerMe: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(200, 255, 206)',
  },
})

export const Message: FC<Props> = ({ me, author, text }) => {
  return (
    <Card style={[styles.container, me && styles.containerMe]}>
      <Card.Content>
        {!me && <Text variant="titleMedium">{author}</Text>}
        <Text variant="bodyMedium">{text}</Text>
      </Card.Content>
    </Card>
  )
}
