import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import { Product } from '../ts/types';
import { HandlerStateChangeEvent, Swipeable } from 'react-native-gesture-handler';

import wavebackground from '../static_assets/wavebackground.png'
import dimensions from '../styles/dimensions';
import colors from '../styles/colors';

export function Gallery({ route }: any) {
    const [galleryItems, setGalleryItems] = useState<any[]>(route.params.galleryData)
    const [activeItemId, setActiveItemId] = useState<number>(route.params.itemIndex)

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
        if (activeItemId < galleryItems.length - 1)
            setActiveItemId(activeId => activeId + 1)
    }

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