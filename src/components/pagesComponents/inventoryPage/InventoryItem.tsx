import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

interface props {
    itemName: string;
    ItemAmount: number;
}

export function InventoryItem({...props}: props) {

    return (
        <View style={styles.container}>
            {/*Coluna 1*/}
            <View style={styles.column}>

                <Text style={styles.title}>Item</Text>
                <Text
                    numberOfLines={5}
                    style={{textAlign: 'left'}}
                >
                    {props.itemName}
                </Text>

                <Text style={[styles.title, {marginTop: 10}]}>Quantidade</Text>
                <Text>
                    {props.ItemAmount}
                </Text>

            </View>

            {/*Coluna 2*/}
            <View style={styles.column2}>

                <Text style={styles.title}>Opções</Text>
                <Text>Editar</Text>
                <Text>Excluir</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 125,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        width: '49%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20
    },
    column2: {
        width: '49%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});