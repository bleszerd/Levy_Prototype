import React, { useEffect, useRef, useState } from 'react';
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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import ImagePicker, { requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import { Camera, requestPermissionsAsync } from 'expo-camera'

import wave from '../static_assets/wavebackground.png'
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';
import { Product } from '../ts/types';
import { Button } from '../components/Button';
import { StackActions, useNavigation } from '@react-navigation/core';

export function ProductForm({ route }: any) {
    const [product, setProduct] = useState<Product>(parseParams())
    const [productTitle, setProductTitle] = useState(product.title || "")
    const [productCategory, setProductCategory] = useState(product.productData.category || "")
    const [productPrice, setProductPrice] = useState(product.productData.price || "")
    const [productImage, setProductImage] = useState(product.productData.image)
    const [productDescription, setProductDescription] = useState(product.productData.description || "")
    const [environment, setEnvironment] = useState<"edit" | "add">(route.params?.environment || "add")
    const [base64Image, setBase64Image] = useState<string>()
    const [base64Gallery, setBase64Gallery] = useState<string[]>()

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [cameraIsOpen, setCameraIsOpen] = useState(false)
    const [cameraIsReady, setCameraIsReady] = useState(false)

    const cameraRef = useRef<Camera>(null)
    const navigation = useNavigation()

    useEffect(() => {
        handleRequestPermission()
    }, [])

    useEffect(() => {
        if (hasCameraPermission === false || hasGalleryPermission === false) {
            handleRequestPermission()
        }
    }, [hasCameraPermission, hasGalleryPermission])

    async function handleRequestPermission() {
        const galleryPermission = await requestMediaLibraryPermissionsAsync()
        const cameraPermission = await requestPermissionsAsync()

        setHasGalleryPermission(galleryPermission.granted)
        setHasCameraPermission(cameraPermission.granted)
    }

    function parseParams(): Product {
        if (route.params && route.params.product)
            return route.params.product

        const paramProduct = {
            title: "",
            productData: {
                category: "",
                price: "",
                description: ""
            }
        } as Product

        return paramProduct
    }

    function saveProductChanges() {
        //Change into database
        navigation.dispatch(
            StackActions.pop()
        )
    }

    function addProduct() {
        //Save into database
        navigation.dispatch(
            StackActions.pop()
        )
    }

    async function takePicture() {
        if (cameraIsReady && !!cameraRef.current) {
            //Take a picture and return base64 image
            const photo = await cameraRef.current.takePictureAsync({
                base64: true
            })

            //If photo no exist just return
            if (!photo) {
                return
            }

            //If photo is valid store that on state
            if (photo.base64) {
                if (base64Gallery) {
                    setBase64Gallery([...base64Gallery, photo.base64])
                    setBase64Image(photo.base64)
                    return
                }

                setBase64Gallery([photo.base64])
            }
        }
    }

    async function takePictureAndDismiss() {
        await takePicture()
        setCameraIsOpen(false)
    }

    if (cameraIsOpen) {
        return <View style={styles.cameraContainer}>
            {
                hasCameraPermission && (
                    <Camera
                        type={cameraType}
                        ratio="16:9"
                        onCameraReady={() => setCameraIsReady(true)}
                        ref={cameraRef}
                    >
                        <View style={styles.cameraSubView}>
                            <View style={styles.photoButtonContainer}>
                                <TouchableOpacity style={styles.takePhotoButton}
                                    onPress={() => takePictureAndDismiss()}
                                >
                                    <MaterialIcons
                                        name="photo-camera"
                                        size={32}
                                        color={colors.white}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>
                )
            }
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.wave}
                source={wave}
            >

                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton}
                        onPress={environment == "edit" ? saveProductChanges : addProduct}
                    >
                        <MaterialCommunityIcons
                            name="content-save"
                            size={24}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>

                {

                    productImage && <Image
                        resizeMode="cover"
                        style={styles.headerImg}
                        source={{
                            uri: product.productData.image
                        }}
                    />
                }

                <ScrollView style={[
                    styles.scrollableContainer,
                    !!productImage && {
                        marginTop: - dimensions.screen.height * .1,
                    }
                ]}>
                    <Text style={styles.label}>Anúncio</Text>
                    <TextInput style={styles.fullSizeInput}
                        value={productTitle}
                        onChangeText={value => setProductTitle(value)}
                        placeholder="Titulo de anúncio"
                        placeholderTextColor={colors.plate}
                    />

                    <Text style={styles.label}>Detalhes do produto</Text>


                    <View style={styles.categoryPickerContainer}>
                        <Picker style={styles.picker}
                            mode="dropdown"
                            selectedValue={productCategory}
                            dropdownIconColor={colors.white}
                            onValueChange={value => setProductCategory(value)}
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
                            placeholder="Descrição do produto"
                            placeholderTextColor={colors.plate}
                        />
                    </KeyboardAvoidingView>

                    <Text style={styles.label}>Fotos do anúncio</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            text="Adicionar foto"
                            onPress={() => setCameraIsOpen(true)}
                        />
                    </View>

                    <ScrollView style={styles.galleryContainer}
                        horizontal
                    >
                        {
                            base64Gallery && base64Gallery.map(item => (
                                <Image
                                    source={{
                                        uri: `data:image/jpg;base64,${item}`
                                    }}
                                    resizeMode="cover"
                                    style={styles.selectedPhoto}
                                />
                            ))
                        }

                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <Button
                            text={environment == "add" ? "Adicionar Produto" : "Editar produto"}
                            onPress={environment == "edit" ? saveProductChanges : addProduct}
                        />
                    </View>


                </ScrollView>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wave: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '100%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 10,
    },
    scrollableContainer: {
        width: dimensions.screen.width,
        backgroundColor: colors.soft_dark,
        borderRadius: dimensions.window.width * .02,
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
        alignItems: 'center'
    },
    picker: {
        color: colors.white,
        fontFamily: fonts.text,
        flex: 1,
    },
    currencyIcon: {
        justifyContent: 'center',
        marginLeft: '10%',
        flex: .4,
    },
    halfInput: {
        color: colors.white,
        height: 64,
        fontSize: 20,
        flex: .6,
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
        marginBottom: 16,
    },
    camera: {
        alignSelf: 'center'
    },
    cameraSubView: {
        width: dimensions.window.width,
        height: dimensions.window.height,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        paddingVertical: 32,
        bottom: 0,
    },
    takePhotoButton: {
        backgroundColor: colors.orange,
        width: 72,
        height: 72,
        borderRadius: 72,
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryContainer: {
        flexDirection: 'row',
        marginHorizontal: 6,
        paddingVertical: 16,
    },
    selectedPhoto: {
        height: dimensions.screen.height * .8,
        width: dimensions.screen.width * .9,
        borderRadius: 6,
        marginHorizontal: 2,
    },
})