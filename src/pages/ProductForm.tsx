import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'
import { parseStrMoneyToCorrectFormat } from '../utils/text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { parseUserToTourInfo } from '../utils/userData'

import wave from '../static_assets/wavebackground.png'
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';
import { Product } from '../ts/types';
import { Button } from '../components/Button';
import { useUserInfo } from '../context/userTour';
import { StackActions, useNavigation } from '@react-navigation/core';

export function ProductForm({ route }: any) {
    const [product, setProduct] = useState<Product>(route.params.product)
    const [productTitle, setProductTitle] = useState(product.title)
    const [productCategory, setProductCategory] = useState(product.productData.category)
    const [productPrice, setProductPrice] = useState(product.productData.price)
    const [productDescription, setProductDescription] = useState(product.productData.description)

    const navigation = useNavigation()
    const { userInfoController } = useUserInfo()

    function saveProductChanges() {
        //Change into database
        navigation.dispatch(
            StackActions.pop()
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.wave}
                source={wave}
            >

                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton}
                        onPress={saveProductChanges}
                    >
                        <MaterialCommunityIcons
                            name="content-save"
                            size={24}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >

                    <Image
                        resizeMode="cover"
                        style={styles.headerImg}
                        source={{
                            uri: product.productData.image
                        }}
                    />

                    <ScrollView style={styles.scrollableContainer}>
                        <Text style={styles.label}>Anúncio</Text>
                        <TextInput style={styles.fullSizeInput}
                            value={productTitle}
                            onChangeText={value => setProductTitle(value)}
                        />

                        <Text style={styles.label}>Detalhes do produto</Text>

                        <View style={styles.categoryPickerContainer}>
                            <Picker style={styles.picker}
                                selectedValue={productCategory}
                                dropdownIconColor={colors.white}
                                onValueChange={(value, index) => setProductCategory(value)}
                            >
                                <Picker.Item
                                    label="Usado"
                                    value="second-hands"
                                />

                                <Picker.Item
                                    label="Novo"
                                    value="new"
                                />
                            </Picker>

                            <View style={styles.currencyIcon}>
                                <MaterialCommunityIcons
                                    name="currency-usd"
                                    size={40}
                                    color={colors.success}
                                />
                            </View>

                            <TextInput style={styles.halfInput}
                                keyboardType="numeric"
                                value={parseStrMoneyToCorrectFormat(productPrice)}
                                onChangeText={value => {
                                    if (value.length < 24)
                                        setProductPrice(value.replace('.', ''))
                                }}
                            />
                        </View>

                        <Text style={styles.label}>Descrição</Text>

                        <KeyboardAvoidingView>
                            <TextInput style={styles.multilineInput}
                                multiline={true}
                                value={productDescription}
                                onChangeText={value => setProductDescription(value)}
                            />
                        </KeyboardAvoidingView>

                        <View style={styles.buttonContainer}>
                            <Button
                                text="Salvar mudanças"
                                onPress={saveProductChanges}
                            />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    wave: {
        height: '104%',
    },
    saveButtonContainer: {
        top: dimensions.screen.width * .05,
        right: dimensions.screen.width * .05,
        position: 'absolute',
        zIndex: 16,
    },
    saveButton: {
        backgroundColor: colors.orange,
        padding: 12,
        borderRadius: dimensions.screen.width,
        elevation: 7,
    },
    headerImg: {
        height: dimensions.screen.height * .4,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 10,
    },
    scrollableContainer: {
        width: dimensions.screen.width * .97,
        alignSelf: 'center',
        backgroundColor: colors.soft_dark,
        top: - dimensions.screen.height * .1,
        borderRadius: dimensions.window.width * .02,
        height: dimensions.screen.height * 2
    },
    label: {
        paddingHorizontal: 12,
        marginBottom: 8,
        paddingTop: 16,
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 16,
    },
    fullSizeInput: {
        width: '94%',
        alignSelf: 'center',
        height: 64,
        borderRadius: 12,
        fontSize: 15,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderColor: colors.orange,
        color: colors.white,
        borderBottomWidth: 6,
        borderBottomColor: colors.dark_orange,
        backgroundColor: colors.soft_dark,
        fontFamily: fonts.text,
    },
    halfInput: {
        flex: .8,
        color: colors.white,
        fontSize: 20,
    },
    categoryPickerContainer: {
        width: '94%',
        alignSelf: 'center',
        height: 64,
        borderRadius: 12,
        fontSize: 15,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderColor: colors.orange,
        color: colors.white,
        backgroundColor: colors.soft_dark,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderBottomWidth: 6,
        borderBottomColor: colors.dark_orange,
    },
    picker: {
        flex: 1,
        color: colors.white,
        fontFamily: fonts.text,
        height: 64,
    },
    currencyIcon: {
        justifyContent: 'center',
        marginLeft: '10%',
    },
    multilineInput: {
        width: '94%',
        alignSelf: 'center',
        borderRadius: 12,
        fontSize: 15,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: colors.orange,
        color: colors.white,
        backgroundColor: colors.soft_dark,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderBottomWidth: 6,
        borderBottomColor: colors.dark_orange,
        minHeight: dimensions.window.height * .2,
        textAlignVertical: 'top'
    },
    buttonContainer: {
        paddingHorizontal: dimensions.window.width * 0.02,
        alignItems: 'center',
        marginVertical: 26,
    }
})