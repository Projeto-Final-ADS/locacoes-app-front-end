import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: "http://198.50.225.170:7018/api"
});

export async function GetAuthToken() {
    try {
        return await AsyncStorage.getItem("@AuthToken");
    } catch(error) {
        console.log(error)
    }
}