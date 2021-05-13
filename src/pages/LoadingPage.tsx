import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native'
import LottieView from 'lottie-react-native'
import { StackActions, useNavigation } from '@react-navigation/core';

import { useUserInfo } from '../context/userInfo';
import { fetchExternalUserData, getAsyncLocalUserId, parseUserToUserInfo } from '../utils/userData';
import loadingAnimation from '../static_assets/loadingAnimation.json'

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';

import Logo from '../components/assets/Logo'

export function LoadingPage() {
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
        //Else navigate to TourHome
        userData != null
            ? updateUserInfoAndRedirect(userData)
            : handleStartTour()
    }

    //Set userTourInfo context data and navigate to Homespage
    function updateUserInfoAndRedirect(userData: Parse.Object<Parse.Attributes>) {
        //Convert database model to userTourInfo context format
        const userTourData = parseUserToUserInfo(userData)

        //Update context data
        userInfoController.updateUserInfo(userTourData)

        //Redirect to TabRoutes (Homepage implicity)
        navigation.dispatch(StackActions.replace("TabRoutes"))
    }

    //Navigate to next screen
    function handleStartTour() {
        navigation.dispatch(
            StackActions.replace("TourHome")
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.animationContainer}>

                <View style={styles.logoSection}>
                    <Text style={styles.logoTitle}>
                        LEV
                    </Text>
                    <Logo
                        width={dimensions.window.width * 0.4}
                    />
                </View>

                <View style={styles.animationView}>
                    <LottieView style={styles.lootie}
                        source={loadingAnimation}
                        autoPlay
                        loop={true}
                    />
                </View>

                <View style={styles.body}>
                    <Text style={styles.logoTextTitle}>
                        Mergulhe de cabeça
                    </Text>

                    <Text style={styles.logoTextSubtitle}>
                        nos melhores produtos da internet
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 64,
    },
    animationView: {
        marginBottom: 26,
    },
    loadingLabel: {
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    lootie: {
        width: dimensions.screen.width * .2,
        height: dimensions.screen.width * .2,
    },
    logoSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoTitle: {
        fontFamily: fonts.title,
        color: colors.white,
        fontSize: 72,
        paddingRight: 6,
    },
    body: {
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
        marginTop: -8,
    },
})