import React from 'react'
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

import BackgroundWaveEffect from '../components/assets/BackgroundWaveEffect'
import { UserProfileHeader } from '../components/UserProfileHeader';
import { VerticalScrollableView } from '../components/VerticalScrollableView';
import { useUserTourInfo } from '../context/userTour';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';

export function Homepage() {
    const { userInfo, userInfoController } = useUserTourInfo()

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
                    <Text style={{
                        fontFamily: fonts.text,
                        color: colors.plate,
                        width: '100%',
                        textAlign: 'left',
                        paddingHorizontal: dimensions.screen.width * .06,
                        marginTop: 6,
                    }}>
                        Anunciados recentemente
                    </Text>
                    <VerticalScrollableView />

                    <Text style={{
                        fontFamily: fonts.text,
                        color: colors.plate,
                        width: '100%',
                        textAlign: 'left',
                        paddingHorizontal: dimensions.screen.width * .06,
                        marginTop: 6,
                    }}>
                        Em destaque
                    </Text>
                    <VerticalScrollableView />
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