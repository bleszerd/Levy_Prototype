import React, { createContext, ReactNode, useContext, useState } from 'react';
import {

} from 'react-native'
import { Gender } from '../pages/TourGender';

interface UserTourContext {
    userInfo: UserTourInfo
    userInfoController: {
        updateUserInfo: (newUserInfo: UserTourInfo) => void
    }
}

interface UserTourProps {
    children: ReactNode
}

export interface UserTourInfo {
    name?: string
    gender?: Gender
    photo?: string
}

const UserTourContext = createContext<UserTourContext>({} as UserTourContext)

export default function UserTourProvider({ children }: UserTourProps) {
    const [userInfo, setUserInfo] = useState<UserTourInfo>({} as UserTourInfo)

    function updateUserInfo(newUserInfo: UserTourInfo) {
        setUserInfo(newUserInfo)
    }

    return (
        <UserTourContext.Provider
            value={{
                userInfo,
                userInfoController: {
                    updateUserInfo
                }
            }}
        >
            {children}
        </UserTourContext.Provider>
    )
}

export function useUserTourInfo(){
    const context = useContext(UserTourContext)
    const {userInfo, userInfoController} = context
    return {
        userInfo,
        userInfoController,
    }
}