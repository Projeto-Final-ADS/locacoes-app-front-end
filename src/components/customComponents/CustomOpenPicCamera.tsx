import {useState, useEffect} from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";

interface props {
    onPress?: any;
    uriBase64Image: string;
}

const iconCam = require("../../../resources/icons/camera.png");

export function CustomOpenPicCamera( { ...props } : props) {

    const [uriFlag, setUriFlag] = useState(false);

    useEffect(() => {
        if (props.uriBase64Image.length > 0) {
            setUriFlag(true);
        }
    },[props.uriBase64Image]);

    return (
        <>
            { uriFlag === true &&
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={props.onPress}
                    style={styles.buttonPicture}
                >
                    <Image source={{uri: props.uriBase64Image}} style={styles.picture}/>
                </TouchableOpacity>
            }
            { uriFlag === false &&
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={props.onPress}
                    style={styles.buttonCam}
                >
                    <Image source={iconCam} style={styles.iconCam}/>
                </TouchableOpacity>
            }
        </>
    );
}

const styles = StyleSheet.create({
    textButtonAdd: {
        fontSize: 30,
        color: '#fff'
    },
    buttonCam: {
        backgroundColor: '#C0C0C0',
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    buttonPicture: {
        backgroundColor: '#000',
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    iconCam: {
        height: 100,
        width: 100
    },
    picture: {
        height: 140,
        width: 140,
        borderRadius: 25
    }
});