import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Homepage } from '../pages/Homepage'

import colors from '../styles/colors'

const TabRoute = createBottomTabNavigator()

const AuthRoutes: React.FC = () => (
    <TabRoute.Navigator
        tabBarOptions={{
            activeTintColor: colors.dark_orange,
            inactiveTintColor: colors.soft_dark,
            style: {
                backgroundColor: colors.dark_smoke,
                borderTopWidth: 0,
                paddingVertical: 6,
                height: 60,
            },
            showLabel: false
        }}
        sceneContainerStyle={{
            backgroundColor: colors.dark
        }}
    >

        <TabRoute.Screen
            name="Homepage"
            component={Homepage}
            options={{
                tabBarIcon: ({ size, color }) => (
                    <Ionicons
                        name="home"
                        size={size}
                        color={color}
                    />
                )
            }}
        />

        <TabRoute.Screen
            name="Profile"
            component={Homepage}
            options={{
                tabBarIcon: ({ size, color }) => (
                    <Ionicons
                        name="person"
                        size={size}
                        color={color}
                    />
                )
            }}
        />

    </TabRoute.Navigator>
)

export default AuthRoutes