import React from 'react'
import {
    StatusBar,
    View,
    ActivityIndicator,
} from 'react-native'
import {
    useFonts,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_800ExtraBold
} from '@expo-google-fonts/poppins'
import { initialize } from './src/services/database'

import Routes from './src/routes'
import colors from './src/styles/colors'
import dimensions from './src/styles/dimensions'

initialize()

export default function App() {
    const [fontsIsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    if (!fontsIsLoaded)
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.dark,
        }}>
            <ActivityIndicator
                size="large"
                color={colors.orange}
            />
        </View>

    return (
        <View style={{
            backgroundColor: colors.dark,
            width: dimensions.screen.width,
            height: dimensions.screen.height,
        }}>
            <StatusBar
                hidden={true}
            />
            <Routes />
        </View>
    )
}