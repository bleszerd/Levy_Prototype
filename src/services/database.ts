import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'
import Parse from 'parse/react-native';

const APP_ID = Constants.manifest.extra?.APP_ID
const JS_KEY = Constants.manifest.extra?.JS_KEY

export function initialize() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(APP_ID, JS_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com/'
}