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
    itemName?: string;
    itemTotalAmount?: number;
    itemAvaiableAmount?: number;
    item?: any;
}

const editIcon = require("../../../../resources/icons/edit-icon.png");

export function InventoryItem({...props}: props) {

    const navigation = useNavigation();

    function navigateEditItemPage() {
        navigation.navigate('editItemPage', {item: props.item, refresh: false});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={navigateEditItemPage}
            >
                <View style={styles.buttonEdit}>
                    <Image source={editIcon} style={styles.editIcon}/>
                </View>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'column'}}>
                <View style={styles.propertiesItemName}>
                    <Text style={styles.label}>Item</Text>
                    <Text numberOfLines={1} style={{width: 300}}>{props.itemName}</Text>
                </View>

                <View style={styles.propertiesAmount}>
                    <Text style={styles.label}>Total: </Text>
                    <Text style={styles.totalAmount}>{props.itemTotalAmount}</Text>
                </View>

                <View style={styles.propertiesAmount}>
                    <Text style={styles.label}>Disponível: </Text>
                    <Text style={styles.availableAmount}>{props.itemAvaiableAmount}</Text>
                </View>
                
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
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#42c9db'
    },
    availableAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0fbf6f'
    },
    buttonEdit: {
        backgroundColor: "#ffdd00",
        width: 60,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    propertiesItemName: {
        marginLeft: 15,
        marginRight: 20,
        width: 310,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 5
    },
    propertiesAmount: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    editIcon: {
        width:50,
        height: 50
    }
});