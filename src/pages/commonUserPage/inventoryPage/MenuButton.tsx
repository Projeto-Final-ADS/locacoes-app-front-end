import { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Modal
} from "react-native";
import ActionModal from "./actionModal/ActionModal";

interface props {
    onPress?: any;
}

const menuIcon = require("../../../../resources/icons/menu-icon.png");

export function MenuButton( { ...props } : props) {
    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.menuIcon}
                onPress={()=> setVisibleModal(true)}
            >
                <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>

            <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={ () => setVisibleModal(false)}
                animationType={"fade"}
            >
                <ActionModal
                    handleClose={ () => setVisibleModal(false)}
                />

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginLeft: 5
    }
});