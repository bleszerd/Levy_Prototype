import React from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { useUserTourInfo } from '../context/userTour';
import wavebackground from '../static_assets/wavebackground.png'
import dimensions from '../styles/dimensions';

export function ProductDetails() {
    const { userInfo } = useUserTourInfo()

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
})