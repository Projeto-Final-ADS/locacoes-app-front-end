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
import { ListProducts } from '../../services/product';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CustomInputText } from "../../components/customComponents/CustomInputText";
import { InventoryItemUserLocation } from "./inventoryPage/InventoryItemUserLocation";
import { Navbar } from "./inventoryPage/Navbar";
import { InventoryItemUser } from './inventoryPage/InventoryItemUser';
import { CustomButtonLocation } from '../../components/customComponents/CustomButtonLocation';
import LoadingScreen from '../../components/customComponents/LoadingScreen';

export function InventoryPageUser() {

    const route = useRoute();
    const navigation = useNavigation();

    const [ listSelectedItens, setListSelectedItens] = useState([]);

    const [ itemsData, setItemsData ] = useState([]);
    const [ itemList, setItemList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ switchVal, setSwitchVal ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setItemList(
            itemsData.filter(
                (item:any) => {
                    return (
                        Object.values(item.nome).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    useEffect(() => {
        setListSelectedItens([]);
    }, [switchVal]);

    useEffect(() => {
        listAllProductStorage();
    }, [route?.params]);
    
    async function listAllProductStorage() {
        setIsLoading(true);

        const response = await ListProducts();
        if (response != undefined) {
            await setItemsData(response.data.produtos);
            await setItemList(response.data.produtos);
            setIsLoading(false);
        }
    }

    function navigateLocationPage() {
        if (listSelectedItens.length > 0)
            navigation.navigate("requestLocation", {itemsLocationList: listSelectedItens});
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
                <CustomButtonLocation
                    onPress={navigateLocationPage}
                />
            </View>
        
            <View style={styles.containerInventory}>
                <LoadingScreen isLoading={isLoading}/>

                {itemsData.length == 0 &&
                    <Text style={styles.storageInfo}>Nenhum item encontrado</Text>
                }


                { switchVal == false &&
                    <FlatList
                        data={itemList}
                        showsVerticalScrollIndicator ={false}
                        renderItem={
                            ({item}) => (
                                <InventoryItemUser
                                    itemTotalAmount={item.quantidade}
                                    itemAvaiableAmount={item.quantidade}
                                    key={item.id}
                                    item={item}
                                />
                            )
                        }
                        ListFooterComponent={<View style={{height:300}}></View>} //Adiciona espaço abaixo do Flatlist
                    />
                }

                { switchVal &&
                    <FlatList
                        data={itemList}
                        showsVerticalScrollIndicator ={false}
                        renderItem={
                            ({item}) => (
                                <InventoryItemUserLocation
                                    itemTotalAmount={item.quantidade}
                                    itemAvaiableAmount={item.quantidade}
                                    key={item.id}
                                    item={item}
                                    isCheckedForLocation={false}
                                    listSelectedItens={listSelectedItens}
                                />
                            )
                        }
                        ListFooterComponent={<View style={{height:300}}></View>} //Adiciona espaço abaixo do Flatlist
                    />
                }
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
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        width: Dimensions.get('screen').width -30

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