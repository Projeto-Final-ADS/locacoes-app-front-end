import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

interface props {
    itemName: string;
    amount: number;
}

export function Item(props:props) {
    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Nome do item:</Text>
                <Text> {props.itemName}</Text>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Quantidade:</Text>
                <Text> {props.amount}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 20,
        height: 60,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    }
});