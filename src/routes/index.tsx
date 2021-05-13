import React from 'react';
import { NavigationContainer, TabRouter } from '@react-navigation/native'
import ApplicationRoutes from './routes'

import UserDataContextProvider from '../context/userInfo'
import { ProductsProvider } from '../context/products';

export default function Routes() {
    return (
        <UserDataContextProvider>
            <ProductsProvider>
                <NavigationContainer>
                    <ApplicationRoutes />
                </NavigationContainer>
            </ProductsProvider>
        </UserDataContextProvider>
    )
}
