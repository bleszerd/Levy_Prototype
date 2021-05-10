import React from 'react';
import {
    Alert,
    ImageBackground,
    StyleSheet,
    View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { useUserInfo } from '../context/userTour';
import dimensions from '../styles/dimensions';
import wavebackground from '../static_assets/wavebackground.png'

export function AddProduct() {
    const { userInfo } = useUserInfo()

    function addProduct() {
        Alert.alert("Nada por aqui")
    }

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
                            onPress={addProduct}
                            text="Adicionar um produto."
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
    waveContainer: {
        position: 'absolute',
        flex: 1,
        left: 0,
        bottom: - dimensions.screen.height * .6,
    },
    wave: {
        flex: 1,
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