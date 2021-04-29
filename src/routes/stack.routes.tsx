import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Homepage } from '../pages/Homepage'
import { TourHome } from '../pages/TourHome'
import { TourName } from '../pages/TourName'
import { TourGender } from '../pages/TourGender'
import { TourPhoto } from '../pages/TourPhoto'

import colors from '../styles/colors'
import { TourDone } from '../pages/TourDone'
import AuthRoutes from './tab.routes'
import { WelcomeLoading } from '../pages/WelcomeLoading'

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
            name="Welcome"
            component={WelcomeLoading}
        />

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
            name="HandleDrawer"
            component={AuthRoutes}
        />

    </StackRoute.Navigator>
)

export default AppRoutes