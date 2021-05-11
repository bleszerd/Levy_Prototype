import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native'
import { HandlerStateChangeEvent, Swipeable } from 'react-native-gesture-handler'

import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'

interface ProductGalleryProps {
    galleryData: any[]
    selectedIndex?: number
    dispatch: React.Dispatch<React.SetStateAction<boolean>>
}

function ActionContainer() {
    return (
        <View style={styles.swipeableItem} />
    )
}

export function ProductGallery({ galleryData, selectedIndex = 0, dispatch }: ProductGalleryProps) {
    const [galleryItems, setGalleryItems] = useState<any[]>(galleryData)
    const [activeItemId, setActiveItemId] = useState<number>(selectedIndex)

    function handlePhotoActive(event: HandlerStateChangeEvent<Record<string, unknown>>) {
        const dragX = Number(event.nativeEvent.translationX)
        if (dragX >= 70) {
            navigateToPreviousPhoto()
        }

        if (dragX <= -70) {
            navigateToNextPhoto()
        }
    }

    function navigateToPreviousPhoto() {
        if (activeItemId > 0)
            setActiveItemId(activeId => activeId - 1)

    }

    function navigateToNextPhoto() {
        if (activeItemId < galleryData.length - 1)
            setActiveItemId(activeId => activeId + 1)
    }

    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                top: dimensions.screen.width * .05,
                right: dimensions.screen.width * .05,
            }}>
                <Text style={{
                    color: colors.white,
                    fontSize: 36,
                    zIndex: 16,
                }}
                    onPress={() => dispatch(false)}
                >X</Text>
            </View>
            <View style={styles.gallery}>
                <Swipeable
                    renderLeftActions={ActionContainer}
                    renderRightActions={ActionContainer}
                    leftThreshold={dimensions.window.width * 2}
                    rightThreshold={dimensions.window.width * 2}
                    onEnded={event => handlePhotoActive(event)}
                    friction={3}
                >
                    <Image style={styles.gallery}
                        source={{
                            uri: galleryItems[activeItemId].image
                        }}
                        height={dimensions.window.height}
                        resizeMode="contain"
                    />
                </Swipeable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: dimensions.screen.width,
        height: dimensions.screen.height,
        backgroundColor: colors.soft_dark_black,
        zIndex: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gallery: {
        width: dimensions.screen.width * .98,
        height: dimensions.screen.height,
        borderRadius: 2,
    },
    swipeableItem: {
        width: dimensions.screen.width * .1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})