import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

interface props {
    itemTotalAmount?: number;
    itemAvaiableAmount?: number;
    item?: any;
}

const noImage = require("../../../../resources/icons/no-image.png");

export function InventoryItemUser({...props}: props) {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
        >
                <View style={styles.buttonImage}>
                    <Image source={noImage} style={styles.imgIcon}/>
                </View>
            </TouchableOpacity>

            <View style={styles.propertiesItemName}>
                <Text style={styles.label}>Item:</Text>
                <Text numberOfLines={2} style={{width: 270}}>{props.item.nome}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 120,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonImage: {
        backgroundColor: "#dfdfdf",
        width: 90,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    propertiesItemName: {
        marginLeft: 15,
        marginRight: 20,
        width: 290,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 5
    },
    propertiesAmount: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    imgIcon: {
        width:50,
        height: 50
    }
});