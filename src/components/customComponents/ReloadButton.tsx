import { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
} from "react-native";

interface props {
    onPress?: any;
}

const reloadIcon = require("../../../resources/icons/reload.png");

export function ReloadButton( { ...props } : props) {

    return (
        <View style={styles.button}>
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.reloadIcon}
                onPress={props.onPress}
            >
                <Image source={reloadIcon} style={styles.reloadIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    reloadIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: "#2fbc5e",
        padding: 10,
        borderRadius: 30,
        width: 45,
        height: 45,
    }
});