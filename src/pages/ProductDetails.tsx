import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import wavebackground from '../static_assets/wavebackground.png'
import { MaterialIcons } from '@expo/vector-icons'

import Rating from '../components/Rating';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';
import { ScreenProps } from 'react-native-screens';
import { Product } from '../ts/types';
import { parseStrCategoryToCorrectFormat, parseStrMoneyToCorrectFormat } from '../utils/text';
import { useNavigation } from '@react-navigation/core';

export function ProductDetails({ route }: any) {
    const [classifierSizes, setClassifierSizes] = useState<number[]>()
    const [meanVotes, setMeanVotes] = useState<number | string>()
    const [votes, setVotes] = useState<number>()
    const [product, setProduct] = useState<Product>(route.params.product)
    const [environment, setEnvironment] = useState(route.params.environment || null)

    const navigation = useNavigation()

    //Calc. the average of user rating on component did mount
    useEffect(() => {
        calculateAverage()
    }, [])

    //Calc. the average of user rating
    function calculateAverage() {
        const averageRawValues = product.seller.classifierSizes
        const averageSizes = []
        const averageVotes = []
        const meanVotesArr = []

        let totalVotes = 0
        let meanVotes = 0

        for (let i = 0; i < averageRawValues.length; i++) {
            averageSizes.push(averageRawValues[i])
            meanVotesArr.push(averageRawValues[i] * (5 - i));
        }

        for (let i = 0; i < averageRawValues.length; i++) {
            averageVotes.push(averageRawValues[i])
        }

        averageVotes.forEach(vote => {
            totalVotes += vote
        })

        meanVotesArr.forEach(vote => {
            meanVotes += vote
        })

        setClassifierSizes(averageSizes)
        setMeanVotes((meanVotes / totalVotes).toFixed(1))
        setVotes(totalVotes)
    }

    function navigateToGalleryPage(itemIndex: number) {
        navigation.navigate("ProductGallery", {
            galleryData: product.productData.gallery,
            itemIndex
        })
    }

    function navigateToEditForm(productToEdit: Product){
        navigation.navigate("ProductForm", {
            product,
            environment
        })
    }

    function renderLeftContent() {
        return (
            <View>
                <RectButton style={styles.sellerProfile}>
                    <TouchableOpacity style={styles.sellerProfile}>
                        <FontAwesome5
                            name="user-alt"
                            size={dimensions.screen.width * .1}
                            color={colors.white}
                        />

                        <Text style={styles.sellerProfileText}>
                            Sobre o vendedor
                        </Text>
                    </TouchableOpacity>
                </RectButton>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={wavebackground}
                style={styles.wave}
                imageStyle={{
                    marginTop: dimensions.window.height * .3
                }}
            >
                {
                    environment == "edit" &&
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.editButton}
                            onPress={() => navigateToEditForm(product)}
                        >
                            <MaterialIcons
                                name="edit"
                                size={24}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                }

                <ScrollView style={styles.scrollContainer}>
                    <Image
                        source={{
                            uri: product.productData.image
                        }}
                        resizeMode="cover"
                        style={styles.headerImg}
                    />

                    <View style={styles.header}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                Tênis K3By Branco Usado em ótimo estado em promoção
                            </Text>

                            <View style={styles.detailsSection}>
                                <View style={styles.detail}>
                                    <MaterialCommunityIcons
                                        name="currency-usd"
                                        size={40}
                                        color={colors.success}
                                    />

                                    <Text style={styles.detailText}>
                                        {parseStrMoneyToCorrectFormat(product.productData.price)}
                                    </Text>
                                </View>

                                <View style={styles.detail}>
                                    <FontAwesome5
                                        name="box-open"
                                        size={28}
                                        color={colors.brown}
                                    />

                                    <Text style={[
                                        styles.detailText,
                                        { marginLeft: 10, }
                                    ]}>
                                        {parseStrCategoryToCorrectFormat(product.productData.category)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <FlatList
                            data={product.productData.gallery}
                            renderItem={({ item, index }) => (
                                <TouchableWithoutFeedback
                                    onPress={() => navigateToGalleryPage(index)}
                                >
                                    <Image
                                        source={{
                                            uri: item.image
                                        }}
                                        style={styles.gallery}
                                    />
                                </TouchableWithoutFeedback>
                            )}
                            horizontal={true}
                            keyExtractor={item => item.id}
                        />
                        <View style={styles.productDescriptionContainer}>
                            <Text style={styles.descriptionLabel}>
                                Sobre o produto
                            </Text>

                            <Text style={styles.description}>
                                Nada como sentir seus pés tocando as nuvens, certo? O tênis K3By proporciona o melhor do conforto para quem te mantém em pé durante todo o dia.
                            </Text>
                        </View>
                    </View>

                    <Swipeable
                        renderLeftActions={() => renderLeftContent()}
                        overshootLeft={false}
                    >
                        <View style={styles.sellerContainer}>
                            <View style={styles.leftContent}>
                                <Image
                                    source={{
                                        uri: "http://fecomercio-rs.org.br/wp-content/uploads/2020/03/iStock-623474880-scaled.jpg"
                                    }}
                                    style={styles.sellerImg}
                                    resizeMode="cover"
                                />

                                <View style={styles.averageClassifier}>
                                    <MaterialCommunityIcons
                                        name="star"
                                        color={colors.warning}
                                        size={36}
                                    />
                                    <Text style={styles.averageClassifierText}>
                                        {meanVotes}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.textSellerContainer}>
                                <Text style={styles.sellerName}>
                                    Guilherme ferreira da Silva
                                </Text>
                                <Text style={styles.sellerClassifierHint}>
                                    com base em {votes} avaliações
                                </Text>

                                <Rating
                                    labels={[5, 4, 3, 2, 1]}
                                    colors={[colors.alt_success, colors.success, colors.warning, colors.error, colors.dark_error]}
                                    sizes={classifierSizes || []}
                                    style={{
                                        width: '92%',
                                        alignSelf: 'flex-end'
                                    }}
                                />
                            </View>
                        </View>
                    </Swipeable>
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
    editButtonContainer: {
        top: dimensions.screen.width * .05,
        right: dimensions.screen.width * .05,
        position: 'absolute',
        zIndex: 16,
    },
    editButton: {
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
    header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerTextContainer: {
        marginTop: '-6%',
        width: dimensions.screen.width * .95,
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: colors.soft_dark_black,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    headerText: {
        color: colors.white,
        width: '100%',
        fontSize: 15,
        fontFamily: fonts.text,
    },
    detailsSection: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        color: colors.white,
        fontSize: 24,
        fontFamily: fonts.title,
    },
    body: {
        flex: 1,
        marginVertical: 8,
    },
    gallery: {
        marginTop: 8,
        height: dimensions.screen.width * .8,
        width: dimensions.screen.width * .8,
        marginHorizontal: 4,
        borderRadius: 6,
    },
    productDescriptionContainer: {
        marginTop: 16,
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: colors.soft_dark,
        width: dimensions.window.width * .98,
        borderRadius: 8,
        alignSelf: 'center',
    },
    descriptionLabel: {
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 16,
        marginBottom: 16,
    },
    description: {
        color: colors.white,
        fontFamily: fonts.text,
        fontSize: 14,
    },
    scrollContainer: {
        flex: 1,
    },
    sellerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: colors.dark,
        paddingVertical: 22,
        paddingHorizontal: 15,
        width: dimensions.screen.width,
        alignSelf: 'center',
    },
    leftContent: {
        alignItems: 'center',
    },
    sellerImg: {
        width: dimensions.screen.width * .2,
        height: dimensions.screen.width * .2,
        borderRadius: dimensions.screen.width,
    },
    averageClassifier: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    averageClassifierText: {
        color: colors.white,
    },
    textSellerContainer: {
        width: dimensions.screen.width * .75,
    },
    sellerName: {
        color: colors.white,
        fontFamily: fonts.text,
        fontSize: 18,
        paddingHorizontal: dimensions.screen.width * .03,
        textAlign: 'right',
    },
    sellerClassifier: {
        color: colors.success,
        paddingHorizontal: dimensions.screen.width * .03,
        fontFamily: fonts.title,
        fontSize: 20,
        textAlign: 'right',
    },
    sellerClassifierHint: {
        color: colors.plate,
        paddingHorizontal: dimensions.screen.width * .03,
        fontFamily: fonts.text,
        fontSize: 12,
        marginTop: -8,
        textAlign: 'right',
    },
    sellerProfile: {
        width: dimensions.screen.width * .3,
        paddingHorizontal: 6,
        backgroundColor: colors.dark_smoke,
        height: '100%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellerProfileText: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.plate,
        fontSize: 9,
        marginTop: 16,
    }
})