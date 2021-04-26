import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Homepage } from '../pages/Homepage'
import { TourHome } from '../pages/TourHome'
import { TourName } from '../pages/TourName'
import { TourGender } from '../pages/TourGender'

import colors from '../styles/colors'

const StackRoute = createStackNavigator()

const AppRoutes: React.FC = () => (
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

    </StackRoute.Navigator>
)

export default AppRoutes