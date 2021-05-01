import React, { useEffect } from 'react'
import {
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { API } from '../services/api'
import wavebackground from '../static_assets/wavebackground.png'

import { UserProfileHeader } from '../components/UserProfileHeader';
import { HorizontalScrollableView } from '../components/HorizontalScrollableView';
import { useUserTourInfo } from '../context/userTour';
import { ProductDetails } from './ProductDetails'

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';

import productData from '../services/data'
import data from '../services/data';

import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core';

const StackRoutes = createStackNavigator()

function StackDetails() {
    return (
        <StackRoutes.Navigator>
            <StackRoutes.Screen
                name="details"
                component={ProductDetails}
            />
        </StackRoutes.Navigator>
    )
}

export function Homepage() {
    const { userInfo, userInfoController } = useUserTourInfo()
    const navigation = useNavigation()

    useEffect(() => {
        // async function fetchProducts() {
        //     const productsResponse = await API.get("/new_products")
        //     console.log(productsResponse);
        // }

        // fetchProducts()
    }, [])

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
                            <Text style={styles.scrollableLabel}>
                                Anunciados recentemente
                            </Text>

                            <HorizontalScrollableView
                                data={productData.new_products}
                                /*Handle navigation by this function*/
                                onPressNavigationComponent={() => {

                                }}
                            />
                        </View>

                        <View style={styles.productsContainer}>
                            <Text style={styles.scrollableLabel}>
                                Vistos anteriormente
                        </Text>

                            <HorizontalScrollableView
                                data={productData.new_products}
                            />
                        </View>
                    </View>

                    <View style={styles.featuredProductContainer}>
                        <Text style={styles.scrollableLabel}>
                            Produtos em destaque
                        </Text>

                        <FlatList
                            data={data.featured_products}
                            style={styles.featuredProduct}
                            renderItem={({ item, index }) => (
                                <ImageBackground style={[
                                    styles.featuredImage,
                                    index == 0 && {
                                        marginLeft: dimensions.window.width * .02,
                                    },
                                    index == data.featured_products.length - 1 && {
                                        marginRight: dimensions.window.width * .02,
                                    }
                                ]}
                                    source={{
                                        uri: item.productData.image
                                    }}
                                    borderRadius={dimensions.screen.width * .01}
                                >

                                    {/*Inside the image*/}
                                </ImageBackground>
                            )}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
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
        flex: 1,
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
    productsContainer: {

    },
    scrollableLabel: {
        fontFamily: fonts.text,
        color: colors.white,
        elevation: 4,
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: dimensions.screen.width * .06,
        marginTop: 6,
        textShadowOffset: {
            height: 1,
            width: 1,
        },
        textShadowColor: "rgba(0, 0, 0, .6)",
        textShadowRadius: 6
    },
    featuredProductContainer: {
        marginBottom: 10,
    },
    featuredProduct: {

    },
    featuredImage: {
        marginTop: 6,
        marginRight: 8,
        width: dimensions.screen.width * .9,
        height: dimensions.screen.width * .9,
    },
})