import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View
} from "react-native";

import { useNavigation } from '@react-navigation/native';

const returnIcon = require("../../../resources/icons/return-button.png");

export function ReturnButton() {
    const navigation = useNavigation();

    function navigateRegisterClient() {
        if (navigation.canGoBack())
            navigation.goBack();
    }

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.menuIcon}
                onPress={navigateRegisterClient}
            >
                <Image source={returnIcon} style={styles.menuIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        
    }
});