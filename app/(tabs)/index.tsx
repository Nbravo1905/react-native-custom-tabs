import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Text style={{ fontFamily: 'SpaceMono', color: '#fff', fontSize: 16 }}> Home Page</Text>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00798C'
  }
})