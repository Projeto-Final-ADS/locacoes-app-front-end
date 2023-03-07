import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: "http://192.168.0.5:7018/api"
});

export async function GetAuthToken() {
    try {
        return await AsyncStorage.getItem("@AuthToken");
    } catch(error) {
        console.log(error)
    }
}