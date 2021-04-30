import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../../styles/colors';
import dimensions from '../../styles/dimensions';
import fonts from '../../styles/fonts';
import { AsideProductBadge } from '../AsideProductBadge';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Product {
    id: string
    key: string
    title: string
    seller: {
        id: string
    },
    productData: {
        category: string
        description: string
        image: string
    }
}

interface VerticalProductScrollableView {
    data: Product[]
}

export function VerticalScrollableView({ data }: VerticalProductScrollableView) {
    return (
        <View style={styles.flatContainer}>
            <TouchableWithoutFeedback style={styles.flatContainer}
                onPress={() => {
                    Alert.alert("Ainda não tem nada aqui :)")
                }}
            >
                <FlatList style={styles.container}
                    data={data}
                    renderItem={({ item, index }) => (
                        <ImageBackground style={[
                            styles.product,
                            index == 0 && {
                                marginLeft: dimensions.window.width * .04,
                            },
                            index == data.length - 1 && {
                                marginRight: dimensions.window.width * .03,
                            }
                        ]}
                            source={{
                                uri: item.productData.image
                            }}
                            borderRadius={dimensions.screen.width * .01}
                        >
                            <AsideProductBadge
                                icon={{
                                    component: MaterialCommunityIcons,
                                    name: "currency-usd"
                                }}
                                text="125,00"
                            />
                        </ImageBackground>
                    )}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    flatContainer: {
        height: dimensions.screen.height * .25,
        marginTop: 3,
        marginBottom: 6,
    },
    container: {
        flexDirection: 'row',
    },
    product: {
        width: dimensions.screen.width * .55,
        flex: 1,
        marginHorizontal: dimensions.window.width * .01,
        backgroundColor: colors.soft_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: dimensions.screen.width * .01,
    },
    text: {
        textAlign: 'center',
        color: colors.white,
        fontFamily: fonts.title,
    }
})