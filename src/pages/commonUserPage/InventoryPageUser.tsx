import {
    useState,
    useEffect
} from 'react';

import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    Switch
} from 'react-native';

import { ListStorageProducts } from '../../services/storage';

import { useRoute } from '@react-navigation/native';
import { CustomInputText } from "../../components/customComponents/CustomInputText";
import { InventoryItemUser } from "./inventoryPage/InventoryItemUser";
import { InventoryItemUserLocation } from "./inventoryPage/InventoryItemUserLocation";
import { Navbar } from "./inventoryPage/Navbar";

export function InventoryPageUser() {

    const route = useRoute();

    const [ itemsData, setItemsData ] = useState([]);
    const [ itemList, setItemList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ switchVal, setSwitchVal ] = useState(false);

    useEffect(() => {
        setItemList(
            itemsData.filter(
                (item) => {
                    return (
                        Object.values(item.produto).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    useEffect(() => {
        listAllProductStorage();
    }, []);

    useEffect(() => {
        listAllProductStorage();
    }, [route?.params]);
    
    async function listAllProductStorage() {
        const response = await ListStorageProducts();
        if (response != undefined) {
            setItemsData(response.data.estoques);
            setItemList(response.data.estoques);
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

            <View style={styles.options}>
                <Text style={styles.title}>Produtos</Text>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding:5, borderRadius: 20}}>
                    <Switch
                        value={switchVal}
                        onValueChange={()=>setSwitchVal(!switchVal)}
                        style={{height: 20}}
                    />
                    <Text>Modo Locação</Text>
                </View>
            </View>
            

            <View style={styles.containerInventory}>

                {itemsData.length == 0 &&
                    <Text style={styles.storageInfo}>Nenhum item encontrado</Text>
                }

                <FlatList
                    data={itemList}
                    showsVerticalScrollIndicator ={false}
                    renderItem={
                        ({item}) => (
                            <>
                                { switchVal &&
                                <InventoryItemUserLocation
                                    itemName={item.produto.nome}
                                    itemTotalAmount={item.quantidade}
                                    itemAvaiableAmount={item.quantidade}
                                    key={item.id}
                                    item={item}
                                    isCheckedForLocation={false}
                                    locationModeIsChecked={switchVal}
                                />
                                }
                            </>
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
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 5

    },
    storageInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.2,
        padding: 18
    }
});