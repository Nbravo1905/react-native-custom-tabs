import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { icon } from '@/constants/Icon'

type Props = {
  onPress: (event: GestureResponderEvent) => void,
  onLongPress: (event: GestureResponderEvent) => void,
  isFocused: boolean,
  routeName: string,
  color: string,
  label: string | any,
}

const TabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label}: Props) => {

  

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      {icon[routeName]({
        color: isFocused ? '#673ab7' : '#222',
      })}
      <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
        {label as string}
      </Text>
    </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  }
})