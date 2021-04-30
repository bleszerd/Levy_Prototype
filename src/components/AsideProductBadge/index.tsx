import React, { ReactNode } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface AsideProductBadgeProps {
    icon: {
        component: any
        name: string
        color?: string
    }
    text: string
}

export function AsideProductBadge({ icon: Icon, text }: AsideProductBadgeProps) {
    return (
        <View style={styles.container}>
            <Icon.component
                style={styles.icon}
                name={Icon.name}
                size={32}
            />
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '3%',
        right: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.soft_dark,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    icon: {
        position: 'absolute',
        top: -6,
        left: -14,
        color: colors.success
    },
    text: {
        color: colors.white,
        fontFamily: fonts.text
    }
})