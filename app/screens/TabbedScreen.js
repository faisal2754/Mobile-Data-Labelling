import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'

const Tab = createBottomTabNavigator()

function TabbedScreen() {
   return (
      <Tab.Navigator>
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
   )
}

export default TabbedScreen
