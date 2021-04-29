import { DrawerActions, useNavigation, StackActions, NavigationAction } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Logo from '../components/assets/Logo'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';
import { useUserTourInfo } from '../context/userTour';


export function TourHome() {
    const { userInfo, userInfoController } = useUserTourInfo()

    const navigation = useNavigation()

    function handleStart() {
        navigation.navigate("TourName")
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
                    onPress={handleStart}
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