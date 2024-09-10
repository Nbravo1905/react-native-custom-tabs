import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {

  const [dimensions, setDimensions] = useState({width: 100, height: 20});

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyleBg = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: tabPositionX.value
      }]
    }
  })

  return (
    <View onLayout={onTabbarLayout} style={styles.tabBar}>
      <Animated.View 
        style={[animatedStyleBg, {
          position: 'absolute',
          backgroundColor: '#723FEB',
          borderRadius: 30,
          marginHorizontal: 12,
          height: dimensions.height - 15,
          width: buttonWidth - 25
        }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 1500});

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton 
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={ isFocused ? 'white' : '#222'}
            label={label}
          />
          /* <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {icon[route.name]({
              color: isFocused ? '#673ab7' : '#222',
            })}
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label as string}
            </Text>
          </TouchableOpacity> */
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  }
});