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
import { GetAllUsersByRole } from '../services/users';

export function ClientsPage() {

    const navigation = useNavigation();

    const [ itemsData, setItemsData ] = useState([]);
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

    useEffect(() => {
        GetAllUsers();
    },[]);

    async function GetAllUsers() {
        const response = await GetAllUsersByRole("Usuario");
        
        if (response !== undefined) {
            setItemList(response.data.usuarios);
        }
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
                            <Client firstName={item.nome} lastName={item.sobrenome} email={item.email}/>
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