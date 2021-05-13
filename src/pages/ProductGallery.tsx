import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
} from 'react-native'
import { HandlerStateChangeEvent, Swipeable } from 'react-native-gesture-handler';

import dimensions from '../styles/dimensions';

export function ProductGallery({ route }: any) {
    const [galleryItems, setGalleryItems] = useState<any[]>(route.params.galleryData)
    const [activeItemId, setActiveItemId] = useState<number>(route.params.itemIndex)

    //Capture event and handle photo based on dragX position
    function handlePhotoActive(event: HandlerStateChangeEvent<Record<string, unknown>>) {
        const dragX = Number(event.nativeEvent.translationX)

        //If dragged to right go to previous photo
        if (dragX >= 70) {
            navigateToPreviousPhoto()
        }
        //If dragged to left go to next photo
        if (dragX <= -70) {
            navigateToNextPhoto()
        }
    }

    //Go to previous photo
    function navigateToPreviousPhoto() {
        if (activeItemId > 0)
            setActiveItemId(activeId => activeId - 1)
    }

    //Go to next photo
    function navigateToNextPhoto() {
        if (activeItemId < galleryItems.length - 1)
            setActiveItemId(activeId => activeId + 1)
    }

    //Left and right drag content
    function ActionContainer() {
        return (
            <View style={styles.swipeableItem} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Swipeable
                renderLeftActions={ActionContainer}
                renderRightActions={ActionContainer}
                leftThreshold={dimensions.window.width * 2}
                rightThreshold={dimensions.window.width * 2}
                onEnded={event => handlePhotoActive(event)}
                friction={3}
            >
                <Image style={styles.galleryImage}
                    source={{
                        uri: galleryItems[activeItemId].image
                    }}
                    height={dimensions.window.height}
                    resizeMode="contain"

                />
            </Swipeable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wave: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    galleryImage: {
        width: dimensions.screen.width,
        height: '100%',
        borderRadius: 6,
    },
    swipeableItem: {
        width: dimensions.screen.width * .1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})