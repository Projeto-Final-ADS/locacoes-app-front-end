import React from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

const iconReturnButton = require("../../../resources/icons/retornar-icon.png");

interface props {
    onPress?: any;
}

export function CustomReturnButton( { ...props } : props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPress}
        >
            <Image
                source={iconReturnButton}
                style={styles.image}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginTop: 40,
        marginLeft: 20
    }
});