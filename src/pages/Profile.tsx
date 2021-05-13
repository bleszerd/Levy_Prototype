import React from 'react'
import { SafeAreaView, View, StyleSheet, Alert, BackHandler, ImageBackground } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { useUserInfo } from '../context/userInfo';
import { asyncRemoveUserFromDatabase, getAsyncLocalUserId, handleAsyncStorageData } from '../utils/userData'

import dimensions from '../styles/dimensions';
import { StackActions, useNavigation } from '@react-navigation/core';
import wavebackground from '../static_assets/wavebackground.png'

export function Profile() {
    const { userInfo, userInfoController } = useUserInfo()

    const navigation = useNavigation()

    async function clearUserData() {
        Alert.alert(
            'Limpar dados e sair do aplicativo?',
            '',
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim', onPress: async () => {
                        //Get userId
                        const userId = await getAsyncLocalUserId()

                        //Remove user
                        await asyncRemoveUserFromDatabase(userId)
                        await handleAsyncStorageData("remove", "userId")

                        //Navigate to tour cycle
                        navigation.dispatch(
                            StackActions.replace("LoadingPage")
                        )
                    }
                },
            ],
            { cancelable: false }
        )
    }

    //use function from userData to remove user

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={wavebackground}
                style={styles.wave}
            >

                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.header}>
                        <UserProfileHeader
                            subLabel="Olá,"
                            asidePhoto={userInfo.photo}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={clearUserData}
                            text="Limpar dados"
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wave: {
        flex: 1
    },
    header: {
        marginTop: dimensions.window.height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        paddingBottom: dimensions.window.height * 0.05,
        paddingHorizontal: dimensions.window.width * 0.08,
    },
    scrollContainer: {
        flex: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: dimensions.window.width * 0.04
    }
})