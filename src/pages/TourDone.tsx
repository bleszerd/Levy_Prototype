import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native'

import AllDone from '../components/assets/AllDone'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';


export function TourDone() {
    const navigation = useNavigation()

    function handleDoneTour() {
        navigation.navigate("Homepage")
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
                    É isso aí, Vinícius!  😆
                </Text>
                <Text style={styles.logoTextSubtitle}>
                    Obrigado por completar o seu perfil
                </Text>
            </View>

            <View style={styles.button}>
                <Button
                    text="Completar Perfil"
                    onPress={handleDoneTour}
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