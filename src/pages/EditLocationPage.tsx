import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';

import { Navbar } from '../components/pagesComponents/Navbar';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { UpdateStatusLocation } from '../services/tasks'
import { Item } from './solicitacionPageAdmin/components/Item';
import { CheckProductListAvailability } from '../services/solicitacion';

export function EditLocationPage() {

    const route = useRoute();
    
    const navigation = useNavigation();

    const [location, setLocation] = useState<any>(route.params?.location);
    const [productList, setProductList] = useState(route.params?.location.productPerLocation);
    const [loadingNewArrayItems, setLoadingNewArrayItems] = useState(true);
    
    const dateDeliveryConverted = new Date(location.dateDelivery);
    const dateToRecallConverted = new Date(location.toRecall);

    const formatedDateDelivery = formatDate(dateDeliveryConverted);
    const formatedHourDelivery = formatHours(dateDeliveryConverted);

    const formatedDateToRecall = formatDate(dateToRecallConverted);
    const formatedHourToRecall = formatHours(dateToRecallConverted);

    useEffect(()=> {
        CheckOutOfStockProductList();
    },[]);

    function padTo2Digits(number:number) {
        return number.toString().padStart(2, '0');
    }
      
    function formatDate(date:Date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
    }
    
    function formatHours(hours:Date) {
        return [
          padTo2Digits(hours.getHours()),
          padTo2Digits(hours.getMinutes())
        ].join(':');
    }

    function ToProgressStatus(status: string) {
        switch(status) {
            case "AEntregar": return "Entregue";
            case "Entregue": return "Recolher";
            case "Recolher": return "Concluido";
            case "Concluido": return "Concluido";
        }
    }

    function ConvertStatus(status: string) {
        switch(status) {
            case "AEntregar": return "A entregar";
            case "Entregue": return "Entregue";
            case "Recolher": return "Recolher";
            case "Concluido": return "Concluido";
        }
    }

    async function ChangeStatusLocation() {

        if (location.statusLocation != undefined) {
            if (location.statusLocation != 'Concluido') {
                const newStatus = await ToProgressStatus(location.statusLocation);

                const response = await UpdateStatusLocation({status: newStatus, locationId: location.locationId});
        
                if (response != undefined) {
                    if (response.data.sucesso == true) {
                        
                        navigation.navigate("tasksPage", {refresh: true});
                        
                        Alert.alert("Status", "Locação progredida com sucesso!");
                    }
                    if (response.data.sucesso == false) {
                        Alert.alert("Erro", response.data.mensagem);
                    }
                }
            } else {
                Alert.alert("Status", "A locação já foi progredida até a conclusão!");
            }
        }
    }

    async function CheckOutOfStockProductList() {
        let listProducts: any = [];

        await productList.map((item: any) => {
            listProducts.push({
                id: item.produto.id,
                quantidade: item.quantidade,
            });
        });

        const response = await CheckProductListAvailability({
            products: listProducts,
            eventDate: new Date(location.dateDelivery),
        });

        let lengthArray: number = response?.data.validacaoDoEstoque.length;
        let arrayResponse: any[] = response?.data.validacaoDoEstoque;
        let newProductList: any = [];

        if (response != undefined) {
            for (let i = 0; i < productList.length; i++) {
                for (let j = 0; j < lengthArray; j++) {
                    if (arrayResponse[j].produtoId == productList[i].produto.id) {
                        await newProductList.push({
                            ...productList[i],
                            containStock: arrayResponse[j].temEstoque,
                            messageStock: arrayResponse[j].mensagem,
                        });
                    }
                }
            }

        }
        await setProductList(newProductList);
        setLoadingNewArrayItems(false);
    }

    return(
        <ScrollView style={styles.page}>
                <Navbar/>
                <View style={styles.options}>
                    <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 20, width: Dimensions.get('screen').width - 50}}>

                        <Text style={styles.titleBars}>
                            Cliente
                        </Text>
                        <Text style={{marginLeft: 10}}>
                            {location.username}
                        </Text>

                        <Text style={styles.titleBars}>
                            Endereço de entrega
                        </Text>

                        <View style={{marginLeft: 10}}>
                            <Text>{location.address.cidade} - {location.address.uf}</Text>
                            <Text>{location.address.rua}</Text>
                            <Text>{location.address.bairro}</Text>
                            <Text>{(location.address.cep).substr(0,5)}-{(location.address.cep).substr(5,8)}</Text>
                        </View>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Data de entrega
                        </Text>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                            {formatedDateDelivery} - {formatedHourDelivery}h
                        </Text>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Data recolhimento
                        </Text>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                            {formatedDateToRecall} - {formatedHourToRecall}h
                        </Text>

                        <Text style={styles.titleBars}>
                            Status Atual
                        </Text>
                        <View style={{width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.statusStyle}>
                                {ConvertStatus(location.statusLocation)}
                            </Text>
                        </View>
                        
                    </View>
                    <View style={{justifyContent: 'center', marginTop: 20, width: '100%', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.buttonToProgressButton}
                            onPress={ChangeStatusLocation}
                        >
                            <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                                Progredir Status
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={{alignItems:'center', justifyContent: 'center', width: Dimensions.get('screen').width, marginTop: 10}}>
                    <Text style={{color: '#000', fontSize: 24, fontWeight: 'bold'}}>
                        Itens
                    </Text>
                </View>
                

                <View style={styles.productList}>
                
                    {loadingNewArrayItems == false &&
                        productList.map((item:any)=>
                            <Item
                                itemName={item.produto.nome}
                                amount={item.quantidade}
                                key={item.id}
                                itemDescription={item.produto.descricao}
                                picture={item.produto.imagem}
                                containStock={item.containStock}
                                messageStock={item.messageStock}
                            />
                        )
                    }
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    options: {
        height: 550,
        width: Dimensions.get('screen').width,
        backgroundColor: '#d6f5e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonToProgressButton: {
        width: 120,
        height: 50,
        backgroundColor: "#2fbc5e",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleBars: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    statusStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00A4EC',
        backgroundColor: '#f9f9f9',
        padding: 5,
        borderRadius: 10
    },
    productList: {
        marginTop: 10
    }
});