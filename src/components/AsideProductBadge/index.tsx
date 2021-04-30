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
        size: number
    }
    text: string
}

export function AsideProductBadge({ icon: Icon, text }: AsideProductBadgeProps) {
    return (
        <View style={styles.container}>
            <Icon.component
                style={[
                    styles.icon,
                    Icon.color && {
                        color: Icon.color
                    },
                    
                ]}
                name={Icon.name}
                size={Icon.size}
            />
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
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
        fontFamily: fonts.text,
    }
})