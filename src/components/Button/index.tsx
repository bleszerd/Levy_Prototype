import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    text: string
    inactive?: boolean
}

export function Button({ text, inactive, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={[
            styles.container,
            inactive && {
                backgroundColor: colors.plate,
                borderBottomColor: colors.smoke,
            }
        ]}
            {...rest}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '98%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: colors.orange,
        borderBottomColor: colors.dark_orange,
        borderBottomWidth: 6,
        borderTopWidth: .1,
        borderLeftWidth: .1,
        borderRightWidth: .1,
    },
    text: {
        color: colors.white,
        fontFamily: fonts.text,
    }
})