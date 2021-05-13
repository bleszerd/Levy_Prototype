import React, { ReactNode, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ImageBackground,
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

import colors from '../../styles/colors';
import dimensions from '../../styles/dimensions';
import fonts from '../../styles/fonts';
import { AsideProductBadge } from '../AsideProductBadge';
import { Product } from '../../ts/types';
import { parseStrCategoryToCorrectFormat, parseStrMoneyToCorrectFormat } from '../../utils/text';

interface HorizontalProductScrollableView {
    data: Product[]
    onPress?: (product: Product) => void
    randomDragOnStart?: boolean
    randomDragStrength?: number
}

export function HorizontalScrollableView({ data, onPress, randomDragOnStart, randomDragStrength }: HorizontalProductScrollableView) {
    const flatListRef = useRef<any>(null)

    useEffect(()=>{
        if(randomDragOnStart)
            dragToRandomStartPosition()
    }, [])

    function dragToRandomStartPosition() {
        if (flatListRef) {
            flatListRef.current.scrollToOffset({
                offset: Math.floor(Math.random() * (randomDragStrength || dimensions.screen.width * .3))
            })
        }
    }

    function handleOnPress(productData: Product) {
        if (onPress)
            onPress(productData)
    }

    return (
        <View style={styles.flatContainer}>
            <FlatList style={styles.container}
                ref={flatListRef}
                data={data}
                renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback style={styles.flatContainer}
                        onPress={() => handleOnPress(item)}
                    >
                        <ImageBackground style={[
                            styles.product,
                            index == 0 && {
                                marginLeft: dimensions.window.width * .02,
                            },
                            index == data.length - 1 && {
                                marginRight: dimensions.window.width * .02,
                            }
                        ]}
                            source={{
                                uri: item.productData.image
                            }}
                            borderRadius={dimensions.screen.width * .01}
                        >
                            <View style={styles.bagdesSection}>
                                <AsideProductBadge
                                    icon={{
                                        component: MaterialCommunityIcons,
                                        name: "currency-usd",
                                        color: colors.success,
                                        size: 32
                                    }}
                                    text={parseStrMoneyToCorrectFormat(item.productData.price)}
                                />

                                <AsideProductBadge
                                    icon={{
                                        component: FontAwesome5,
                                        name: "box-open",
                                        color: colors.brown,
                                        size: 21
                                    }}
                                    text={parseStrCategoryToCorrectFormat(item.productData.category)}
                                />
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                )}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    flatContainer: {
        height: dimensions.screen.height * .25,
        marginTop: 3,
        marginBottom: 6,
        zIndex: 10,
    },
    container: {
        flexDirection: 'row',
    },
    bagdesSection: {
        flex: 1,
        position: 'absolute',
        right: dimensions.window.width * .015,
        top: dimensions.window.width * .015,
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