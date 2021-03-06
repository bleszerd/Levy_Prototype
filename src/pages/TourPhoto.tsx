import React, { useEffect, useRef, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';

import cameraAnimation from '../static_assets/cameraAnimation.json'

import { Button } from '../components/Button';
import { useUserInfo } from '../context/userInfo';
import { UserProfileHeader } from '../components/UserProfileHeader';

import dimensions from '../styles/dimensions';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function TourPhoto() {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>()
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
    const [cameraIsOpen, setCameraIsOpen] = useState(false)
    const [cameraIsReady, setCameraIsReady] = useState(false)
    const [hasImagePickerPermission, setHasImagePickerPermission] = useState(false)
    const [selectModalIsOpen, setSelectModalIsOpen] = useState(false)

    const [base64Image, setBase64Image] = useState<null | string>(null)

    const cameraRef = useRef<Camera>(null)

    const { userInfo, userInfoController } = useUserInfo()
    const navigation = useNavigation()

    //Request permissions
    useEffect(() => {
        handlePermissionRequest()
    }, [])

    //Handle permission if someone is false
    useEffect(() => {
        if (hasCameraPermission === false || hasImagePickerPermission === false) {
            handlePermissionRequest()
        }
    }, [hasCameraPermission])

    //Request permisions and set states
    async function handlePermissionRequest() {
        const { status: cameraStatus } = await Camera.requestPermissionsAsync()
        const { status: ImagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        setHasCameraPermission(cameraStatus == 'granted')
        setHasImagePickerPermission(ImagePickerStatus == 'granted')
    }

    //Skip photo upload and navigate to next page
    function handleSkipPhoto() {
        navigation.navigate("TourDone")
    }

    //Update userInfo and navigate to next page
    function handleConfirmPhoto() {
        if (base64Image) {
            userInfoController.updateUserInfo({
                ...userInfo,
                photo: base64Image
            })

            navigation.navigate("TourDone")
        }
    }

    //Get photo from gallery
    async function selectPhotoFromGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!result.cancelled && result.base64) {
            setSelectModalIsOpen(false)
            setBase64Image(result.base64)
        }
    }

    //Get photo from camera
    //Set "setCameraIsOpen" to true to view Camera screen before!
    async function takePicture() {
        if (cameraIsReady && cameraRef.current) {
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
                setBase64Image(photo.base64)
            }
        }
    }

    function cancelPhotoOnCameraAction() {
        cameraRef.current?.pausePreview()
        setCameraIsOpen(false)
        setSelectModalIsOpen(false)
    }

    function removePhoto(){
        setBase64Image("")
    }

    //Photo modal open
    async function handleSelectPhoto() {
        setSelectModalIsOpen(true)
    }

    //Photo modal close
    function dismissSelectModal() {
        setSelectModalIsOpen(false)
    }

    //Take a picture, close modal and camera view
    async function takePictureAndDismiss() {
        await takePicture()
        setSelectModalIsOpen(false)
        setCameraIsOpen(false)
    }

    function handleSelectedPhoto() {
        setSelectModalIsOpen(true)
    }

    //Camera full view
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

                                <View style={styles.photoButton} />

                                <View style={styles.photoButton}>
                                    <TouchableOpacity style={styles.photoButtonAction}
                                        onPress={takePictureAndDismiss}
                                    >
                                        <MaterialIcons
                                            name="photo-camera"
                                            size={32}
                                            color={colors.white}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.photoButton}>
                                    <TouchableOpacity style={[
                                        styles.photoButtonAction,
                                        {
                                            backgroundColor: 'transparent',
                                        }
                                    ]}
                                        onPress={cancelPhotoOnCameraAction}
                                    >
                                        <MaterialIcons
                                            name="cancel"
                                            size={48}
                                            color={colors.white}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Camera>
                )
            }
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <UserProfileHeader
                    subLabel="Quase l??,"
                />
            </View>

            {
                selectModalIsOpen && (
                    <View style={styles.selectModalContainer}>
                        <View style={styles.selectModal}>
                            <TouchableOpacity style={styles.optionButton}
                                onPress={() => setCameraIsOpen(true)}
                            >
                                <Text style={styles.optionLabel}>Tirar uma foto</Text>
                                <FontAwesome
                                    name="camera"
                                    size={dimensions.window.width * .2}
                                    color={colors.white}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionButton}
                                onPress={selectPhotoFromGallery}
                            >
                                <Text style={styles.optionLabel}>Abrir galeria</Text>
                                <FontAwesome
                                    name="photo"
                                    size={dimensions.window.width * .2}
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalButton}>
                            <Button
                                text="cancelar"
                                type="error"
                                onPress={dismissSelectModal}
                            />
                        </View>
                    </View>
                )
            }

            <View style={styles.body}>
                <View style={styles.textContainer}>
                    <Text style={styles.hintText}>
                        Escolha a sua{'\n'}
                        melhor foto
                    </Text>
                </View>


                {
                    !!!base64Image || selectModalIsOpen
                        ? <TouchableWithoutFeedback
                            onPress={handleSelectPhoto}
                        >
                            <View style={styles.cameraButton}>
                                <LottieView style={styles.cameraAnimation}
                                    source={cameraAnimation}
                                    loop
                                    autoPlay
                                    speed={0.5}
                                    resizeMode="cover"
                                />

                                <View style={styles.cameraHintContainer}>
                                    <Text style={styles.cameraHintText}>
                                        Selecionar uma foto
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        : <View style={styles.selectedPhotoContainer}>
                            <ImageBackground
                                source={{
                                    uri: `data:image/jpg;base64,${base64Image}`
                                }}
                                resizeMode="cover"
                                style={styles.selectedPhoto}
                                borderRadius={8}
                            >
                                <TouchableOpacity style={[
                                    styles.changeSelectPhotoButton,
                                    {
                                        backgroundColor: 'transparent',
                                        padding: 4,
                                    }
                                ]}
                                    onPress={removePhoto}
                                >
                                    <MaterialIcons style={styles.changePhotoIcon}
                                        name="cancel"
                                        color={colors.error}
                                        size={32}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.changeSelectPhotoButton}
                                    onPress={handleSelectedPhoto}
                                >
                                    <MaterialCommunityIcons style={styles.changePhotoIcon}
                                        name="sync-circle"
                                        color={colors.plate}
                                        size={32}
                                    />
                                </TouchableOpacity>

                            </ImageBackground>

                            <View style={styles.buttonPhotoConfirm}>
                                <Button
                                    text="Usar esta foto"
                                    onPress={handleConfirmPhoto}
                                />
                            </View>

                        </View>
                }


            </View>

            <RectButton style={styles.button}
                onPress={handleSkipPhoto}
            >
                <Text style={styles.buttonText}>
                    Eu prefiro fazer isso mais tarde
                </Text>
            </RectButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: dimensions.window.width * 0.08,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    header: {
        marginTop: dimensions.window.height * 0.05,
        alignItems: 'center',
        flex: .2,
        width: '100%',
    },
    headerText: {
        color: colors.white,
        width: '100%',
        fontSize: 24,
        fontFamily: fonts.text,
    },
    headerName: {
        marginTop: -16,
        color: colors.white,
        width: '100%',
        fontSize: 36,
        fontFamily: fonts.title,
    },
    selectModalContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.screen.width,
        height: dimensions.screen.height,
        backgroundColor: 'rgba(0, 0, 0, .8)',
        zIndex: 5,
    },
    selectModal: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.dark_smoke,
        width: dimensions.screen.width * .9,
        height: dimensions.screen.height * .7,
        paddingTop: 32,
        paddingBottom: 48,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    optionButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLabel: {
        color: colors.white,
        fontFamily: fonts.text,
        paddingVertical: 10,
        paddingBottom: 20,
    },
    modalButton: {
        marginTop: 24,
        width: dimensions.screen.width * .9,
    },
    body: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        flex: .6,
        width: '100%',
    },
    hintText: {
        color: colors.white,
        textAlign: 'left',
        fontSize: 28,
        fontFamily: fonts.text,
        width: '100%'
    },
    cameraButton: {
        borderWidth: 2,
        borderColor: colors.soft_dark,
        paddingBottom: 42,
        width: dimensions.window.width * 0.85,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraAnimation: {
        width: dimensions.window.width * .7,
    },
    cameraHintContainer: {
        width: '100%'
    },
    cameraHintText: {
        color: colors.plate,
        fontFamily: fonts.text,
        fontSize: 16,
        marginTop: -42,
        textAlign: 'center',
    },
    selectedPhotoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedPhoto: {
        marginTop: - dimensions.screen.height * .1,
        flex: 1,
        width: dimensions.screen.width * .5,
        alignSelf: 'center',
        padding: 4,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    changePhotoIcon: {
    },
    changeSelectPhotoButton: {
        borderRadius: dimensions.screen.width,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPhotoConfirm: {
        width: dimensions.window.width * .8,
        marginTop: dimensions.screen.height * .04
    },
    button: {
        width: '100%',
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: colors.plate,
        fontFamily: fonts.text,
        opacity: .8
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
        flexDirection: 'row',
    },
    photoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    photoButtonAction: {
        backgroundColor: colors.orange,
        width: 72,
        height: 72,
        borderRadius: 72,
        justifyContent: 'center',
        alignItems: 'center',
    }
})