import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '@/constants/Icon'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

type Props = {
  onPress: (event: GestureResponderEvent) => void,
  onLongPress: (event: GestureResponderEvent) => void,
  isFocused: boolean,
  routeName: string,
  color: string,
  label: string | any,
}

const TabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label}: Props) => {

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' 
      ? (isFocused ? 1 : 0) : isFocused, 
      {duration: 350}
    );
  }, [scale, isFocused])
  
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity
    }
  });

  const animatedIconStyle = useAnimatedStyle(() => {

    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{
        scale: scaleValue
      }],
      top
    }
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={[animatedIconStyle]}>
        {icon[routeName]({
          color: isFocused ? 'white' : '#000',
        })}
      </Animated.View>
      <Animated.Text style={[
        { color: '#000', fontSize: 12 },
        animatedTextStyle
      ]}>
        {label as string}
      </Animated.Text>
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