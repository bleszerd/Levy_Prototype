import React, { createContext, ReactNode, useContext, useState } from 'react';
import {

} from 'react-native'
import { Gender } from '../pages/TourGender';

interface UserData {
    userInfo: UserInfo
    userInfoController: {
        updateUserInfo: (newUserInfo: UserInfo) => void
    }
}

interface UserProps {
    children: ReactNode
}

export interface UserInfo {
    name?: string
    gender?: Gender
    photo?: string
}

const UserData = createContext<UserData>({} as UserData)

export default function UserDataProvider({ children }: UserProps) {
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)

    function updateUserInfo(newUserInfo: UserInfo) {
        setUserInfo(newUserInfo)
    }

    return (
        <UserData.Provider
            value={{
                userInfo,
                userInfoController: {
                    updateUserInfo
                }
            }}
        >
            {children}
        </UserData.Provider>
    )
}

export function useUserInfo(){
    const context = useContext(UserData)
    const {userInfo, userInfoController} = context
    return {
        userInfo,
        userInfoController,
    }
}