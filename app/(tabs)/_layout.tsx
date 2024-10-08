import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

type Props = {}

const TabLayout = (props: Props) => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='explore' options={{ title: 'Explore' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    </Tabs>
  )
}

export default TabLayout;