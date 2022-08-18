
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Dashboard({ route, navigation }) {
  const { username } = route.params;
  return (
    <View style={styles.das}>
      <Text>Welcome {username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
das:{
  flex: 1,
  justifyContent: 'center'
}

})