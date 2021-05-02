import React from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserTourInfo } from '../context/userTour';
import wavebackground from '../static_assets/wavebackground.png'
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import fonts from '../styles/fonts';
import productData from '../services/data'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList, RectButton, TouchableOpacity } from 'react-native-gesture-handler';

export function ProductDetails() {
    const { userInfo } = useUserTourInfo()

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

                <ScrollView style={styles.scrollContainer}>
                    <Image
                        source={{
                            uri: productData.new_products[0].productData.image
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
                                        125,00
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
                                        Usado
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <FlatList
                            data={productData.new_products[0].productData.gallery}
                            renderItem={({ item }) => (
                                <Image
                                    source={{
                                        uri: item.image
                                    }}
                                    style={styles.gallery}
                                />
                            )}
                            horizontal={true}
                            keyExtractor={item => item.id}
                        />
                        <View style={styles.productDescriptionContainer}>
                            <Text style={styles.descriptionLabel}>
                                Sobre o produto
                            </Text>

                            <Text style={styles.description}>
                                Nada como uma boa noite de sono, certo? Com a cama casal colchão bombom duro bom para casais você se sente revigorado e pronto para o próximo dia.
                            </Text>
                        </View>

                    </View>

                    <Swipeable
                        renderLeftActions={() => renderLeftContent()}
                        overshootLeft={false}
                    >
                        <View style={styles.sellerContainer}>
                            <Image
                                source={{
                                    uri: "http://fecomercio-rs.org.br/wp-content/uploads/2020/03/iStock-623474880-scaled.jpg"
                                }}
                                style={styles.sellerImg}
                                resizeMode="cover"
                            />

                            <View style={styles.textSellerContainer}>
                                <Text style={styles.sellerName}>
                                    Guilherme ferreira da Silva
                                </Text>
                                <Text style={styles.sellerClassifier}>
                                    Bom vendedor
                                </Text>
                                <Text style={styles.sellerClassifierHint}>
                                    com base em 126 avaliações
                                </Text>
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
    headerImg: {
        height: dimensions.window.height * .4,
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
        marginTop: 16,
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
        alignItems: 'center',
        backgroundColor: colors.dark,
        paddingVertical: 22,
        paddingHorizontal: 15,
        width: dimensions.screen.width,
        alignSelf: 'center',
    },
    sellerImg: {
        width: dimensions.screen.width * .2,
        height: dimensions.screen.width * .2,
        borderRadius: dimensions.screen.width,
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