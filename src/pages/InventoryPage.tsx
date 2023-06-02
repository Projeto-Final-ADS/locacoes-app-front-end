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

import { ListProducts } from '../services/product';

import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { InventoryItem } from "../components/pagesComponents/inventoryPage/InventoryItem";
import { Navbar } from "../components/pagesComponents/Navbar";
import LoadingScreen from '../components/customComponents/LoadingScreen';

export function InventoryPage() {

    const navigation = useNavigation();
    const route = useRoute();

    const [ itemsData, setItemsData ] = useState([]);
    const [ itemList, setItemList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setItemList(
            itemsData.filter(
                (item) => {
                    return (
                        Object.values(item.nome).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    useEffect(() => {
        listAllProductStorage();
    }, [route?.params]);

    async function listAllProductStorage() {
        setIsLoading(true)

        const response = await ListProducts();
        
        if (response != undefined) {
            await setItemsData(response.data.produtos);
            await setItemList(response.data.produtos);
            setIsLoading(false);
        }
    }

    function navigateRegisterItem() {
        navigation.navigate('registerItem', {refresh: false});
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
                <Text style={styles.title}>Estoque</Text>
                
                <CustomAddButton
                    onPress={navigateRegisterItem}
                />
            </View>
            

            <View style={styles.containerInventory}>
                <LoadingScreen isLoading={isLoading}/>

                {itemsData.length == 0 &&
                    <Text style={styles.storageInfo}>Nenhum item encontrado</Text>
                }

                <FlatList
                    data={itemList}
                    showsVerticalScrollIndicator ={false}
                    renderItem={
                        ({item}) => (
                            <InventoryItem
                                itemName={item.nome}
                                itemTotalAmount={item.quantidade}
                                key={item.id}
                                item={item}
                            />
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
    },
    storageInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.2,
        padding: 18
    },
});