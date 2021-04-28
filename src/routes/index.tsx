import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import StackRoutes from './stack.routes'
import UserTourContextProvider from '../context/userTour'

const Routes = () => {
    return (
        <UserTourContextProvider>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </UserTourContextProvider>
    )
}

export default Routes