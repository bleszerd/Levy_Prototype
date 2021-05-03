import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native'
import colors from '../../styles/colors';

interface RatingProps {
    colors: string[]
    sizes: number[]
    labels?: string[] | number[]
    style?: StyleProp<ViewStyle>
}

export default function Rating({ colors, sizes, labels, style }: RatingProps) {
    let iterationCount = -1

    function searchMaxValue() {
        let maxValue = 0

        sizes.forEach(size => {
            size > maxValue ? maxValue = size : null
        })

        return maxValue
    }

    return (
        <View style={[
            styles.container,
            style
        ]}>
            {
                labels && labels.map(() => {
                    iterationCount++
                    return (
                        <View style={styles.ratingContainer} key={iterationCount}>
                            <Text style={styles.ratingLabel}>
                                {labels[iterationCount]}
                            </Text>

                            <View style={[
                                styles.ratingBar,
                                {
                                    backgroundColor: colors[iterationCount],
                                    width: `${sizes[iterationCount] / searchMaxValue() * 95}%`,
                                    height: 10,
                                    borderTopRightRadius: 8,
                                    borderBottomRightRadius: 8,
                                    borderTopLeftRadius: 4,
                                    borderBottomLeftRadius: 4,
                                }
                            ]} />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingLabel: {
        color: colors.white,
        marginRight: 8,
    },
    ratingBar: {

    }
})