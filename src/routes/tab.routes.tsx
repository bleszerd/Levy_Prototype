import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Homepage } from '../pages/Homepage'

import colors from '../styles/colors'
import { Profile } from '../pages/Profile'
import ButtonNavigation from '../components/assets/ButtonNavigation'
import { View } from 'react-native'
import dimensions from '../styles/dimensions'
import { AddProduct } from '../pages/AddProduct'

const TabRoute = createBottomTabNavigator()

const AuthRoutes: React.FC = () => (
    <TabRoute.Navigator
        tabBarOptions={{
            activeTintColor: colors.dark_orange,
            inactiveTintColor: colors.plate,
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
            name="AddProduct"
            component={AddProduct}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        marginBottom: 40,
                    }}
                    >
                        <ButtonNavigation
                            active={focused}
                            width={dimensions.screen.width * .2}
                        />
                    </View>
                )
            }}
        />

        <TabRoute.Screen
            name="Profile"
            component={Profile}
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