import { View, Text, StyleSheet} from 'react-native';

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

                <Text style={{textAlign: 'justify'}}>
                    {props.itemName}
                </Text>

                <Text style={styles.title}>Quantidade</Text>

                <Text>
                    {props.ItemAmount}
                </Text>

            </View>

            {/*Coluna 3*/}
            <View style={styles.column}>

                <Text style={styles.title}>Opções</Text>
                <Text>Editar</Text>
                <Text>Excluir</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 110,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    column: {
        width: '25%',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});