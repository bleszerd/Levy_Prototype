import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native'

import colors from '../../styles/colors';
import dimensions from '../../styles/dimensions';
import fonts from '../../styles/fonts';

const flatData = [
    {
        id: 1,
        text: "product 01"
    },
    {
        id: 2,
        text: "product 02"
    },
    {
        id: 3,
        text: "product 03"
    },
    {
        id: 4,
        text: "product 04"
    },
    {
        id: 5,
        text: "product 05"
    },
    {
        id: 6,
        text: "product 06"
    },
    {
        id: 7,
        text: "product 07"
    },
    {
        id: 8,
        text: "product 08"
    },

]

export function VerticalScrollableView() {
    return (
        <View style={styles.flatContainer}>
            <FlatList style={styles.container}
                data={flatData}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Text style={styles.text}>
                            {item.text}
                        </Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
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
        borderRadius: dimensions.screen.width * .02,
        backgroundColor: colors.soft_dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontFamily: fonts.title,
    }
})