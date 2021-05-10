import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/core';
import Parse from 'parse/react-native'
import {handleAsyncStorageData} from '../utils/userData'

import AllDone from '../components/assets/AllDone'
import { Button } from '../components/Button';
import { useUserInfo } from '../context/userTour';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';


export function TourDone() {
    const navigation = useNavigation()
    const { userInfo } = useUserInfo()
    const [buttonIsPressed, setButtonIsPressed] = useState(false)

    //Save user on database
    async function storeToExternalDatabase() {
        const User = Parse.Object.extend('AppUser')
        const user = new User();

        const { gender, name, photo } = userInfo

        user.set("name", name)
        user.set("gender", gender)
        user.set("photo", photo)

        try {
            const result = await user.save()
            await handleAsyncStorageData("set", "userId", result.id)

            console.log(`User ${name} created with id ${result.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    //Store userInfo and redirect to App tab cycle
    async function handleDoneTour() {
        //Disable button preventing double database create
        setButtonIsPressed(true)

        //Store data
        await storeToExternalDatabase()

        //Handle app screen cycle
        navigation.dispatch(StackActions.popToTop())
        navigation.dispatch(StackActions.replace("TabRoutes"))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AllDone
                    width={dimensions.window.width * 0.8}
                />
            </View>

            <View style={styles.body}>
                <Text style={styles.logoTextTitle}>
                    É isso aí, {userInfo.name?.split(' ')[0]}  😆
                </Text>
                <Text style={styles.logoTextSubtitle}>
                    Obrigado por completar o seu perfil
                </Text>
            </View>

            <View style={styles.button}>
                {
                    !buttonIsPressed
                        ? <Button
                            text="Completar Perfil"
                            onPress={() => handleDoneTour()}
                        />
                        : <ActivityIndicator
                            size="large"
                            color={colors.orange}
                        />

                }
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
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTextTitle: {
        fontFamily: fonts.title,
        color: colors.white,
        fontSize: 28,
        textAlign: 'center'
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