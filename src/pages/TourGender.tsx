import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';
import { Gender } from '../ts/types';

import { useUserInfo } from '../context/userInfo';

import FemaleProfile from '../components/assets/FemaleProfile'
import MaleProfile from '../components/assets/MaleProfile'
import { Button } from '../components/Button';
import { UserProfileHeader } from '../components/UserProfileHeader';

import dimensions from '../styles/dimensions';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function TourGender() {
    const [gender, setGender] = useState<Gender>("female")
    const [labelText, setLabelText] = useState("A vendedora.")

    const navigation = useNavigation()
    const { userInfo, userInfoController } = useUserInfo()

    //Handle selected gender text
    useEffect(() => {
        setLabelText(gender === 'male' ? "O vendedor.  👨" : "A vendedora.  👩")
    }, [gender])

    //Handle gander
    function handleGenderSelect(value: Gender) {
        if (value != gender)
            setGender(value)
    }

    //Update userInfo and navigate to next page
    function handleChoosePhoto() {
        userInfoController.updateUserInfo({
            ...userInfo,
            gender
        })

        navigation.navigate("TourPhoto")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <UserProfileHeader
                    subLabel="Certo,"
                />
            </View>

            <View style={styles.body}>
                <View style={styles.textContainer}>
                    <Text style={styles.selectionText}>
                        Você quer ser{'\n'}
                        chamado de...
                    </Text>
                </View>

                <View style={styles.genderSelect}>
                    <RectButton style={[
                        styles.genderContainer,
                        gender === 'female' && styles.genderContainerActive
                    ]}
                        onPress={() => handleGenderSelect('female')}
                    >
                        <View style={[
                            styles.genderEffect,
                            gender === 'female' && styles.genderEffectActive
                        ]} />
                        
                        <FemaleProfile
                            width={dimensions.window.width * .35}
                        />
                    </RectButton>

                    <RectButton style={[
                        styles.genderContainer,
                        gender === 'male' && styles.genderContainerActive
                    ]}
                        onPress={() => handleGenderSelect('male')}
                    >
                        <View style={[
                            styles.genderEffect,
                            gender === 'male' && styles.genderEffectActive
                        ]} />

                        <MaleProfile
                            width={dimensions.window.width * .35}
                        />
                    </RectButton>
                </View>

                <View style={styles.selectLabelContainer}>
                    <Text style={styles.selectLabel}>
                        {labelText}
                    </Text>
                </View>
            </View>

            <View style={styles.button}>
                <Button
                    text="Está tudo certo"
                    onPress={handleChoosePhoto}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: dimensions.window.width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    header: {
        marginTop: dimensions.window.height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: .2,
        width: '100%',
    },
    body: {
        width: '100%',
        flex: 1,
    },
    textContainer: {
        flex: .3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionText: {
        color: colors.white,
        textAlign: 'left',
        fontSize: 28,
        fontFamily: fonts.text,
        width: '100%'
    },
    genderSelect: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    genderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .4,
        paddingHorizontal: 4,
    },
    genderContainerActive: {
        opacity: 1,
    },
    selectLabelContainer: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderEffect: {
        width: dimensions.window.width * .37,
        height: dimensions.window.width * .37,
        position: 'absolute',
        backgroundColor: colors.white,
        borderRadius: dimensions.window.width * .35,
        opacity: .4,
    },
    genderEffectActive: {
        backgroundColor: colors.dark_orange,
        opacity: 1,
    },
    selectLabel: {
        color: colors.white,
        fontFamily: fonts.thick,
        fontSize: 24,
    },
    button: {
        width: '100%',
        paddingVertical: 30
    }
})