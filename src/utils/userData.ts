import Parse from 'parse/react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from '../context/userInfo';

//Application package name, used as key to unique value on AsyncStorage
const APP_PACKAGE_NAME = "com.github.levy"

//Get local userId from async storage
export async function getAsyncLocalUserId() {
    const userId = await AsyncStorage.getItem(`${APP_PACKAGE_NAME}:userId`)

    //If user not exist at async storage return string "null"
    return userId || "null"
}

//Convert database model to userInfo context data
export function parseUserToUserInfo(userData: Parse.Object<Parse.Attributes>) {
    const userDataSanitized: UserInfo = {
        gender: userData.get('gender'),
        name: userData.get('name'),
        photo: userData.get('photo')
    }

    return userDataSanitized
}

//Fetch user from database by ObjectID
export async function fetchExternalUserData(userId: string) {
    if (userId == "null")
        return null

    //Set user model to fetch
    const User = Parse.Object.extend('AppUser')
    const query = new Parse.Query(User)

    try {
        //Get user data and return that if exist
        const user = await query.get(userId)
        return user

    } catch (err) {
        //If user not exist on database return null
        return null
    }
}

//Remove user from database
export async function asyncRemoveUserFromDatabase(userId: string) {
    try {
        //If user no exist return false
        if (userId == "null")
            throw new Error("User not exist on database")

        //Set user model to delete
        const User = Parse.Object.extend('AppUser')
        const query = new Parse.Query(User)

        //Delete user
        const user = await query.get(userId)
        await user.destroy()

        return true
    } catch (err) {
        console.log(err);
        return false
    }
}

//Types for function handleAsyncStorageData
type AvailableActionType = "set" | "remove"
type AvailableProperty = "userId"

//Remove or set value to AsyncStorage
export async function handleAsyncStorageData(action: AvailableActionType, property: AvailableProperty, value: any = null) {
    if (action == "set") {
        await AsyncStorage.setItem(`${APP_PACKAGE_NAME}:${property}`, value)
    }

    if (action == "remove") {
        await AsyncStorage.removeItem(`${APP_PACKAGE_NAME}:${property}`)
    }
}