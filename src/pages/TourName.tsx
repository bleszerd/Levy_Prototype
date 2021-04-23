import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

import BuildingProfileImage from '../components/assets/BuildingProfileImage'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const screenWidth = Dimensions.get('window').width

export function TourName() {
    const [inputIsFocused, setInputIsFocused] = useState(false)
    const [nameIsValid, setNameIsValid] = useState(false)

    const [name, setName] = useState<string>()

    const navigation = useNavigation()

    function handleMoveOn() {
        if(nameIsValid){
            navigation.navigate("")
        }
    }

    function handleNameInput(value: string) {
        if (value.length > 40)
            return

        setName(value)

        if (value.length >= 3) {
            setNameIsValid(true)
        } else {
            setNameIsValid(false)
        }
    }

    function handleInputFocus() {
        setInputIsFocused(true)
    }

    function handleInputBlur() {
        if (!name) {
            setInputIsFocused(false)
            return
        }

        if (name?.length < 3)
            setInputIsFocused(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <KeyboardAvoidingView style={styles.pageContainer}
                    behavior="position"
                >
                    <View>
                        <BuildingProfileImage style={styles.image}
                            width={screenWidth * 0.8}
                        />

                        <View style={styles.interactContainer}>
                            <View style={styles.interact}>
                                <Text style={styles.interactTitle}>
                                    {nameIsValid ? `Que nome legal!` : "Vamos nos conhecer"}
                                </Text>

                                <Text style={styles.interactSubtitle}>
                                    {nameIsValid ? `Prazer em te conhecer,\n${name}` : "Me diga seu nome"}
                                </Text>
                            </View>

                            <TextInput style={[
                                styles.input,
                                (!!name && (name?.length >= 3 || inputIsFocused) || inputIsFocused) && {
                                    borderBottomColor: colors.success
                                },
                            ]}
                                autoCapitalize={"characters"}
                                multiline={false}
                                placeholder="Eu me chamo..."
                                placeholderTextColor={colors.smoke}
                                onChangeText={handleNameInput}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                value={name}
                            />

                        </View>

                        <View style={styles.button}>
                            <Button
                                text="Seguir em frente"
                                inactive={!nameIsValid}
                                disabled={!nameIsValid}
                                onPress={handleMoveOn}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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
    },
    image: {
        maxHeight: 280,
        marginVertical: '16%',
    },
    interactContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    interact: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        paddingBottom: 75,
    },
    interactTitle: {
        fontFamily: fonts.title,
        color: colors.white,
        fontSize: 28,
        paddingVertical: 0,
        textAlign: 'center',
    },
    interactSubtitle: {
        fontFamily: fonts.text,
        color: colors.plate,
        fontSize: 19,
        textAlign: 'center',
    },
    input: {
        width: "100%",
        color: colors.white,
        fontFamily: fonts.text,
        textAlign: 'center',
        borderBottomColor: colors.orange,
        borderBottomWidth: 2,
        paddingVertical: 4,
        marginVertical: 10,
        borderRadius: 16,
        fontSize: 18,
    },
    button: {
        paddingTop: '4%',
    }
})