import React, { ReactNode, useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import { useUserInfo } from '../../context/userInfo'

import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'
import fonts from '../../styles/fonts'

interface UserProfileHeaderProps {
    subLabel: string
    label?: string
    asidePhoto?: string | Image | ReactNode
}

export function UserProfileHeader(headerProps: UserProfileHeaderProps) {
    const [base64Image, setBase64Image] = useState<string | Image | ReactNode>()

    const { userInfo } = useUserInfo()

    useEffect(() => {
        setBase64Image(headerProps.asidePhoto)
    }, [])

    return (
        <View style={styles.header}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>
                    {headerProps.subLabel}
                </Text>

                <Text style={styles.headerName}>
                    {headerProps.label || userInfo.name?.split(' ')[0]}
                </Text>
            </View>

            {
                !!headerProps.asidePhoto && (
                    <View style={styles.profilePicture}>
                        <Image
                            source={{
                                uri: `data:image/jpg;base64,${base64Image}`
                            }}
                            resizeMode="cover"
                            style={styles.image}
                        />
                    </View>
                )
            }


        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    headerTextContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        flex: 1,
    },
    headerText: {
        color: colors.white,
        width: '100%',
        fontSize: 24,
        fontFamily: fonts.text,
    },
    headerName: {
        marginTop: -16,
        color: colors.white,
        width: '100%',
        fontSize: 36,
        fontFamily: fonts.title,
    },
    profilePicture: {
        width: dimensions.screen.height * .11,
        height: dimensions.screen.height * .11,
        elevation: 41,
    },
    image: {
        flex: 1,
        borderTopLeftRadius: 360,
        borderTopRightRadius: 360,
        borderBottomLeftRadius: 360,
    }
})