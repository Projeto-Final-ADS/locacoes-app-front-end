import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
} from 'react-native';

import { Navbar } from '../inventoryPage/Navbar';
import { useRoute } from '@react-navigation/native';
import { Item } from './components/Item';

const currencyFormatter = require('currency-formatter');

interface Solicitacion {
    dateOpen: string;
    dateDelivery: string;
    totalItems: number;
    solicitacionID: number;
    client: string;
    statusSolicitacion: string;
    productList: undefined;
    addressEvent: undefined;
}

export function EditSolicitacionPageUser() {

    const route = useRoute();

    const [productList, setProductList] = useState(route.params?.solicitacion.productList);
    const [solicitacion, setSolicitacion] = useState<Solicitacion>(route.params?.solicitacion);
    const [valueAllProducts, setValueAllProducts] = useState("");

    async function totalValueAllProducts() {
        const list = productList;

        let valueAllProducts:number = 0.00;

        await list.forEach((list:any) => {
            valueAllProducts += list.quantidade * list.produto.preco
        });

        const formatedValue = await currencyFormatter.format(valueAllProducts, { code: 'BRL' });
        setValueAllProducts(formatedValue);
    }

    useEffect(()=> {
        totalValueAllProducts();
    },[]);

    /*async function CanceltLocationSolicitacion() {
        let body:Solicitacion = await {
            dateOpen: solicitacion.dateOpen,
            dateDelivery: solicitacion.dateDelivery,
            totalItems: solicitacion.totalItems,
            solicitacionID: solicitacion.solicitacionID,
            client: solicitacion.client,
            statusSolicitacion: "AnaliseRecusada",
            productList: solicitacion.productList,
            addressEvent: solicitacion.addressEvent
        };

        const response = await PutLocationSolicitation(body);
        
        if (response != undefined) {
            if (response.data.sucesso == true) {
                
                navigation.navigate("solicitacionPageUser", {refresh: true});
                
                Alert.alert("Status", "Solicitação cancelada com sucesso!");
            }
            if (response.data.sucesso == false) {
                Alert.alert("Erro", response.data.mensagem);
            }
        }
    }*/

    return(
        <ScrollView style={styles.page}>
            <View>
                    <Navbar/>
                    <View style={styles.options}>
                        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 20, width: Dimensions.get('screen').width - 50}}>

                            <Text style={{backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center'}}>
                                Cliente
                            </Text>
                            <Text style={{marginLeft: 10}}>
                                {solicitacion.client}
                            </Text>

                            <Text style={{backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center'}}>
                                Endereço de entrega
                            </Text>

                            <View style={{marginLeft: 10}}>
                                <Text>{solicitacion.addressEvent.cidade} - {solicitacion.addressEvent.uf}</Text>
                                <Text>{solicitacion.addressEvent.rua}</Text>
                                <Text>{solicitacion.addressEvent.bairro}</Text>
                                <Text>{(solicitacion.addressEvent.cep).substr(0,5)}-{(solicitacion.addressEvent.cep).substr(5,8)}</Text>
                            </View>

                            <Text style={{backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center'}}>
                                Status da Solicitação
                            </Text>

                            <Text style={{ textAlign: 'center', fontSize: 20, color: "#368CAD", fontWeight: 'bold'}}>
                                {solicitacion.statusSolicitacion}
                            </Text>

                            <Text style={{backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center'}}>
                                Valor Total
                            </Text>

                            <Text style={{ textAlign: 'center', fontSize: 20, color: "#32CD32", fontWeight: 'bold'}}>
                                {valueAllProducts}
                            </Text>
                            
                        </View>
                        {/* <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', width: '100%'}}>
                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={CanceltLocationSolicitacion}
                            >
                                <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        */}
                    </View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                        Itens
                    </Text>
                    
                    {
                        productList.map((item:any)=>
                            <Item
                                itemName={item.produto.nome}
                                amount={item.quantidade}
                                key={item.id}
                                itemDescription={item.produto.descricao}
                                picture={item.produto.imagem}
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
        height: 380,
        width: Dimensions.get('screen').width,
        backgroundColor: '#d6f5e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAccept: {
        width: 80,
        height: 50,
        backgroundColor: "#2fbc5e",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCancel: {
        width: 80,
        height: 50,
        backgroundColor: "#B12F2F",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        marginLeft: 10,
        marginRight: 10
    }
});