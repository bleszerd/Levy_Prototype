import Parse from 'parse/react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from '../context/userTour';

export async function getAsyncLocalUserId() {
    const userId = await AsyncStorage.getItem("com.github.levy:userId")

    return userId || "null"
}

export async function fetchExternalUserData(userId: string) {
    if (userId == "null")
        return null

    const User = Parse.Object.extend('AppUser')
    const query = new Parse.Query(User)

    try {
        const user = await query.get(userId)
        return user

    } catch (err) {
        return null
    }
}

export function parseUserToTourInfo(userData: Parse.Object<Parse.Attributes>) {
    const userDataSanitized: UserInfo = {
        gender: userData.get('gender'),
        name: userData.get('name'),
        photo: userData.get('photo')
    }

    return userDataSanitized
}