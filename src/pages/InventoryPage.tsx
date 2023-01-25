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
import { InventoryItem } from "../components/pagesComponents/inventoryPage/InventoryItem";
import { Navbar } from "../components/pagesComponents/Navbar";

const data = [
    {itemName: 'Mesa', amount: 23, itemAvaiableAmount: 12, key: 1},
    {itemName: 'Cadeira', amount: 104, itemAvaiableAmount: 89, key: 2},
    {itemName: 'Garfo', amount: 140, itemAvaiableAmount: 80, key: 3},
    {itemName: 'Prato', amount: 63, itemAvaiableAmount: 33, key: 4},
    {itemName: 'Mesa de madeira', amount: 8, itemAvaiableAmount: 2, key: 5},
    {itemName: 'Sombrite', amount: 12, itemAvaiableAmount: 12, key: 6},
    {itemName: 'Forro de mesa', amount: 80, itemAvaiableAmount: 75, key: 7},
    {itemName: 'Panela de pressão', amount: 6, itemAvaiableAmount: 6, key: 8},
    {itemName: 'Tacho', amount: 4, itemAvaiableAmount: 0, key: 10},
    {itemName: 'Colher', amount: 44, itemAvaiableAmount: 8, key: 11},
];

export function InventoryPage() {

    const navigation = useNavigation();

    const [ itemsData, setItemsData ] = useState([...data]);
    const [ itemList, setItemList ] = useState(itemsData);
    const [ searchText, setSearchText ] = useState("");

    useEffect(() => {
        setItemList(
            itemsData.filter(
                (item) => {
                    return (
                        Object.values(item).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    function navigateRegisterItem() {
        //direcionar para outra pagina
        navigation.navigate('registerItem');
    }

    return (
        
        <View style={styles.page}>
            <Navbar/>
            {/*Input para pesquisa de item no estoque*/}
            <View style={styles.inputSearch}>
                <CustomInputText
                    placeholder="Pesquisar"
                    onChange={setSearchText}
                    textContentType='none'
                />
            </View>
            <View style={styles.inventoryBar}>
                {/*Texto de estoque*/}
                <Text style={styles.title}>Estoque</Text>
                
                {/*Botão para adicionar estoque*/}
                <CustomAddButton
                    onPress={navigateRegisterItem}
                />
            </View>
            
            {/*Lista de estoque*/}
            <View style={styles.containerInventory}>
                <FlatList
                    data={itemList}
                    showsVerticalScrollIndicator ={false}
                    renderItem={
                        ({item}) => (
                            <InventoryItem itemName={item.itemName} itemTotalAmount={item.amount} itemAvaiableAmount={item.itemAvaiableAmount} key={item.key}/>
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