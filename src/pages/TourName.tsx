import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { validateName } from '../utils/text';
import { useUserInfo } from '../context/userTour';


import { Button } from '../components/Button';
import BuildingProfileImage from '../components/assets/BuildingProfileImage'

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';

export function TourName() {
    const [name, setName] = useState<string>("")
    const [subtitleMsg, setSubtitleMsg] = useState("Me diga seu nome")

    const [inputIsFocused, setInputIsFocused] = useState(false)
    const [nameIsValid, setNameIsValid] = useState(false)

    const { userInfo, userInfoController } = useUserInfo()
    const navigation = useNavigation()

    //Input name validation
    useEffect(() => {
        if (!validateName(name)) {
            if (name != '')
                setSubtitleMsg("Hmmm, escolha um nome mais legal...")
            else
                setSubtitleMsg("Me diga seu nome")

            setNameIsValid(false)
        } else {
            setNameIsValid(true)
        }
    }, [name])

    function handleInputTextChange(value: string) {
        if (value.length <= 30)
            setName(value)
    }

    function handleWithoutFeedback() {
        Keyboard.dismiss()
    }

    function handleInputBlur() {
        setInputIsFocused(false)
    }

    function handleInputFocus() {
        setInputIsFocused(true)
    }

    function handleMoveOn() {
        userInfoController.updateUserInfo({
            ...userInfo,
            name
        })

        navigation.navigate("TourGender")
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={handleWithoutFeedback}
            >
                <KeyboardAvoidingView
                    behavior="position"
                >
                    <View style={styles.header}>
                        <BuildingProfileImage
                            width={dimensions.window.width * 0.9}
                        />
                    </View>

                    <View style={styles.body}>
                        <View style={styles.welcomeTextContainer}>
                            <Text style={styles.title}>
                                {nameIsValid ? "Que nome legal!" : "Vamos nos conhecer"}
                            </Text>

                            <Text style={styles.subtitle}>
                                {nameIsValid ? `Olá, ${name}` : subtitleMsg}
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    (inputIsFocused || nameIsValid) && {
                                        borderBottomColor: colors.success,
                                    }
                                ]}
                                placeholder="Eu me chamo..."
                                placeholderTextColor={colors.smoke}
                                value={name}
                                onChangeText={handleInputTextChange}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                autoCapitalize='words'
                            />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <Button
                            text="Seguir em frente"
                            disabled={!nameIsValid}
                            onPress={handleMoveOn}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: dimensions.window.width * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: dimensions.window.height * 0.5,
    },
    welcomeTextContainer: {
        width: '100%'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontFamily: fonts.title,
        color: colors.white,
        textAlign: 'center',
        fontSize: 28,
    },
    subtitle: {
        fontFamily: fonts.text,
        color: colors.plate,
        fontSize: 17,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        width: '100%',
        height: 52,
        fontFamily: fonts.text,
        borderBottomColor: colors.orange,
        borderBottomWidth: 2,
        borderRadius: 16,
        textAlign: 'center',
        fontSize: 18,
        color: colors.white
    },
    button: {
        paddingVertical: 36
    }
})