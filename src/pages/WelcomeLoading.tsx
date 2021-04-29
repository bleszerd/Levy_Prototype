import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useUserTourInfo } from '../context/userTour';

export function WelcomeLoading() {
    const { userInfo, userInfoController } = useUserTourInfo()

    const navigation = useNavigation()

    useEffect(() => {
        async function fetchStoredData() {
            const stringfiedData = await AsyncStorage.getItem("com.github.levy:userInfo")
            if (stringfiedData) {
                const userData = JSON.parse(stringfiedData)
                userInfoController.updateUserInfo(userData)
                navigation.navigate("HandleDrawer")
            } else {
                navigation.navigate("TourHome")
            }
        }

        async function prepareApp() {
            await SplashScreen.preventAutoHideAsync()
            await fetchStoredData()
        }

        fetchStoredData()
        prepareApp()
    }, [])

    return <></>
}