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
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import ImagePicker, { requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import { Camera, requestPermissionsAsync } from 'expo-camera'
import { StackActions, useNavigation } from '@react-navigation/core';
import { GalleryItem, Product } from '../ts/types';

import { parseStrMoneyToCorrectFormat } from '../utils/text'
import { base64GalleryExtractor } from '../utils/gallery';
import { Button } from '../components/Button';
import wave from '../static_assets/wavebackground.png'

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';

export function ProductForm({ route }: any) {
    const [product, setProduct] = useState<Product>(parseParams())
    const [productTitle, setProductTitle] = useState(product.title || "")
    const [productCategory, setProductCategory] = useState(product.productData.category || "")
    const [productPrice, setProductPrice] = useState(product.productData.price || "")
    const [productImage, setProductImage] = useState(product.productData.image)
    const [productDescription, setProductDescription] = useState(product.productData.description || "")
    const [environment, setEnvironment] = useState<"edit" | "add">(route.params?.environment || "add")
    const [base64Gallery, setBase64Gallery] = useState<string[]>()

    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [cameraIsOpen, setCameraIsOpen] = useState(false)
    const [cameraIsReady, setCameraIsReady] = useState(false)

    const cameraRef = useRef<Camera>(null)
    const navigation = useNavigation()

    //Handle persmissions requests
    useEffect(() => {
        handleRequestPermission()
    }, [])

    useEffect(() => {
        if (product.productData.gallery) {
            //Convert GalleryData from base64 image array
            setBase64Gallery(base64GalleryExtractor(product.productData.gallery))
        }
    }, [])

    //Verify permissions
    useEffect(() => {
        if (hasCameraPermission === false || hasGalleryPermission === false) {
            handleRequestPermission()
        }
    }, [hasCameraPermission, hasGalleryPermission])

    //Handle persmissions action
    async function handleRequestPermission() {
        const galleryPermission = await requestMediaLibraryPermissionsAsync()
        const cameraPermission = await requestPermissionsAsync()

        setHasGalleryPermission(galleryPermission.granted)
        setHasCameraPermission(cameraPermission.granted)
    }

    //Prevent crash if product is empty
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

    //Save changed product
    function saveProductChanges() {
        //Change into database
        navigation.dispatch(
            StackActions.pop()
        )
    }

    //Add a new product
    function addProduct() {
        //Save into database
        navigation.dispatch(
            StackActions.pop()
        )
    }

    //Take picture with camera
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
                    return
                }

                setBase64Gallery([photo.base64])
            }
        }
    }

    //Take picture and toggle camera full view
    async function takePictureAndDismiss() {
        await takePicture()
        setCameraIsOpen(false)
    }

    //If camera is opened, render that
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
                                size={24}
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

                    {
                        !base64Gallery && <TouchableOpacity style={styles.addImageButtonContainer}
                            onPress={() => setCameraIsOpen(true)}
                        >
                            <MaterialIcons
                                name="add-a-photo"
                                size={64}
                                color={colors.white}
                            />
                            <Text style={styles.buttonLabel}>Adicionar uma imagem ao produto</Text>
                        </TouchableOpacity>
                    }

                    <ScrollView style={styles.galleryContainer}
                        horizontal
                    >
                        {
                            base64Gallery && base64Gallery.map((item, index) => (
                                <ImageBackground
                                    source={{
                                        uri: item.includes('http://') || item.includes('https://') ? item : `data:image/jpg;base64,${item}`
                                    }}
                                    resizeMode="cover"
                                    borderRadius={8}
                                    style={styles.selectedPhoto}
                                >
                                    {
                                        base64Gallery && <TouchableOpacity style={styles.addPhotoButton}
                                            onPress={() => setCameraIsOpen(true)}
                                        >
                                            <MaterialIcons
                                                name="add-a-photo"
                                                size={24}
                                                color={colors.white}
                                            />
                                        </TouchableOpacity>
                                    }
                                </ImageBackground>
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
        justifyContent: 'center',
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
        width: dimensions.screen.width * .94,
        marginHorizontal: 2,
    },
    addImageButtonContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 42,
        marginHorizontal: 23,
        borderWidth: 2,
        borderColor: colors.dark_orange,
        borderRadius: dimensions.screen.width * .02,
        backgroundColor: colors.soft_dark
    },
    buttonLabel: {
        color: colors.white,
        fontFamily: fonts.text,
        width: dimensions.window.width * .4,
    },
    addPhotoButton: {
        backgroundColor: colors.soft_dark,
        elevation: 4,
        alignSelf: 'flex-end',
        marginRight: dimensions.screen.width * .04,
        marginTop: dimensions.screen.width * .04,
        padding: 12,
        borderRadius: dimensions.screen.width,
        maxWidth: 48,
    }
})