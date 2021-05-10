import React from 'react';
import { NavigationContainer, TabRouter } from '@react-navigation/native'
import ApplicationRoutes from './routes'

import UserDataContextProvider from '../context/userTour'

export default function Routes() {
    return (
        <UserDataContextProvider>
            <NavigationContainer>
                <ApplicationRoutes />
            </NavigationContainer>
        </UserDataContextProvider>
    )
}
