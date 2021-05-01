import React from 'react';
import { NavigationContainer, TabRouter } from '@react-navigation/native'
import ApplicationRoutes from './routes'

import UserTourContextProvider from '../context/userTour'

export default function Routes() {
    return (
        <UserTourContextProvider>
            <NavigationContainer>
                <ApplicationRoutes />
            </NavigationContainer>
        </UserTourContextProvider>
    )
}
