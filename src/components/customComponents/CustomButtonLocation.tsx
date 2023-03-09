import { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View
} from "react-native";

interface props {
    onPress?: any;
}

const menuIcon = require("../../../resources/icons/box-location-icon.png");

export function CustomButtonLocation( { ...props } : props) {

    return (
        <View style={styles.backgorund}>
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.menuIcon}
                onPress={props.onPress}
            >
                <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
        
    },
    backgorund: {
        backgroundColor: "#2fcf5f",
        borderRadius: 10,
        padding: 5
    }
});