import { View, Text, StyleSheet} from 'react-native';

export function InventoryItem() {
    return (
        <View style={[styles.container, styles.elevation]}>
            <View style={[styles.column, styles.columnItem]}>
                <Text style={styles.title}>Item</Text>
                <Text style={{textAlign: 'justify'}}>aasdaas dasdasd</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.title}>Quantidade</Text>
                <Text>130</Text>
            </View>
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
        backgroundColor: '#fff',
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