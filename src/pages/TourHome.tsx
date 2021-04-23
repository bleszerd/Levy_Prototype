import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet
} from 'react-native'

import Logo from '../components/assets/Logo'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function TourHome() {
    const navigation = useNavigation()

    function handleStart(){
        navigation.navigate("TourName")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pageContainer}>

                <View style={styles.logoPresentation}>
                    <Text style={styles.logoText}>LEV</Text>
                    <Logo
                        width={160}
                        height={160}
                    />
                </View>

                <View style={styles.welcome}>
                    <Text style={styles.welcomeTitle}>
                        Mergulhe de cabeça
                    </Text>

                    <Text style={styles.welcomeSubtitle}>
                        nos melhores produtos da internet
                    </Text>
                </View>

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
        flex: 1,
        paddingHorizontal: 24
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    logoPresentation: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: colors.white,
        fontSize: 96,
        fontFamily: fonts.title
    },
    welcome: {
        width: '100%'
    },
    welcomeTitle: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 28,
        fontFamily: fonts.title,
        paddingVertical: 0,
        marginBottom: -13,
    },
    welcomeSubtitle: {
        color: colors.plate,
        textAlign: 'center',
        overflow: 'visible',
        fontSize: 19,
        paddingVertical: 0,
    },
    button: {
        paddingVertical: '16%',
        width: '100%',
    }
})