import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, ActivityIndicator, StyleSheet, } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/core';
import { getAsyncLocalUserId, fetchExternalUserData, parseUserToTourInfo } from '../utils/authAndData'
import Parse from 'parse/react-native'

import { useUserInfo } from '../context/userTour';

import Logo from '../components/assets/Logo'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';

export function TourHome() {
    const [appIsReady, setAppIsReady] = useState(false)

    const { userInfoController } = useUserInfo()
    const navigation = useNavigation()

    useEffect(() => {
        handleAppStart()
    }, [])

    //Start app lifecycle
    async function handleAppStart() {
        //Get userId from AsyncStorage
        const userId = await getAsyncLocalUserId()

        //Get info from external database
        const userData = await fetchExternalUserData(userId)

        //If userId exist on database proced to homepage and update userTourInfo context
        userData != null
            ? updateUserInfoAndRedirect(userData)
            : setAppIsReady(true)
    }

    //Set userTourInfo context data and navigate to Homespage
    function updateUserInfoAndRedirect(userData: Parse.Object<Parse.Attributes>) {
        //Convert database model to userTourInfo context format
        const userTourData = parseUserToTourInfo(userData)

        //Update context data
        userInfoController.updateUserInfo(userTourData)
        navigation.dispatch(StackActions.replace("TabRoutes"))
    }

    //Navigate to next screen
    function handleStartTour() {
        navigation.navigate("TourName")
    }

    //Waiting for appIsReady == true
    if (!appIsReady) {
        return <View style={styles.loadingAnim}>
            <ActivityIndicator
                size="large"
                color={colors.orange}
            />
        </View>
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
    },
    loadingAnim: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})