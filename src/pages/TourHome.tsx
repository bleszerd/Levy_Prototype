import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/core';
import asyncStorage from '@react-native-async-storage/async-storage'
import splashScreen from 'expo-splash-screen'

import Logo from '../components/assets/Logo'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';
import { UserTourInfo, useUserTourInfo } from '../context/userTour';

export function TourHome() {
    const [appIsReady, setAppIsReady] = useState(false)
    const { userInfo, userInfoController } = useUserTourInfo()
    const navigation = useNavigation()

    useEffect(() => {
        handleAppStart()
    }, [])

    //Start app lifecycle
    async function handleAppStart() {
        const stringfiedData = await asyncStorage.getItem("com.github.levy:userInfo")

        stringfiedData
            ? updateUserInfoAndRedirect(stringfiedData)
            : setAppIsReady(true)
    }

    //Set context data and navigate to Homespage
    function updateUserInfoAndRedirect(stringfiedData: string) {
        userInfoController.updateUserInfo(JSON.parse(stringfiedData))
        navigation.dispatch(StackActions.replace("TabRoutes"))
    }

    //Navigate to next screen
    function handleStartTour() {
        navigation.navigate("TourName")
    }

    //Wait app ready true state
    if (!appIsReady) {
        return <Text style={{color: colors.warning}}>Loading</Text>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logoTitle}>
                        LEV
                    </Text>
                    <Logo
                        width={dimensions.window.width * 0.4}
                    />
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.logoTextTitle}>
                    Mergulhe de cabeça
                </Text>
                <Text style={styles.logoTextSubtitle}>
                    nos melhores produtos da internet
                </Text>
            </View>

            <View style={styles.button}>
                <Button
                    text="Vamos começar"
                    onPress={handleStartTour}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: dimensions.window.width * 0.08,
        flex: 1,
    },
    header: {
        flex: 1,
        height: dimensions.window.height * 0.6
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTitle: {
        fontFamily: fonts.title,
        color: colors.white,
        fontSize: 72,
        paddingRight: 6,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTextTitle: {
        fontFamily: fonts.title,
        color: colors.white,
        fontSize: 28,
    },
    logoTextSubtitle: {
        fontFamily: fonts.text,
        color: colors.plate,
        fontSize: 17,
        marginTop: -12,
    },
    button: {
        paddingVertical: 36
    }
})