import React from 'react';
import {
    Alert,
    StyleSheet,
    View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundWaveEffect from '../components/assets/BackgroundWaveEffect'
import { Button } from '../components/Button';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { useUserTourInfo } from '../context/userTour';
import dimensions from '../styles/dimensions';

export function AddProduct() {
    const { userInfo } = useUserTourInfo()

    function addProduct() {
        Alert.alert("Nada por aqui")
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

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={addProduct}
                        text="Adicionar um produto."
                    />
                </View>
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