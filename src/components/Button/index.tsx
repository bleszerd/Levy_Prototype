import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

type ButtonType = 'default' | 'error'

interface ButtonProps extends TouchableOpacityProps {
    text: string
    type?: ButtonType
}

export function Button({ text, disabled, type = "default", ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={[
            styles.container,
            styles[type],
            disabled && {
                backgroundColor: colors.plate,
                borderBottomColor: colors.smoke,
            }
        ]}
            {...rest}
            disabled={disabled}
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
        borderBottomWidth: 6,
        borderTopWidth: .1,
        borderLeftWidth: .1,
        borderRightWidth: .1,
    },
    text: {
        marginTop: 6,
        color: colors.white,
        fontFamily: fonts.text,
    },
    default: {
        backgroundColor: colors.orange,
        borderBottomColor: colors.dark_orange,
    },
    error: {
        backgroundColor: colors.error,
        borderBottomColor: colors.dark_error,
    }
})