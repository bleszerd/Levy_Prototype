import React from 'react';
import { View } from 'react-native'
import { NavigationContainer, TabRouter } from '@react-navigation/native'
import ApplicationRoutes from './routes'

import UserDataContextProvider from '../context/userInfo'
import { ProductsProvider } from '../context/products';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';

export default function Routes() {
    return (
        <View style={{
            backgroundColor: colors.dark,
            width: dimensions.screen.width,
            height: dimensions.screen.height,
        }}>
            <UserDataContextProvider>
                <ProductsProvider>
                    <NavigationContainer>
                        <ApplicationRoutes />
                    </NavigationContainer>
                </ProductsProvider>
            </UserDataContextProvider>
        </View>
    )
}
