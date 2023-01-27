import {
    useState,
    useEffect
} from 'react';

import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Client } from "../components/pagesComponents/clientsPage/Client";
import { Navbar } from "../components/pagesComponents/Navbar";

const data = [
    {clientName: 'Alessandro Luiz da Silva Mota', address: 'Rua 14, Qd.47, Lt. 10, N15, 75357-010, Setor Centro, Varjão - Goiás', key: 1},
    {clientName: 'Lucas', address: 'Rua 15, Qd.7, Lt. 10, N122, 75555-010, Setor Centro, Varjão - Goiás, Centro', key: 2},
    {clientName: 'Maria Firmina', address: 'Rua 17, Qd.50, Lt. 45, N47, 75557-010, Setor Centro, Varjão - Goiás, Centro', key: 3},
    {clientName: 'João Katagury', address: 'Rua 18, Qd.53, Lt. 21, N8, 75357-010, Setor Centro, Varjão - Goiás, Centro', key: 4},
    {clientName: 'Kin Jhon Yiun', address: 'Rua 19, Qd.12, Lt. 45, N9, 75357-010, Setor Centro, Varjão - Goiás, Centro', key: 5},
];

export function ClientsPage() {

    const navigation = useNavigation();

    const [ itemsData, setItemsData ] = useState([...data]);
    const [ itemList, setItemList ] = useState(itemsData);
    const [ searchText, setSearchText ] = useState("");

    useEffect(() => {
        setItemList(
            itemsData.filter(
                (client) => {
                    return (
                        Object.values(client).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    function navigateRegisterClient() {
        navigation.navigate('registerClient');
    }

    return (
        
        <View style={styles.page}>
            <Navbar/>
            <View style={styles.inputSearch}>
                <CustomInputText
                    placeholder="Pesquisar"
                    onChange={setSearchText}
                    textContentType='none'
                />
            </View>
            <View style={styles.inventoryBar}>

                <Text style={styles.title}>Clientes</Text>

                <CustomAddButton
                    onPress={navigateRegisterClient}
                />
            </View>
            
            <View style={styles.containerInventory}>
                <FlatList
                    data={itemList}
                    showsVerticalScrollIndicator ={false}
                    renderItem={
                        ({item}) => (
                            <Client clientName={item.clientName} address={item.address} key={item.key}/>
                        )
                    }
                    ListFooterComponent={<View style={{height:300}}></View>} //Adiciona espaço abaixo do Flatlist
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    containerInventory: {
        alignItems: 'center',
        marginTop: 20
    },
    inputSearch: {
        alignItems: 'center'
    },
    inventoryBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});