import React from 'react'
import Routes from './src/routes'
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import { Text, StatusBar } from 'react-native'

export default function App() {
    const [fontsIsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    if (!fontsIsLoaded)
        return <Text> Loading</Text >


    return (
        <>
            <StatusBar
                hidden={true}
            />
            <Routes />
        </>
    )
}