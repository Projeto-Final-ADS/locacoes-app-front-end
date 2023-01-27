import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

interface props {
    clientName: string;
    address: string;
}

const clientIcon = require("../../../../resources/icons/client-icon.png");

export function Client({...props}: props) {

    return (
        <View style={styles.container}>
            <View style={styles.buttonInfo}>
                <Image source={clientIcon} style={styles.clientIcon}/>
            </View>
            
            <View style={{flexDirection: 'column'}}>
                <View style={styles.propertiesItemName}>
                    <Text style={styles.label}>Name:</Text>
                    <Text numberOfLines={1} style={{width: 300}}>{props.clientName}</Text>
                    <Text style={styles.label}>Address:</Text>
                    <Text numberOfLines={1} style={{width: 300}}>{props.address}</Text>
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
    buttonInfo: {
        backgroundColor: "#459fbf",
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
    clientIcon: {
        width:50,
        height: 50
    }
});