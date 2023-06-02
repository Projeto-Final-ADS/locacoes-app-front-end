import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

interface props {
    itemName: string;
    amount: number;
    itemDescription: string;
    picture: string;
}

export function Item(props:props) {
    return(
        <View style={styles.container}>
            <Image source={{uri: props.picture}} style={styles.picture}/>
            <View style={styles.content}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>Nome do item:</Text>
                    <Text numberOfLines={1} style={{width: Dimensions.get('screen').width - 160}}> {props.itemName}</Text>
                </View>

                <View>
                    <Text style={{fontWeight: 'bold'}}>Descrição do item:</Text>
                    <Text numberOfLines={1} style={{width: Dimensions.get('screen').width - 160}} > {props.itemDescription}</Text>
                </View>
                
                <View>
                    <Text style={{fontWeight: 'bold'}}>Quantidade:</Text>
                    <Text> {props.amount}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 20,
        height: 130,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: 'row'
    },
    picture: {
        width: 110,
        height: 110,
        borderRadius: 10
    },
    content: {
        marginLeft: 10,
        marginTop: -5
    }
});