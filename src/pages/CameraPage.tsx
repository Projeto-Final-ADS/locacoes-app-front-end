import React, { useEffect, useRef, useState } from "react";

import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Text
} from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync } from 'expo-image-manipulator';
import { ReturnButton } from "../components/customComponents/ReturnButton";

const iconCam = require("../../resources/icons/camera.png");

const configBase64Image = 'data:image/jpeg;base64,';

export function CameraPage() {

    const [hasCameraPermission, setHasCameraPermission] = useState(Boolean);
    const cameraRef = useRef<any>(null);

    const route = useRoute();
    const navigation = useNavigation();

    const item = route?.params?.item;

    useEffect(()=>{
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })()
    },[]);

    function navigateRegisterItemPage(uri: string) {
        navigation.navigate("registerItem", {imgBase64: uri,refresh: true})
    }

    function navigateEditItemPage(uri: string) {
        navigation.navigate("editItemPage", {imgBase64: uri,refresh: true, item: item})
    }
    
    function selectPage(uri: string) {
        switch (route?.params?.returnPage) {
            case "registerItem": navigateRegisterItemPage(uri);
            case "editItemPage": navigateEditItemPage(uri);
        }
    }
    
    async function captureHandle() {
        if (cameraRef !== null) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                const resizedPhoto = await manipulateAsync(
                    data.uri,
                    [{ resize: { width: 500, height: 500 } }],
                    { compress: 1, base64: true }
                );

                if (resizedPhoto.base64 != "" || resizedPhoto.base64 != undefined) {
                    const uri = configBase64Image + resizedPhoto.base64;
                    selectPage(uri);
                }

                
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={CameraType.back}
                ref={cameraRef}
            >
                
            </Camera>

            <View style={styles.menuCam}>
                <View style={styles.returnButtom}>
                    <ReturnButton/>
                    <Text style={styles.textReturn}>
                        Voltar
                    </Text>
                </View>
            
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={captureHandle}
                    style={styles.button}
                >
                    <Image
                        source={iconCam}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    camera: {
        width: Dimensions.get("screen").width,
        height: 500,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#D4D4D4',
        width: 80,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonImage: {
        width: 60,
        height: 60
    },
    menuCam: {
        flexDirection: 'row',
        width: Dimensions.get("screen").width,
        height: 100,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    returnButtom: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 70,
        backgroundColor: '#D4D4D4',
        marginTop: 20,
        borderRadius: 10,
        
    },
    textReturn: {
        fontWeight: 'bold',
        color: "#00738A"
    }
});
