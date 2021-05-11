import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'

import ButtonNavigation from '../components/assets/ButtonNavigation'
import { TourHome } from '../pages/TourHome'
import { TourName } from '../pages/TourName'
import { TourGender } from '../pages/TourGender'
import { TourPhoto } from '../pages/TourPhoto'
import { TourDone } from '../pages/TourDone'
import { Homepage } from '../pages/Homepage'
import { Profile } from '../pages/Profile'
import { AddProduct } from '../pages/AddProduct'
import { ProductDetails } from '../pages/ProductDetails'

import colors from '../styles/colors'
import dimensions from '../styles/dimensions'
import { Gallery } from '../pages/Gallery'

const StackRoute = createStackNavigator()
const TabRoute = createBottomTabNavigator()

export default function StackRoutes() {
    return (
        <StackRoute.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.dark,
                },
            }}
        >

            <StackRoute.Screen
                name="TourHome"
                component={TourHome}
            />

            <StackRoute.Screen
                name="TourName"
                component={TourName}
            />

            <StackRoute.Screen
                name="TourGender"
                component={TourGender}
            />

            <StackRoute.Screen
                name="TourPhoto"
                component={TourPhoto}
            />

            <StackRoute.Screen
                name="TourDone"
                component={TourDone}
            />

            <StackRoute.Screen
                name="TabRoutes"
                component={TabRoutes}
            />

            <StackRoute.Screen
                name="ProductDetails"
                component={ProductDetails}
            />

            <StackRoute.Screen 
                name="ProductGallery"
                component={Gallery}
            />
        </StackRoute.Navigator>
    )
}


function TabRoutes() {
    return (
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
}
