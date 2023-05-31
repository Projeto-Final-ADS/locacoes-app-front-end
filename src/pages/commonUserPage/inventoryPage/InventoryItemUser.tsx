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
                    <Image source={{uri: props.item.imagem}} style={styles.picture}/>
                </View>
            </TouchableOpacity>

            <View style={styles.propertiesItemName}>
                <Text style={styles.label}>Nome:</Text>
                <Text numberOfLines={2} style={{width: Dimensions.get('screen').width - 140}}>{props.item.nome}</Text>
                <Text style={styles.label}>Descrição:</Text>
                <Text numberOfLines={2} style={{width: Dimensions.get('screen').width - 140}}>{props.item.descricao}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 140,
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
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    propertiesItemName: {
        marginLeft: 10,
        marginRight: 10,
        width: Dimensions.get('screen').width - 150,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 5
    },
    propertiesAmount: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    picture: {
        width: 120,
        height: 120,
        borderRadius: 10
    }
});