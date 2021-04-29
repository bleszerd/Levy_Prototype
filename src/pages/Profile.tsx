import React from 'react'
import { SafeAreaView, View, StyleSheet, Alert, BackHandler } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

import BackgroundWaveEffect from '../components/assets/BackgroundWaveEffect'
import { Button } from '../components/Button';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { useUserTourInfo } from '../context/userTour';

import dimensions from '../styles/dimensions';
import { StackActions, useNavigation } from '@react-navigation/core';

export function Profile() {
    const { userInfo, userInfoController } = useUserTourInfo()

    const navigation = useNavigation()

    async function clearUserData() {
        Alert.alert(
            'Limpar dados e sair do aplicativo?',
            '',
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim', onPress: async () => {
                        await AsyncStorage.removeItem("com.github.levy:userInfo")
                        navigation.dispatch(
                            StackActions.replace("TourHome")
                        )
                    }
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.waveContainer}>
                <BackgroundWaveEffect
                    width={dimensions.screen.width}
                />
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.header}>
                    <UserProfileHeader
                        subLabel="Olá,"
                        asidePhoto={userInfo.photo}
                    />
                </View>

                <View style={styles.body}>

                </View>

                <Button
                    onPress={clearUserData}
                    text="Limpar dados"
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    waveContainer: {
        position: 'absolute',
        flex: 1,
        left: 0,
        bottom: - dimensions.screen.height * .6,
    },
    scrollContainer: {
        flex: 1,
    },
    header: {
        marginTop: dimensions.window.height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: .2,
        paddingBottom: dimensions.window.height * 0.05,
        paddingHorizontal: dimensions.window.width * 0.08,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})