import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    StyleSheet,
    View,
    Image
} from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import productData from '../services/data'

import { UserProfileHeader } from '../components/UserProfileHeader';
import { useUserInfo } from '../context/userTour';
import dimensions from '../styles/dimensions';
import wavebackground from '../static_assets/wavebackground.png'
import { Product } from '../ts/types';
import { Button } from '../components/Button';

export function AddProduct() {
    const [myProducts, setMyProducts] = useState<Product[]>(productData.my_products)
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

                    <View style={styles.body}>
                        <View style={styles.productsContainer}>
                            {
                                myProducts.map((product, index) => (
                                    <TouchableWithoutFeedback>
                                        <Image style={styles.productImage}
                                            source={{
                                                uri: product.productData.image
                                            }}
                                            width={dimensions.window.width * .3}
                                            height={dimensions.window.width * .3}
                                        />
                                    </TouchableWithoutFeedback>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        text="Adicionar um produto"
                    />
                </View>

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
    body: {
        flex: 1,
    },
    productsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: dimensions.screen.width * .0423,
        paddingBottom: 46,
    },
    productImage: {
        marginHorizontal: 1,
        marginBottom: 2,
        width: dimensions.screen.width * .3,
        height: dimensions.screen.width * .3,
        borderRadius: dimensions.screen.width * .02
    },
    buttonContainer: {
        paddingHorizontal: dimensions.window.width * 0.08,
        top: - 32,
    }
})