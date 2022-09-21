import { View, Text, StyleSheet} from 'react-native';

interface props {
    itemName: string;
    ItemAmount: number;
}

export function InventoryItem({...props}: props) {
    return (
        <View style={[styles.container, styles.elevation]}>
            {/*Coluna 1*/}
            <View style={[styles.column, styles.columnItem]}>
                <Text style={styles.title}>Item</Text>

                <Text style={{textAlign: 'justify'}}>
                    {props.itemName}
                </Text>

            </View>

            {/*Coluna 2*/}
            <View style={styles.column}>
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
        width: '95%',
        height: 100,
        marginBottom: 10,
        marginLeft: 2,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    elevation: {
        elevation: 4,
        shadowColor: '#000000',
    },
    column: {
        width: '25%',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    columnItem: {
        width: '35%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});