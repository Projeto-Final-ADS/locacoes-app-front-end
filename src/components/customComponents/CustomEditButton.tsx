import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";

interface props {
    onPress?: any;
}

const editIcon = require("../../../resources/icons/edit-icon.png");

export function CustomEditButton( { ...props } : props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPress}
            style={styles.buttonEdit}
        >
            <Image source={editIcon} style={styles.img}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    img: {
        width: 30,
        height: 30
    },
    buttonEdit: {
        backgroundColor: "#ffdd00",
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
});